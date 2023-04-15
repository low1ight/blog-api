import {LoginInputModel} from "../types/models/auth/login-input-model";
import {userRepository} from "../repository/user/user-repository";
import bcrypt from "bcrypt";
import {jwtService} from "../application/jwt-service";
import {UserDBType} from "../types/models/user/user-DB-type";
import {UserInputModel} from "../types/models/user/user-input-model";
import {userService} from "./user-service";
import {emailManager} from "../adapters/email-manager";
import {createCustomResponse, CustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {EmailConfirmationInputModel} from "../types/models/auth/emailConfirmation-input-model";
import { v4 as uuidv4 } from 'uuid';
import {SendCodeOnEmailInputModel} from "../types/models/auth/sendCodeOnEmailInputModel";
import {TokensType} from "../types/models/jwt/TokensType";
import {deviceService} from "./device-service";
import {DeviceType} from "../types/models/device/DeviceType";
import {RefreshTokenPayloadData} from "../types/models/jwt/RefreshTokenPayloadData";
import jwt from "jsonwebtoken";
import {settings} from "../settings";
import {deviceRepository} from "../repository/device/device-repository";
import {NewPasswordInputModel} from "../types/models/auth/new-password-input-model";

export const authService = {


    async login({loginOrEmail,password}:LoginInputModel,title:string,ip:string):Promise<null | TokensType> {


        //get login user data
        const user:UserDBType | null = await userRepository.getUserByLoginOrEmail(loginOrEmail)

        if (!user) return null



        //check is user email confirmed
        if(!user.userConfirmation.isConfirmed) return null



        //check login data is correct
        const isSuccessful = await this.checkLoginCredentials(password,user.userData.password)

        if (!isSuccessful) return null





        //create new security



        const newDevice:DeviceType = await deviceService.createNewDevice(user._id,title,ip)


        //create and return jwt tokens

        return await jwtService.createNewTokens(user._id.toString(),newDevice.sessionId,newDevice._id.toString())

    },


    async refreshRefreshToken(refreshToken:string) {

            const jstVerifyResult:CustomResponse<RefreshTokenPayloadData> = await this.verifyRefreshToken(refreshToken)

           if(!jstVerifyResult.successful) return jstVerifyResult

           const jwtPayload:RefreshTokenPayloadData = jstVerifyResult.content

            //create nes session id and update security
            const newSessionId:string | null = await deviceService.refreshDeviceSessionId(jwtPayload.deviceId)

            if(!newSessionId) return createCustomResponse(false,500,"error updating session id")

            //return new jwt
            const tokens:TokensType =  await jwtService.createNewTokens(jwtPayload.userId,newSessionId,jwtPayload.deviceId)

            return createCustomResponse(true,200,tokens)


    },


    async logout(refreshToken:string) {

        const jstVerifyResult:CustomResponse<RefreshTokenPayloadData> = await this.verifyRefreshToken(refreshToken)

        if(!jstVerifyResult.successful) return jstVerifyResult

        const jwtPayload:RefreshTokenPayloadData = jstVerifyResult.content

        const isLogout:boolean = await deviceRepository.deleteDevice(jwtPayload.deviceId)

        if(!isLogout) createCustomResponse(true,500,"failed logout")

        return createCustomResponse(true,204,"successful logout")

    },


    async verifyRefreshToken(refreshToken:string):Promise<CustomResponse<RefreshTokenPayloadData>> {

        try {

            //verify refresh token and get payload data
            let jwtPayload:RefreshTokenPayloadData = await jwt.verify(refreshToken,settings.JWT_SECRET) as RefreshTokenPayloadData

            //get current sessionId for token security
            const currentDeviceSessionId:string | null = await deviceRepository.getCurrentDeviceSessionId(jwtPayload.deviceId)


            //validate sessionId
            if(!currentDeviceSessionId) return createCustomResponse(false,401,"find security err")

            if(jwtPayload.sessionId !== currentDeviceSessionId) return createCustomResponse(false,401,"refresh token expired")

            return createCustomResponse(true,200,jwtPayload)

        } catch(e:any) {

            return createCustomResponse(false,401,e.message)

        }
    },





    async registration(userData:UserInputModel):Promise<boolean> {

       try{
           const user = await userService.registerUser(userData)

           await emailManager.sendConfirmationEmailCode(user.userData.email,user.userConfirmation.confirmationCode)

           return true

       } catch (e) {

           return false
       }

    },



    async resendConfirmationCode({email}:SendCodeOnEmailInputModel) {


        const user:UserDBType | null = await userRepository.getUserByEmail(email)

        if(!user) return createCustomResponse(false,400,"user with this email doesnt exist")

        if(user.userConfirmation.isConfirmed) return createCustomResponse(false,401,"email already confirmed")



        try{
            const newConfirmationCode = uuidv4()

            await userRepository.setNewEmailConfirmationCode(email,newConfirmationCode)

            await emailManager.sendConfirmationEmailCode(email,newConfirmationCode)

            return createCustomResponse(true,204,'new code successful sent')

        } catch (e:any) {

            return createCustomResponse(false,500,e.message)

        }


    },


    async setNewPassword({newPassword,recoveryCode}:NewPasswordInputModel) {


        const user = await userRepository.getUserByPasswordRecoveryCode(recoveryCode)

        if(!user) return createCustomResponse(false,400,'expired code')



        const isUpdatedCode = await userRepository.addNewRecoveryPasswordCodeForUser(user._id.toString(),null)

        if(!isUpdatedCode) return createCustomResponse(false,500,"error updating recovery code for user")


        const hashedPass = await bcrypt.hash(newPassword,10)

        const isNewPassSet = await userRepository.setNewPasswordForUser(user._id.toString(),hashedPass)

        if(!isNewPassSet) return createCustomResponse(false,500,"error updating password for user")


        return createCustomResponse(true,204,"success")

    },

    async confirmUserEmail({code}:EmailConfirmationInputModel):Promise<CustomResponse<string>> {

        const user = await userRepository.getUserByEmailConfirmationCode(code)

        if(!user) return createCustomResponse(false,401,"wrong confirmation code")

        if(user.userConfirmation.isConfirmed) return createCustomResponse(false,401,'user has already confirmed')

        if(user.userConfirmation.expirationDate < new Date()) return createCustomResponse(false,401,'confirmation code expired')


        const result = await userRepository.confirmUserEmail(code)

        if(!result) return createCustomResponse(false,500,'updating confirmation status error')

        return createCustomResponse(true,204,'email is successful accepted')
    },


    async sendPasswordRecoveryCode({email}:SendCodeOnEmailInputModel) {

        const user = await userRepository.getUserByEmail(email)

        if(!user) return createCustomResponse(false,204,"don't exist user by this email")


        const newRecoveryCode = uuidv4()

        const isUpdatedCode = await userRepository.addNewRecoveryPasswordCodeForUser(user._id.toString(),newRecoveryCode)

        if(!isUpdatedCode) return createCustomResponse(false,500,"error updating recovery code for user")




        try {
            await emailManager.sendPasswordRecoveryCode(email,newRecoveryCode)
            return createCustomResponse(true,204,'success')
        } catch (e:any) {
            return createCustomResponse(false,500,e.message)
        }





    },




    async checkLoginCredentials(currentPassword:string,correctPasswordInDb:string):Promise<boolean> {

        return await bcrypt.compare(currentPassword,correctPasswordInDb)

    }




}
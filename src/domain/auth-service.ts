import {LoginInputModel} from "../types/models/auth/login-input-model";
import {UserRepository} from "../repository/user/user-repository";
import bcrypt from "bcrypt";
import {JwtService} from "../application/jwt-service";
import {UserDBType} from "../types/models/user/user-DB-type";
import {UserInputModel} from "../types/models/user/user-input-model";
import {UserService} from "./user-service";
import {EmailManager} from "../adapters/email-manager";
import {createCustomResponse, CustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {EmailConfirmationInputModel} from "../types/models/auth/emailConfirmation-input-model";
import { v4 as uuidv4 } from 'uuid';
import {SendCodeOnEmailInputModel} from "../types/models/auth/sendCodeOnEmailInputModel";
import {TokensType} from "../types/models/jwt/TokensType";
import {DeviceService} from "./device-service";
import {DeviceType} from "../types/models/device/DeviceType";
import {RefreshTokenPayloadData} from "../types/models/jwt/RefreshTokenPayloadData";
import {DeviceRepository} from "../repository/device/device-repository";
import {NewPasswordInputModel} from "../types/models/auth/new-password-input-model";

export class AuthService  {

    constructor(protected userRepository:UserRepository,
                protected userService:UserService,
                protected deviceRepository:DeviceRepository,
                protected deviceService:DeviceService,
                protected jwtService:JwtService,
                protected emailManager:EmailManager
                ) {}


    async login({loginOrEmail,password}:LoginInputModel,title:string,ip:string):Promise<null | TokensType> {


        //get login user data
        const user:UserDBType | null = await this.userRepository.getUserByLoginOrEmail(loginOrEmail)

        if (!user) return null



        //check is user email confirmed
        if(!user.userConfirmation.isConfirmed) return null



        //check login data is correct
        const isSuccessful = await this.checkLoginCredentials(password,user.userData.password)

        if (!isSuccessful) return null





        //create new security



        const newDevice:DeviceType = await this.deviceService.createNewDevice(user._id,title,ip)


        //create and return jwt tokens

        return await this.jwtService.createNewTokens(user._id.toString(),newDevice.sessionId,newDevice._id.toString())

    }


    async refreshRefreshToken(refreshToken:string) {

            const jstVerifyResult:CustomResponse<RefreshTokenPayloadData> = await this.jwtService.verifyRefreshToken(refreshToken)

           if(!jstVerifyResult.successful) return jstVerifyResult

           const jwtPayload:RefreshTokenPayloadData = jstVerifyResult.content

            //create nes session id and update security
            const newSessionId:string | null = await this.deviceService.refreshDeviceSessionId(jwtPayload.deviceId)

            if(!newSessionId) return createCustomResponse(false,500,"error updating session id")

            //return new jwt
            const tokens:TokensType =  await this.jwtService.createNewTokens(jwtPayload.userId,newSessionId,jwtPayload.deviceId)

            return createCustomResponse(true,200,tokens)


    }


    async logout(refreshToken:string) {

        const jstVerifyResult:CustomResponse<RefreshTokenPayloadData> = await this.jwtService.verifyRefreshToken(refreshToken)

        if(!jstVerifyResult.successful) return jstVerifyResult

        const jwtPayload:RefreshTokenPayloadData = jstVerifyResult.content

        const isLogout:boolean = await this.deviceRepository.deleteDevice(jwtPayload.deviceId)

        if(!isLogout) createCustomResponse(true,500,"failed logout")

        return createCustomResponse(true,204,"successful logout")

    }




    async registration(userData:UserInputModel):Promise<boolean> {

       try{
           const user = await this.userService.registerUser(userData)

           await this.emailManager.sendConfirmationEmailCode(user.userData.email,user.userConfirmation.confirmationCode)

           return true

       } catch (e) {

           return false
       }

    }



    async resendConfirmationCode({email}:SendCodeOnEmailInputModel) {


        const user:UserDBType | null = await this.userRepository.getUserByEmail(email)

        if(!user) return createCustomResponse(false,400,"user with this email doesnt exist")

        if(user.userConfirmation.isConfirmed) return createCustomResponse(false,401,"email already confirmed")



        try{
            const newConfirmationCode = uuidv4()

            await this.userRepository.setNewEmailConfirmationCode(email,newConfirmationCode)

            await this.emailManager.sendConfirmationEmailCode(email,newConfirmationCode)

            return createCustomResponse(true,204,'new code successful sent')

        } catch (e:any) {

            return createCustomResponse(false,500,e.message)

        }


    }


    async setNewPassword({newPassword,recoveryCode}:NewPasswordInputModel) {


        const user = await this.userRepository.getUserByPasswordRecoveryCode(recoveryCode)

        if(!user) return createCustomResponse(false,400,'expired code')



        const isUpdatedCode = await this.userRepository.addNewRecoveryPasswordCodeForUser(user._id.toString(),null)

        if(!isUpdatedCode) return createCustomResponse(false,500,"error updating recovery code for user")


        const hashedPass = await bcrypt.hash(newPassword,10)

        const isNewPassSet = await this.userRepository.setNewPasswordForUser(user._id.toString(),hashedPass)

        if(!isNewPassSet) return createCustomResponse(false,500,"error updating password for user")


        return createCustomResponse(true,204,"success")

    }

    async confirmUserEmail({code}:EmailConfirmationInputModel):Promise<CustomResponse<string>> {

        const user = await this.userRepository.getUserByEmailConfirmationCode(code)

        if(!user) return createCustomResponse(false,401,"wrong confirmation code")

        if(user.userConfirmation.isConfirmed) return createCustomResponse(false,401,'user has already confirmed')

        if(user.userConfirmation.expirationDate < new Date()) return createCustomResponse(false,401,'confirmation code expired')


        const result = await this.userRepository.confirmUserEmail(code)

        if(!result) return createCustomResponse(false,500,'updating confirmation status error')

        return createCustomResponse(true,204,'email is successful accepted')
    }


    async sendPasswordRecoveryCode({email}:SendCodeOnEmailInputModel) {

        const user = await this.userRepository.getUserByEmail(email)

        if(!user) return createCustomResponse(false,204,"don't exist user by this email")


        const newRecoveryCode = uuidv4()

        const isUpdatedCode = await this.userRepository.addNewRecoveryPasswordCodeForUser(user._id.toString(),newRecoveryCode)

        if(!isUpdatedCode) return createCustomResponse(false,500,"error updating recovery code for user")




        try {
            await this.emailManager.sendPasswordRecoveryCode(email,newRecoveryCode)
            return createCustomResponse(true,204,'success')
        } catch (e:any) {
            return createCustomResponse(false,500,e.message)
        }





    }


    async checkLoginCredentials(currentPassword:string,correctPasswordInDb:string):Promise<boolean> {

        return await bcrypt.compare(currentPassword,correctPasswordInDb)

    }




}
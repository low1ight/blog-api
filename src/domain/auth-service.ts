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
import {ResendCodeInputModel} from "../types/models/auth/resendCode-input-model";

export const authService = {


    async login({loginOrEmail,password}:LoginInputModel):Promise<null | string> {


        //get login user data
        const user:UserDBType | null = await userRepository.getUserByLoginOrEmail(loginOrEmail)

        if (!user) return null



        //check is user email confirmed
        if(!user.userConfirmation.isConfirmed) return null



        //check login data is correct
        const isSuccessful = await this.checkLoginCredentials(password,user.userData.password)

        if (!isSuccessful) return null





        //create new jwt token

        return await jwtService.createNewTokens(user._id.toString())


    },




    async registration(userData:UserInputModel):Promise<boolean> {

       try{
           const user = await userService.registerUser(userData)

           await emailManager.sendEmail(user.userData.email,user.userConfirmation.confirmationCode)

           return true

       } catch (e) {

           return false
       }

    },



    async resendConfirmationCode({email}:ResendCodeInputModel) {

        const isEmailConfirmed = await userRepository.isEmailConfirmed(email)

        if(isEmailConfirmed) return createCustomResponse(false,"email already confirmed")




        try{
            const newConfirmationCode = uuidv4()

            await userRepository.setNewEmailConfirmationCode(email,newConfirmationCode)

            await emailManager.sendEmail(email,newConfirmationCode)

            return createCustomResponse(true,'new code successful sent')

        } catch (e:any) {

            return createCustomResponse(false,e.message)

        }


    },

    async confirmUserEmail({code}:EmailConfirmationInputModel):Promise<CustomResponse> {

        const user = await userRepository.getUserByEmailConfirmationCode(code)

        if(!user) return createCustomResponse(false,"wrong confirmation code")

        if(user.userConfirmation.isConfirmed) return createCustomResponse(false,'user has already confirmed')

        if(user.userConfirmation.expirationDate < new Date()) return createCustomResponse(false,'confirmation code expired')


        const result = await userRepository.confirmUserEmail(code)

        if(!result) return createCustomResponse(false,'updating confirmation status error')

        return createCustomResponse(true,'email is successful accepted')
    },




    async checkLoginCredentials(currentPassword:string,correctPasswordInDb:string):Promise<boolean> {

        return await bcrypt.compare(currentPassword,correctPasswordInDb)

    }




}
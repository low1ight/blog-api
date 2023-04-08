import {LoginInputModel} from "../types/models/auth/login-input-model";
import {userRepository} from "../repository/user/user-repository";
import bcrypt from "bcrypt";
import {jwtService} from "../application/jwt-service";
import {UserDBType} from "../types/models/user/user-DB-type";


export const authService = {


    async login({loginOrEmail,password}:LoginInputModel):Promise<null | string> {


        //get login user data
        const user:UserDBType | null = await userRepository.getUserByLoginOrEmail(loginOrEmail)

        if (!user) return null




        //check login data is correct
        const isSuccessful = await this.checkLoginCredentials(password,user.password)

        if (!isSuccessful) return null





        //create new jwt token


        return await jwtService.createNewTokens(user._id.toString())


    },


    async checkLoginCredentials(currentPassword:string,correctPasswordInDb:string):Promise<boolean> {

        return await bcrypt.compare(currentPassword,correctPasswordInDb)

    }




}
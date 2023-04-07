import {LoginInputModel} from "../types/models/auth/login-input-model";
import {userRepository} from "../repository/user/user-repository";
import bcrypt from "bcrypt";


export const authService = {


    async login(loginData:LoginInputModel):Promise<boolean> {

        return await this.checkLoginCredentials(loginData)

    },


    async checkLoginCredentials({loginOrEmail,password}:LoginInputModel):Promise<boolean> {

        const user = await userRepository.getUserByLoginOrEmail(loginOrEmail)

        if(!user) return false

        return await bcrypt.compare(password,user.password)

    }




}
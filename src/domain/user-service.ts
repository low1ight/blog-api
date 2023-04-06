import {UserInputModel} from "../types/models/user/user-input-model";
import bcrypt from "bcrypt";
import {userRepository} from "../repository/user/user-repository";
import {UserViewModel} from "../types/models/user/user-view-model";

export const userService = {



    async createUser({login,email,password}:UserInputModel):Promise<UserViewModel> {


        //hash pass
        const hashedPassword:string = await bcrypt.hash(password,10)

        //create new user obj
        const newUser = {
            login,
            email,
            password:hashedPassword
        }


        return await userRepository.createUser(newUser)


    },


    async deleteUser(userId:string):Promise<boolean> {

        const isUserExist = userRepository.isUserExist(userId)

        if(!isUserExist) return false

        return await userRepository.deleteUser(userId)


    }


}
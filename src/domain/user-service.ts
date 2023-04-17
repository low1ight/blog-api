import {UserInputModel} from "../types/models/user/user-input-model";
import bcrypt from "bcrypt";
import {UserRepository} from "../repository/user/user-repository";
import {UserViewModel} from "../types/models/user/user-view-model";
import { v4 as uuidv4 } from 'uuid';
import add from 'date-fns/add'
import {UserDBType} from "../types/models/user/user-DB-type";

export class UserService  {

    constructor(protected userRepository:UserRepository) {}


    async createUser(userData:UserInputModel):Promise<UserViewModel> {

        const newUserData = await this.createUserData(userData,true)

        return await this.userRepository.createUser(newUserData.userData,newUserData.userConfirmation)


    }


    async registerUser(userData:UserInputModel):Promise<UserDBType> {

        const newUserData = await this.createUserData(userData,false)

        return await this.userRepository.registerUser(newUserData.userData,newUserData.userConfirmation)


    }




    async deleteUser(userId:string):Promise<boolean> {

        const isUserExist = this.userRepository.isUserExist(userId)

        if(!isUserExist) return false

        return await this.userRepository.deleteUser(userId)


    }

    async createUserData({login,email,password}:UserInputModel,emailConfirmationStatus:boolean) {

        //hash pass
        const hashedPassword:string = await bcrypt.hash(password,10)

        //create new user obj
        const newUser = {
            login,
            email,
            password:hashedPassword
        }

        const userConfirmationData = {
            confirmationCode:uuidv4(),
            isConfirmed:emailConfirmationStatus,
            expirationDate:add(new Date(),{
                hours:1,
                minutes:1
            })
        }


        return {
            userData:newUser,
            userConfirmation:userConfirmationData
        }
    }


}
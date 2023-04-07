import {User} from "../../db/models/user";
import {userObjToViewModel} from "../_mappers/toUserViewModel";
import {UserInputModel} from "../../types/models/user/user-input-model";
import {UserDBType} from "../../types/models/user/user-DB-type";
import {UserViewModel} from "../../types/models/user/user-view-model";


export const userRepository = {

    async createUser(userData: UserInputModel): Promise<UserViewModel> {

        const newUser: UserDBType = await User.create(userData)

        return userObjToViewModel(newUser)

    },


    async deleteUser(userId: string): Promise<boolean> {

        const result = await User.deleteOne({_id:userId})

        return result.deletedCount === 1
    },


    async isUserExist(userId:string):Promise<boolean> {

        const result = await User.exists({_id:userId})

        return result !== null


    },


    async getUserByLoginOrEmail(loginOrEmail:string):Promise<UserDBType | null> {

        return User.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] })

    },

    async isEmailExist(email:string):Promise<boolean> {

        const result = await User.exists({email})

        return result !== null

    },

    async isLoginExist(login:string):Promise<boolean> {

        const result = await User.exists({login})

        return result !== null

    },


}
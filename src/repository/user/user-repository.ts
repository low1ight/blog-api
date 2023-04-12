import {User} from "../../db/models/user";
import {userObjToViewModel} from "../_mappers/toUserViewModel";
import {UserInputModel} from "../../types/models/user/user-input-model";
import {UserConfirmation, UserDBType} from "../../types/models/user/user-DB-type";
import {UserViewModel} from "../../types/models/user/user-view-model";


export const userRepository = {


    async getUserById(id: string): Promise<UserDBType | null> {
        const result = await User.findOne({_id: id})

        if (!result) return null

        return result
    },

    async getUserByEmail(email: string): Promise<UserDBType | null> {
        const result = await User.findOne({"userData.email": email})

        if (!result) return null

        return result
    },

    async getUserByPasswordRecoveryCode(code: string): Promise<UserDBType | null> {
        const result = await User.findOne({"userData.passwordRecoveryCode": code})

        if (!result) return null

        return result
    },

    async createUser(userData: UserInputModel, userConfirmation: UserConfirmation): Promise<UserViewModel> {

        const newUser: UserDBType = await User.create({
            userData,
            userConfirmation
        })

        return userObjToViewModel(newUser)

    },

    async addNewRecoveryPasswordCodeForUser(id:string,code:string | null) {
        const result = await User.updateOne({_id:id}, {"userData.passwordRecoveryCode": code})

        return result.matchedCount === 1


    },


    async registerUser(userData: UserInputModel, userConfirmation: UserConfirmation): Promise<UserDBType> {

        return await User.create({
            userData,
            userConfirmation
        })


    },

    async setNewPasswordForUser(id:string,newPassword:string) {
        const result = await User.updateOne({_id:id}, {"userData.password": newPassword})

        return result.matchedCount === 1
    },


    async deleteUser(userId: string): Promise<boolean> {

        const result = await User.deleteOne({_id: userId})

        return result.deletedCount === 1
    },


    async isUserExist(userId: string): Promise<boolean> {

        const result = await User.exists({_id: userId})

        return result !== null


    },


    async getUserByLoginOrEmail(loginOrEmail: string): Promise<UserDBType | null> {

        return User.findOne({$or: [{"userData.login": loginOrEmail}, {"userData.email": loginOrEmail}]})

    },

    async isEmailExist(email: string): Promise<boolean> {

        const result = await User.exists({"userData.email": email})

        return result !== null

    },

    async isLoginExist(login: string): Promise<boolean> {

        const result = await User.exists({"userData.login": login})

        return result !== null

    },

    async getUserByEmailConfirmationCode(code: string): Promise<UserDBType | null> {

        return User.findOne({"userConfirmation.confirmationCode": code})

    },

    async confirmUserEmail(code: string) {

        const result = await User.updateOne({"userConfirmation.confirmationCode": code}, {"userConfirmation.isConfirmed": true})

        return result.matchedCount === 1

    },

    async setNewEmailConfirmationCode(email: string, code: string) {
        const result = await User.updateOne({"userData.email": email}, {"userConfirmation.confirmationCode": code})

        return result.matchedCount === 1
    },

    async isEmailConfirmed(email: string): Promise<boolean> {

        const user = await User.findOne({"userData.email": email})

        if (!user) return false

        return user.userConfirmation.isConfirmed

    }


}
import {User} from "../../db/models/user";
import {userObjToViewModel} from "../_mappers/toUserViewModel";
import {UserInputModel} from "../../types/models/user/user-input-model";
import {UserConfirmation, UserDBType, UserActivity} from "../../types/models/user/user-DB-type";
import {UserViewModel} from "../../types/models/user/user-view-model";
import {Types} from "mongoose";
import {injectable} from "inversify";

@injectable()
export class UserRepository  {


    async getUserById(id: string): Promise<UserDBType | null> {
        const result = await User.findOne({_id: id})

        if (!result) return null

        return result
    }

    async getUserByEmail(email: string): Promise<UserDBType | null> {
        const result = await User.findOne({"userData.email": email})

        if (!result) return null

        return result
    }

    async getUserByPasswordRecoveryCode(code: string): Promise<UserDBType | null> {
        const result = await User.findOne({"userData.passwordRecoveryCode": code})

        if (!result) return null

        return result
    }

    async createUser(userData: UserInputModel, userConfirmation: UserConfirmation): Promise<UserViewModel> {

        const newUser: UserDBType = await User.create({
            userData,
            userConfirmation
        })

        return userObjToViewModel(newUser)

    }

    async addNewRecoveryPasswordCodeForUser(id:string,code:string | null) {
        const result = await User.updateOne({_id:id}, {"userData.passwordRecoveryCode": code})

        return result.matchedCount === 1


    }


    async registerUser(userData: UserInputModel, userConfirmation: UserConfirmation): Promise<UserDBType> {

        return await User.create({
            userData,
            userConfirmation
        })


    }

    async setNewPasswordForUser(id:string,newPassword:string) {
        const result = await User.updateOne({_id:id}, {"userData.password": newPassword})

        return result.matchedCount === 1
    }


    async deleteUser(userId: string): Promise<boolean> {

        const result = await User.deleteOne({_id: userId})

        return result.deletedCount === 1
    }


    async isUserExist(userId: string): Promise<boolean> {

        const result = await User.exists({_id: userId})

        return result !== null


    }


    async getUserByLoginOrEmail(loginOrEmail: string): Promise<UserDBType | null> {

        return User.findOne({$or: [{"userData.login": loginOrEmail}, {"userData.email": loginOrEmail}]})

    }

    async isEmailExist(email: string): Promise<boolean> {

        const result = await User.exists({"userData.email": email})

        return result !== null

    }

    async isLoginExist(login: string): Promise<boolean> {

        const result = await User.exists({"userData.login": login})

        return result !== null

    }

    async getUserByEmailConfirmationCode(code: string): Promise<UserDBType | null> {

        return User.findOne({"userConfirmation.confirmationCode": code})

    }

    async confirmUserEmail(code: string) {

        const result = await User.updateOne({"userConfirmation.confirmationCode": code}, {"userConfirmation.isConfirmed": true})

        return result.matchedCount === 1

    }

    async setNewEmailConfirmationCode(email: string, code: string) {
        const result = await User.updateOne({"userData.email": email}, {"userConfirmation.confirmationCode": code})

        return result.matchedCount === 1
    }

    async isEmailConfirmed(email: string): Promise<boolean> {

        const user = await User.findOne({"userData.email": email})

        if (!user) return false

        return user.userConfirmation.isConfirmed

    }

    async isUserLikeStatusForCommentExist(userId:string,commentId:string):Promise<boolean> {
        const status = await User.findOne({_id:userId,
            $or:[
                {"userActivity.commentActivity.likes.commentId": commentId},
                {"userActivity.commentActivity.dislikes.commentId": commentId}
            ]

        })

        return !!status
    }


    async createLikeStatus(userId:string,commentId:string,likeStatus:string) {

        if(likeStatus === "Like") {
            return User.updateOne(
                { _id: userId },
                { $push: { "userActivity.commentActivity.likes": {commentId: new Types.ObjectId(commentId)} } },
            )
        }
        else {
            return User.updateOne(
                { _id: userId },
                { $push: { "userActivity.commentActivity.dislikes": {commentId: new Types.ObjectId(commentId)} } },
            )
        }


    }


    async deleteLikeStatus(commentId:string,userId:string) {
        const deletingResult = await User.updateOne(
            {_id:userId},
            {$pull: {
                "userActivity.commentActivity.likes":{commentId},
                "userActivity.commentActivity.dislikes":{commentId}
            }})

        return deletingResult.matchedCount === 1
    }



    async getUserActivityById(userId:string):Promise<UserActivity | null> {

        const user:UserDBType | null = await User.findById(userId).lean()

        if(!user) return null

        return user.userActivity


    }


}
import {ObjectId, Types} from "mongoose";


export type UserDBType = {
    _id: ObjectId
    userData:UserData
    userConfirmation:UserConfirmation
    userActivity:UserActivity

}

export type NewUserData = {
    userData:UserData
    userConfirmation:UserConfirmation
}







export type UserData = {
    login:string
    password:string
    passwordRecoveryCode:string | null
    email:string
    createdAt:Date
    updatedAt:Date

}


export type UserConfirmation = {
    confirmationCode:string
    isConfirmed:boolean
    expirationDate:Date
}


//user activity types


export type UserCommentLike = {
    commentId:Types.ObjectId
}
export type UserCommentDislike = UserCommentLike




export type ActivityElem = {
    likes:UserCommentLike[]
    dislikes:UserCommentDislike[]
}

export type UserActivity = {
    commentActivity:ActivityElem
}

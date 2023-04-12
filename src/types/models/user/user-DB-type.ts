import {ObjectId} from "mongoose";


export type UserDBType = {
    _id: ObjectId
    userData:UserData
    userConfirmation:UserConfirmation

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
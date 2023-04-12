import {Schema} from "mongoose";

import {UserConfirmation, UserData, UserDBType} from "../../types/models/user/user-DB-type";

export const userDataSchema = new Schema<UserData>({
    login: {type: String, required: true},
    password: {type: String, required: true},
    passwordRecoveryCode: {type: String, default:null},
    email: {type: String, required: true},
}, { timestamps: true , _id:false},)


export const userConfirmation = new Schema<UserConfirmation>({
    confirmationCode: {type: String, required: true},
    isConfirmed: {type: Boolean, required: true},
    expirationDate: {type: Date, required: true},
}, {_id:false})

export const userSchema = new Schema<UserDBType>({
    userData: {type: userDataSchema, required: true},
    userConfirmation: {type: userConfirmation, required: true},
}, )

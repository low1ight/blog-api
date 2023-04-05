import {Schema} from "mongoose";

import {UserDBType} from "../../types/models/user/user-DB-type";


export const userSchema = new Schema<UserDBType>({
    login: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
}, { timestamps: true })
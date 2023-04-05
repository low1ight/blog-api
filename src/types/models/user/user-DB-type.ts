import {ObjectId} from "mongoose";


export type UserDBType = {
    _id: ObjectId,
    login:string
    password:string
    email:string
    createdAt:Date
    updatedAt:Date

}
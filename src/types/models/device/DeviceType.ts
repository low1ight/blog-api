import {ObjectId} from "mongoose";


export type DeviceType = {
    _id:ObjectId
    sessionId:string
    userId:ObjectId
    title:string
    createdAt:Date
    updatedAt:Date

}
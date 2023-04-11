import {ObjectId} from "mongoose";


export type RequestLimiterModel = {
    _id:ObjectId
    ip:string,
    reqUrl:string,
    reqMethod:string
    createdAt:Date
    updatedAt:Date
}
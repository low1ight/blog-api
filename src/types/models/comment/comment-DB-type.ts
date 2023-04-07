import {ObjectId} from "mongoose";


export type commentDBType = {
    _id: ObjectId,
    content:string
    commentatorInfo:CommentatorInfo
    createdAt:Date
    updatedAt:Date
}



export type CommentatorInfo = {
    userId:ObjectId,
    userLogin:string
}
import {ObjectId} from "mongoose";


export type CommentDBType = {
    _id: ObjectId
    postId:ObjectId
    content:string
    commentatorInfo:CommentatorInfo
    createdAt:Date
    updatedAt:Date
}



export type CommentatorInfo = {
    userId:ObjectId,
    userLogin:string
}
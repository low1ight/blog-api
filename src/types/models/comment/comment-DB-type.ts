import {ObjectId} from "mongoose";
import {LikeDBModel} from "../like/Like-DB-model";



export type CommentDBType = {
    _id: ObjectId
    postId:ObjectId
    content:string
    commentatorInfo:CommentatorInfo
    createdAt:Date
    updatedAt:Date
}
export type CommentPopulatedType = {
    _id: ObjectId
    postId:ObjectId
    content:string
    commentatorInfo:CommentatorInfo
    likes:LikeDBModel[]
    createdAt:Date
    updatedAt:Date
}


export type CommentatorInfo = {
    userId:ObjectId,
    userLogin:string
}
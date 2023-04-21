import {ObjectId} from "mongoose";
import {CommentDislikeStatus, CommentLikeStatus} from "./comment-like-status";


export type CommentDBType = {
    _id: ObjectId
    postId:ObjectId
    content:string
    commentatorInfo:CommentatorInfo
    createdAt:Date
    updatedAt:Date
    likes: CommentLikeStatus[]
    dislikes:CommentDislikeStatus[]
    likesCount:number
    dislikesCount:number
}



export type CommentatorInfo = {
    userId:ObjectId,
    userLogin:string
}
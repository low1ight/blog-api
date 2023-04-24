import {Types} from "mongoose";


export type LikeDBModel = {
    _id:Types.ObjectId
    likeTarget:string
    targetId:Types.ObjectId
    likeStatus:"Like" | "Dislike"
    userLogin:string
    userId:Types.ObjectId
    createdAt:Date
    updatedAt:Date

}
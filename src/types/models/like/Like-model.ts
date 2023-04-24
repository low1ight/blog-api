import {Types} from "mongoose";


export type LikeModel = {
    likeTarget:string
    targetId:Types.ObjectId
    likeStatus:"Like" | "Dislike"
    userLogin:string
    userId:Types.ObjectId


}
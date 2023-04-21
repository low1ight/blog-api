import {Types} from "mongoose";


export type CommentLikeStatus = {
    userId:Types.ObjectId

}
export type CommentDislikeStatus = CommentLikeStatus
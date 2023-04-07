import {Schema} from "mongoose";
import {CommentatorInfo, CommentDBType} from "../../types/models/comment/comment-DB-type";
import {ObjectId} from "mongodb";

export const commentatorSchema = new Schema<CommentatorInfo>({
    userId: {type: ObjectId, required: true},
    userLogin: {type: String, required: true},
})


export const commentSchema = new Schema<CommentDBType>({
    content: {type: String, required: true},
    commentatorInfo: {type: commentatorSchema, required: true},

}, { timestamps: true })



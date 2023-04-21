import {Schema} from "mongoose";
import {CommentatorInfo, CommentDBType} from "../../types/models/comment/comment-DB-type";
import {ObjectId} from "mongodb";
import {CommentLikeStatus} from "../../types/models/comment/comment-like-status";

export const commentatorSchema = new Schema<CommentatorInfo>({
    userId: {type: ObjectId, required: true},
    userLogin: {type: String, required: true},
})
export const likeDislikeSchema = new Schema<CommentLikeStatus>({
    userId: {type: Schema.Types.ObjectId, required: true},
},{ _id : false ,timestamps: { createdAt: 'createdAt' }})

export const commentSchema = new Schema<CommentDBType>({
    content: {type: String, required: true},
    postId: {type: ObjectId, required: true},
    commentatorInfo: {type: commentatorSchema, required: true},
    likes: { type: [likeDislikeSchema], default: [] },
    dislikes: { type: [likeDislikeSchema], default: [] },


}, { timestamps: true ,toJSON: { virtuals: true } })


commentSchema.virtual('likesCount').get(function() {
    return this.likes.length;
});
commentSchema.virtual('dislikesCount').get(function() {
    return this.dislikes.length;
});
import {Schema,Types} from "mongoose";
import {PostDBType} from "../../types/models/post/post-DB-type";


export const postSchema = new Schema<PostDBType>({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: Types.ObjectId, required: true},
    blogName: {type: String, required: true},
}, { timestamps: true ,toJSON: { virtuals: true } })


postSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'targetId'
});
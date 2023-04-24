import {Schema} from "mongoose";
import {LikeModel} from "../../types/models/like/Like-model";

export const likeSchema = new Schema<LikeModel>({
    likeTarget: {type: String, required: true},
    targetId: {type: Schema.Types.ObjectId, required: true, ref:"Comment"},
    likeStatus: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
}, { timestamps: true })
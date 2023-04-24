import {model} from "mongoose";
import {LikeDBModel} from "../../types/models/like/Like-DB-model";
import {likeSchema} from "../schemas/like-schema";

export const Like = model<LikeDBModel>('Like', likeSchema)
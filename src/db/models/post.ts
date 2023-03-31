import {model} from "mongoose";
import {postSchema} from "../schemas/post-schema";
import {PostDBType} from "../../types/models/post/post-DB-type";


export const Post = model<PostDBType>('Post', postSchema)
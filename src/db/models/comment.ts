import {model} from "mongoose";
import {CommentDBType} from "../../types/models/comment/comment-DB-type";
import {commentSchema} from "../schemas/comment-schema";


export const Post = model<CommentDBType>('Comment', commentSchema)
import {model} from "mongoose";
import {CommentDBType} from "../../types/models/comment/comment-DB-type";
import {commentSchema} from "../schemas/comment-schema";


export const Comment = model<CommentDBType>('Comment', commentSchema)
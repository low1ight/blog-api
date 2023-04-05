import {model} from "mongoose";
import {PostDBType} from "../../types/models/post/post-DB-type";
import {userSchema} from "../schemas/user-schema";


export const User = model<PostDBType>('User', userSchema)
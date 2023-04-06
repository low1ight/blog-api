import {model} from "mongoose";
import {userSchema} from "../schemas/user-schema";
import {UserDBType} from "../../types/models/user/user-DB-type";


export const User = model<UserDBType>('User', userSchema)
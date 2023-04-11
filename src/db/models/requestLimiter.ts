import {model} from "mongoose";
import {UserDBType} from "../../types/models/user/user-DB-type";
import {requestLimiterSchema} from "../schemas/request-limiter-schema";


export const RequestLimiter = model<UserDBType>('RequestLimiter', requestLimiterSchema)
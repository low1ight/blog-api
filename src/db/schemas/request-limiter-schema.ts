import {Schema} from "mongoose";
import {RequestLimiterModel} from "../../types/models/requestLimiter/requestLimiterModel";


export const requestLimiterSchema = new Schema<RequestLimiterModel>({
    ip: {type: String, required: true},
    reqUrl: {type: String, required: true},
    reqMethod: {type: String, required: true},
}, { timestamps: true })
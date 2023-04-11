import {Schema, Types} from "mongoose";
import {DeviceType} from "../../types/models/device/DeviceType";

export const deviceSchema = new Schema<DeviceType>({
    sessionId: {type: String, required: true},
    userId: {type: Types.ObjectId, required: true},
    title: {type: String, required: true},
    ip: {type: String, required: true},
}, { timestamps: true })
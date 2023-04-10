import {model} from "mongoose";
import {DeviceType} from "../../types/models/device/DeviceType";
import {deviceSchema} from "../schemas/device-schema";

export const Device = model<DeviceType>('Device', deviceSchema)
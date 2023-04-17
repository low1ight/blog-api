import {Device} from "../../db/models/device";
import {devicesArrToViewModel} from "../_mappers/toDeviceViewModel";
import {DeviceType} from "../../types/models/device/DeviceType";


export class DeviceQueryRepository  {

    async getAllUserDevices(userId:string) {

        const devices:DeviceType[] = await Device.find({userId})

        return devicesArrToViewModel(devices)
    }


}
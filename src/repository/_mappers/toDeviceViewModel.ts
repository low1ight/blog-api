import {DeviceType} from "../../types/models/device/DeviceType";
import {DeviceViewModel} from "../../types/models/device/DeviceViewType";

export const devicesArrToViewModel = (arr:DeviceType[]):DeviceViewModel[] => {

    return arr.map(item => deviceObjToViewModel(item))

}

export const deviceObjToViewModel = (item:DeviceType):DeviceViewModel => {
    return ({
        deviceId: item._id.toString(),
        ip: item.ip,
        title: item.title,
        lastActiveDate: item.updatedAt,
    })
}
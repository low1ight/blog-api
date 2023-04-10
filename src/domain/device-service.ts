import {deviceRepository} from "../repository/device/device-repository";
import {v4 as uuidv4} from "uuid";
import {ObjectId} from "mongoose";


export const deviceService = {

    async createNewDevice(userId:ObjectId,title:string,ip:string) {

        const newSessionId = uuidv4()

        return await deviceRepository.createDevice(newSessionId,title,ip,userId)

    },


    async refreshDeviceSessionId(deviceId:string):Promise<string | null> {

        const newSessionId = uuidv4()

        const result = await deviceRepository.refreshSessionId(deviceId,newSessionId)

        if(!result) return null

        return newSessionId
    }

}
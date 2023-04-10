import {Device} from "../../db/models/device";
import {ObjectId} from "mongoose";
import {DeviceType} from "../../types/models/device/DeviceType";


export const deviceRepository = {

    async createDevice(sessionId:string,title:string,ip:string,userId:ObjectId):Promise<DeviceType> {

          return await Device.create({
              sessionId,
              title,
              ip,
              userId
          })


    },

    async refreshSessionId(deviceId:string,newSessionId:string):Promise<boolean> {

        const result = await Device.updateOne({_id:deviceId},{sessionId:newSessionId})

        return result.matchedCount === 1


    },

    async getCurrentDeviceSessionId(deviceId:string):Promise<string | null> {

        const result:DeviceType | null = await Device.findOne({_id:deviceId})

        if(!result) return null

        return result.sessionId


    },


    async deleteDevice(deviceId:string) {

        const result = await Device.deleteOne({_id:deviceId})

        return result.deletedCount === 1

    },




}
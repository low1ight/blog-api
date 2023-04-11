import {deviceRepository} from "../repository/device/device-repository";
import {v4 as uuidv4} from "uuid";
import {ObjectId} from "mongoose";
import {authService} from "./auth-service";
import {createCustomResponse, CustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {RefreshTokenPayloadData} from "../types/models/jwt/RefreshTokenPayloadData";
import {DeviceType} from "../types/models/device/DeviceType";


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
    },




    async deleteAllAnotherDevices(refreshToken:string,userId:string) {

        const response:CustomResponse<RefreshTokenPayloadData> = await authService.verifyRefreshToken(refreshToken)

        if(!response.successful) return response

        const deletingResponse = await deviceRepository.deleteAllAnotherDevices(response.content.deviceId, userId)

        if(!deletingResponse) return createCustomResponse(false,500,'deleting error')

        return createCustomResponse(true,200,'OK')

    },


    async deleteById(deviceId:string,userId:string) {

        const device:DeviceType | null = await deviceRepository.getDeviceById(deviceId)

        if(!device) return createCustomResponse(false,404,"this device don't exist")

        if(device.userId.toString() !== userId) return createCustomResponse(false,403,"can't delete device another user")

        const isDeleted = await deviceRepository.deleteDevice(deviceId)

        if(!isDeleted) return createCustomResponse(false,500,"this device don't exist")

        return createCustomResponse(true,204,"this device don't exist")
    }

}
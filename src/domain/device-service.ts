import {DeviceRepository, } from "../repository/device/device-repository";
import {v4 as uuidv4} from "uuid";
import {ObjectId} from "mongoose";
import {createCustomResponse, CustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {RefreshTokenPayloadData} from "../types/models/jwt/RefreshTokenPayloadData";
import {DeviceType} from "../types/models/device/DeviceType";
import {JwtService} from "../application/jwt-service";
import {injectable} from "inversify";

@injectable()
export class DeviceService {


    constructor(protected deviceRepository:DeviceRepository,protected jwtService:JwtService) {
    }

    async createNewDevice(userId:ObjectId,title:string,ip:string) {

        const newSessionId = uuidv4()

        return await this.deviceRepository.createDevice(newSessionId,title,ip,userId)

    }


    async refreshDeviceSessionId(deviceId:string):Promise<string | null> {

        const newSessionId = uuidv4()

        const result = await this.deviceRepository.refreshSessionId(deviceId,newSessionId)

        if(!result) return null

        return newSessionId
    }




    async deleteAllAnotherDevices(refreshToken:string) {

        const response:CustomResponse<RefreshTokenPayloadData> = await this.jwtService.verifyRefreshToken(refreshToken)

        if(!response.successful) return response

        const deletingResponse = await this.deviceRepository.deleteAllAnotherDevices(response.content.deviceId, response.content.userId)

        if(!deletingResponse) return createCustomResponse(false,500,'deleting error')

        return createCustomResponse(true,200,'OK')

    }


    async deleteById(deviceId:string,refreshToken:string) {

        const response:CustomResponse<RefreshTokenPayloadData> = await this.jwtService.verifyRefreshToken(refreshToken)

        if(!response.successful) return response



        const device:DeviceType | null = await this.deviceRepository.getDeviceById(deviceId)

        if(!device) return createCustomResponse(false,404,"this device don't exist")

        if(device.userId.toString() !== response.content.userId) return createCustomResponse(false,403,"can't delete device another user")


        const isDeleted = await this.deviceRepository.deleteDevice(deviceId)

        if(!isDeleted) return createCustomResponse(false,500,"this device don't exist")


        return createCustomResponse(true,204,"this device don't exist")
    }

}
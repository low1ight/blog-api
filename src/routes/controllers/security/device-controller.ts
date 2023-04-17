import {Request,Response} from "express";
import {RequestWithParams} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {DeviceService} from "../../../domain/device-service";
import {JwtService} from "../../../application/jwt-service";
import {DeviceQueryRepository} from "../../../repository/device/device-query-repository";

export class DeviceController  {

    constructor(protected jwtService:JwtService,
                protected deviceQueryRepository:DeviceQueryRepository,
                protected deviceService:DeviceService) {}


    async getDevices(req:Request,res:Response) {

        const refreshTokenPayloadData = await this.jwtService.verifyRefreshToken(req.cookies.refreshToken)

        if(!refreshTokenPayloadData.successful) return res.sendStatus(401)

        const devices = await this.deviceQueryRepository.getAllUserDevices(refreshTokenPayloadData.content.userId)

        return res.json(devices)

    }


    async deleteAllAnotherDevices(req:Request,res:Response) {

        const deletingResult = await this.deviceService.deleteAllAnotherDevices(req.cookies.refreshToken)

        if(!deletingResult.successful) return res.sendStatus(401)

        return res.sendStatus(204)




    }


    async deleteDeviceById(req:RequestWithParams<IdModel>,res:Response) {

        const deletingResult = await this.deviceService.deleteById(req.params.id,req.cookies.refreshToken)

        if(!deletingResult.successful) return res.sendStatus(deletingResult.statusCode)

        return res.sendStatus(204)
    }




}
import {deviceQueryRepository} from "../../../repository/device/device-query-repository";
import {Request,Response} from "express";
import {deviceService} from "../../../domain/device-service";
import {RequestWithParams} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {authService} from "../../../domain/auth-service";

export const deviceController = {


    async getDevices(req:Request,res:Response) {

        const refreshTokenPayloadData = await authService.verifyRefreshToken(req.cookies.refreshToken)

        if(!refreshTokenPayloadData.successful) return res.sendStatus(401)

        const devices = await deviceQueryRepository.getAllUserDevices(refreshTokenPayloadData.content.userId)

        return res.json(devices)

    },


    async deleteAllAnotherDevices(req:Request,res:Response) {

        const deletingResult = await deviceService.deleteAllAnotherDevices(req.cookies.refreshToken)

        if(!deletingResult.successful) return res.sendStatus(401)

        return res.sendStatus(204)




    },


    async deleteDeviceById(req:RequestWithParams<IdModel>,res:Response) {

        const deletingResult = await deviceService.deleteById(req.params.id,req.cookies.refreshToken)

        if(!deletingResult.successful) return res.sendStatus(deletingResult.statusCode)

        return res.sendStatus(204)
    }




}
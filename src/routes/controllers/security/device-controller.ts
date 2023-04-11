import {deviceQueryRepository} from "../../../repository/device/device-query-repository";
import {Request,Response} from "express";
import {deviceService} from "../../../domain/device-service";
import {RequestWithParams} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";

export const deviceController = {


    async getDevices(req:Request,res:Response) {

        const devices = await deviceQueryRepository.getAllUserDevices(req.authUserData!.userId)

        return res.json(devices)

    },


    async deleteAllAnotherDevices(req:Request,res:Response) {

        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.sendStatus(401)

        const deletingResult = await deviceService.deleteAllAnotherDevices(refreshToken,req.authUserData!.userId)

        if(!deletingResult.successful) return res.sendStatus(401)

        return res.sendStatus(204)




    },


    async deleteDeviceById(req:RequestWithParams<IdModel>,res:Response) {

        const deletingResult = await deviceService.deleteById(req.params.id,req.authUserData!.userId)

        if(!deletingResult.successful) return res.sendStatus(deletingResult.statusCode)

        return res.sendStatus(204)
    }




}
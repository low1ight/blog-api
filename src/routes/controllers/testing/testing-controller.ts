import {RequestWithParams} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {Response} from "express";
import {testingService} from "../../../domain/testing-service";

export const testingController = {

    async deleteAllData(req:RequestWithParams<IdModel>,res:Response) {
        try {
           await testingService.deleteAllData()
            res.sendStatus(204)

        } catch (e:any) {
            res.status(500).json(e.message)
        }
    }
}
import {RequestWithParams} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {Response} from "express";
import {TestingService} from "../../../domain/testing-service";
import {injectable} from "inversify";

@injectable()
export class TestingController {

    constructor(protected testingService:TestingService) {}

    async deleteAllData(req:RequestWithParams<IdModel>,res:Response) {
        try {
           await this.testingService.deleteAllData()
            res.sendStatus(204)

        } catch (e:any) {
            res.status(500).json(e.message)
        }
    }
}
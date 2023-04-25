import {RequestLimiterRepository} from "../repository/requestLimiter/requestLimiter-repository";
import {injectable} from "inversify";

@injectable()
export class RequestLimiterService  {

    constructor(protected requestLimiterRepository:RequestLimiterRepository) {
    }

    async addNewRequest(ip:string,reqMethod:string,reqUrl:string) {
        return await this.requestLimiterRepository.createNewRequest(ip,reqMethod,reqUrl)
    }

}
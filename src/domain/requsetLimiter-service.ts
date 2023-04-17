import {RequestLimiterRepository} from "../repository/requestLimiter/requestLimiter-repository";


export class RequestLimiterService  {

    constructor(protected requestLimiterRepository:RequestLimiterRepository) {
    }

    async addNewRequest(ip:string,reqMethod:string,reqUrl:string) {
        return await this.requestLimiterRepository.createNewRequest(ip,reqMethod,reqUrl)
    }

}
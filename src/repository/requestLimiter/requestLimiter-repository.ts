import {RequestLimiter} from "../../db/models/requestLimiter";


export class RequestLimiterRepository  {


    async createNewRequest(ip:string,reqMethod:string,reqUrl:string) {

        return RequestLimiter.create({ip,reqMethod,reqUrl})

    }


}
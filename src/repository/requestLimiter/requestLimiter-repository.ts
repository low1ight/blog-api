import {RequestLimiter} from "../../db/models/requestLimiter";


export const requestLimiterRepository = {


    async createNewRequest(ip:string,reqMethod:string,reqUrl:string) {

        return RequestLimiter.create({ip,reqMethod,reqUrl})

    }


}
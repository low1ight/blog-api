import {requestLimiterRepository} from "../repository/requestLimiter/requestLimiter-repository";


export const requestLimiterService = {


    async addNewRequest(ip:string,reqMethod:string,reqUrl:string) {
        return await requestLimiterRepository.createNewRequest(ip,reqMethod,reqUrl)
    }

}
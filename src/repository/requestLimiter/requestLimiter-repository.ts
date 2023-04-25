import {RequestLimiter} from "../../db/models/requestLimiter";
import {injectable} from "inversify";

@injectable()
export class RequestLimiterRepository  {


    async createNewRequest(ip:string,reqMethod:string,reqUrl:string) {

        return RequestLimiter.create({ip,reqMethod,reqUrl})

    }


}
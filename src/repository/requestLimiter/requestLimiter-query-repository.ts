import {RequestLimiter} from "../../db/models/requestLimiter";
import {injectable} from "inversify";

@injectable()
export class RequestLimiterQueryRepository  {


    async getLastRequest(ip:string,reqMethod:string,reqUrl:string,ms:number) {

        const time = new Date(Date.now() - ms)

        const query = {
            ip,
            reqMethod,
            reqUrl,
            createdAt: { $gte: time },
        };

        return RequestLimiter.countDocuments(query)


    }




}
import {NextFunction,Request,Response} from "express";
import {requestLimiterQueryRepository, requestLimiterService} from "../composition-root";



export const rateLimiter = async (req:Request,res:Response,next:NextFunction) => {

    const ip = req.ip
    const reqMethod = req.method
    const reqUrl = req.url

    const recentRequestCount = await requestLimiterQueryRepository.getLastRequest(ip,reqMethod,reqUrl,10000)


    if(recentRequestCount >= 5) return res.sendStatus(429)


    await requestLimiterService.addNewRequest(ip,reqMethod,reqUrl)

    return next()

}
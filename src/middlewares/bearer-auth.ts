import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";

export const bearerAuth = async (req:Request,res:Response,next:NextFunction) => {


    let auth = req.headers.authorization

    if(!auth) return res.sendStatus(401)


    //get auth and token
    let [authType,token] = auth.split(' ')

    if(authType === "Bearer") res.sendStatus(401)


    //verify jwtToken and get userId
    const userPayloadData = await jwtService.getUserIdFromAccessToken(token)

    if(!userPayloadData) return res.sendStatus(401)

    req.authUserData = userPayloadData

    next()


}
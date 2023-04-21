import {NextFunction, Request, Response} from "express";
import {jwtService} from "../composition-root";

export const bearerAuth = async (req:Request,res:Response,next:NextFunction,requireAuth = true) => {


    let auth = req.headers.authorization


    //if auth header doesn't exist and auth is require return 401
    if(!auth && requireAuth) return res.sendStatus(401)



    //if auth header doesn't exist and auth for endpoint is not required
    if(!auth && !requireAuth) return next()


    //get auth and token
    let [authType,token] = auth!.split(' ')

    if(authType !== "Bearer") return res.sendStatus(401)


    //verify jwtToken and get userId
    let userPayloadData
    try {
        userPayloadData = await jwtService.getUserIdFromAccessToken(token)
    } catch (e:any) {
        return res.status(401).json(e.message)
    }



    req.authUserData = userPayloadData

    next()


}

export const optionalBearerAuth = (req:Request,res:Response,next:NextFunction) => {
    return bearerAuth(req, res, next, false);
};
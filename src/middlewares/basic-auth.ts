import {NextFunction,Request,Response} from "express";


export const basicAuth = (req:Request,res:Response,next:NextFunction) => {


    let auth = req.headers.authorization

    if(!auth) return res.sendStatus(401)

    //correct login / password

    const login = "admin"
    const password = "qwerty"


    //to base64
    const loginData = login + ':' + password
    const encodedString = Buffer.from(loginData).toString('base64');



    let [authType,authCode] = auth.split(' ')

    if(authType === "Basic" && authCode === encodedString) return next()

    return res.sendStatus(401)



}
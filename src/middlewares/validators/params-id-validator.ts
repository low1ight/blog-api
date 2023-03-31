import {ObjectId} from "mongodb";
import {NextFunction,Request, Response} from "express";




export const validateId = (req:Request,res:Response,next:NextFunction) => {

    if(!ObjectId.isValid(req.params.id)) {
            return res.sendStatus(404)

    }
    return next();
}
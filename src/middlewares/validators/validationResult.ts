import {ValidationError, validationResult} from "express-validator";
import {NextFunction,Request,Response} from "express";
import {errorObj} from "../../utils/errors/errorObj";
import {errorBody} from "../../utils/errors/errorBody";


export const errFormatter = (req:Request, res:Response, next:NextFunction) => {



    const errObjFormatter = ({ msg, param}: ValidationError) => {

        return errorObj(msg,param)
    };



    const result = validationResult(req).formatWith(errObjFormatter);

    if (!result.isEmpty()) {

        return res.status(400).json(errorBody(result.array({ onlyFirstError: true })));
    }

    return next()
}








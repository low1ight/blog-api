import {body} from "express-validator";
import {errMessages} from "../../../utils/errors/errMessages";




export const commentValidator = [

    body('content')
        .exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String'))
        .isLength({min:20}).withMessage(errMessages.tooShort(20))
        .isLength({max:300}).withMessage(errMessages.tooLong(300))

]

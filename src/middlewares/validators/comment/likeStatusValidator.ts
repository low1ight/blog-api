import {body} from "express-validator";
import {errMessages} from "../../../utils/errors/errMessages";
import {likeEnumValidator} from "../_custom/likeEnumValidator";



export const likeStatusValidator = [

    body('likeStatus')
        .exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String'))
        .custom(likeEnumValidator)

]

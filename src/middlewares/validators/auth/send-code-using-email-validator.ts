import {body} from "express-validator";
import {errMessages} from "../../../utils/errors/errMessages";


export const sendCodeUsingEmailValidator = [
    body('email')
        .exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String'))
        .isEmail().withMessage(errMessages.invalidEmail()),


]
import {body} from "express-validator";
import {errMessages} from "../../../utils/errors/errMessages";


const allFields = ['newPassword','recoveryCode']


const [newPassword] = allFields



export const newPasswordValidator = [

    body(allFields).exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String')),


    body(newPassword)
        .isLength({min:6}).withMessage(errMessages.tooShort(6))
        .isLength({max:20}).withMessage(errMessages.tooLong(20)),


]
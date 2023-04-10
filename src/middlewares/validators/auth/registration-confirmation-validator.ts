import {body} from "express-validator";
import {errMessages} from "../../../utils/errors/errMessages";


export const registrationConfirmationValidator = [
    body('code')
        .exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String')),


]
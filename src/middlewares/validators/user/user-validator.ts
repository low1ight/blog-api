import {errMessages} from "../../../utils/errors/errMessages";
import {body} from "express-validator";
import {isEmailExist} from "../_custom/isEmailExist";
import {isLoginExist} from "../_custom/isLoginExist";


const allFields = ["login","email","password"]

const [login,email,password] = allFields


export const userValidator = [
    body(allFields)
        .exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String')),

    body(login)
        .isLength({min:3}).withMessage(errMessages.tooShort(3))
        .isLength({max:15}).withMessage(errMessages.tooLong(15))
        .matches("^[a-zA-Z0-9_-]*$").withMessage(errMessages.invalidFormat('login'))
        .custom(isLoginExist).withMessage(errMessages.loginAlreadyTaken()),


    body(password)
        .isLength({min:6}).withMessage(errMessages.tooShort(6))
        .isLength({max:20}).withMessage(errMessages.tooLong(20)),

    body(email)
        .isEmail().withMessage(errMessages.invalidEmail())
        .custom(isEmailExist).withMessage(errMessages.emailAlreadyTaken())


]

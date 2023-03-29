import {body} from "express-validator";
import {errMessages} from "../../../utils/errors/errMessages";


const allFields:string[] = ["name","description","websiteUrl"];

const [name,description,websiteUrl] = allFields



export const blogValidator = [

    body(allFields)
        .exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String')),


    body(name)
        .isLength({max:15}).withMessage(errMessages.tooLong(15)),


    body(description)
        .isLength({max:500}).withMessage(errMessages.tooLong(500)),


    body(websiteUrl)
        .isLength({max:100}).withMessage(errMessages.tooLong(100))
        .isURL().withMessage('not url')

]
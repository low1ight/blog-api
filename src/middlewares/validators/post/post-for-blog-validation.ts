import {body} from "express-validator";
import {errMessages} from "../../../utils/errors/errMessages";


const allFields = ["title","shortDescription","content"]

const [title,shortDescription,content] = allFields;




export const postForBlogValidator = [

    body(allFields)
        .exists().withMessage(errMessages.notExist())
        .trim().notEmpty().withMessage(errMessages.isEmpty())
        .isString().withMessage(errMessages.incorrectType('String')),


    body(title)
        .isLength({max:30}).withMessage(errMessages.tooLong(30)),


    body(shortDescription)
        .isLength({max:100}).withMessage(errMessages.tooLong(100)),


    body(content)
        .isLength({max:1000}).withMessage(errMessages.tooLong(1000)),


]
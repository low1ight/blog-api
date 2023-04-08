import {Router} from "express";
import {commentController} from "./controllers/comment/comment-controller";
import {bearerAuth} from "../middlewares/bearer-auth";
import {validateId} from "../middlewares/validators/params-id-validator";
import {isCommentOwner} from "../middlewares/validators/comment/isCommentOwner";
import {commentValidator} from "../middlewares/validators/comment/comment-validator";
import {errFormatter} from "../middlewares/validators/validationResult";


export const commentRouter = Router()



commentRouter.get('/:id', commentController.getCommentById)

commentRouter.put('/:id',bearerAuth,validateId,isCommentOwner,commentValidator,errFormatter, commentController.updateComment)

commentRouter.delete('/:id',bearerAuth,validateId,isCommentOwner, commentController.deleteComment)

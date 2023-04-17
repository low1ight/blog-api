import {Router} from "express";
import {bearerAuth} from "../middlewares/bearer-auth";
import {validateId} from "../middlewares/validators/params-id-validator";
import {isCommentOwner} from "../middlewares/validators/comment/isCommentOwner";
import {commentValidator} from "../middlewares/validators/comment/comment-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {commentController} from "../composition-root";


export const commentRouter = Router()



commentRouter.get('/:id', commentController.getCommentById.bind(commentController))

commentRouter.put('/:id',bearerAuth,validateId,isCommentOwner,commentValidator,errFormatter, commentController.updateComment.bind(commentController))

commentRouter.delete('/:id',bearerAuth,validateId,isCommentOwner, commentController.deleteComment.bind(commentController))

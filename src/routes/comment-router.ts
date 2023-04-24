import {Router} from "express";
import {bearerAuth, optionalBearerAuth} from "../middlewares/bearer-auth";
import {validateId} from "../middlewares/validators/params-id-validator";
import {isCommentOwner} from "../middlewares/validators/comment/isCommentOwner";
import {commentValidator} from "../middlewares/validators/comment/comment-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {commentController} from "../composition-root";
import {likeStatusValidator} from "../middlewares/validators/comment/likeStatusValidator";
import {getCurrentUserCommentLikes} from "../middlewares/getCurrentUserLikes";

export const commentRouter = Router()



commentRouter.get('/:id',optionalBearerAuth,getCurrentUserCommentLikes, commentController.getCommentById.bind(commentController))

commentRouter.put('/:id/like-status',bearerAuth,validateId,likeStatusValidator,errFormatter, commentController.setLikeStatus.bind(commentController))

commentRouter.put('/:id',bearerAuth,validateId,isCommentOwner,commentValidator,errFormatter, commentController.updateComment.bind(commentController))

commentRouter.delete('/:id',bearerAuth,validateId,isCommentOwner, commentController.deleteComment.bind(commentController))

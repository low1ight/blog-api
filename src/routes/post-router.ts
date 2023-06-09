import {Router} from "express";
import {validateId} from "../middlewares/validators/params-id-validator";
import {postValidator} from "../middlewares/validators/post/post-validation";
import {errFormatter} from "../middlewares/validators/validationResult";
import {basicAuth} from "../middlewares/basic-auth";
import {bearerAuth, optionalBearerAuth} from "../middlewares/bearer-auth";
import {commentValidator} from "../middlewares/validators/comment/comment-validator";
import {postCommentsController, postController} from "../composition-root";
import {getCurrentUserCommentLikes, getCurrentUserPostLikes} from "../middlewares/getCurrentUserLikes";
import {likeStatusValidator} from "../middlewares/validators/comment/likeStatusValidator";



export const postRouter = Router()





postRouter.get('/', optionalBearerAuth,getCurrentUserPostLikes, postController.getPosts.bind(postController))

postRouter.get('/:id',optionalBearerAuth,getCurrentUserPostLikes, validateId, postController.getPostById.bind(postController))

postRouter.post('/', basicAuth,postValidator,errFormatter, postController.createPost.bind(postController))

postRouter.put('/:id', basicAuth,validateId,postValidator,errFormatter, postController.updatePost.bind(postController))

postRouter.delete('/:id', basicAuth,validateId, postController.deletePost.bind(postController))

postRouter.put('/:id/like-status', bearerAuth, getCurrentUserPostLikes, likeStatusValidator, errFormatter,

       postController.setLikeStatus.bind(postController)
    )





postRouter.get('/:id/comments',optionalBearerAuth,getCurrentUserCommentLikes, postCommentsController.getPostComments.bind(postCommentsController))

postRouter.post('/:id/comments', bearerAuth,commentValidator,errFormatter, postCommentsController.createComment.bind(postCommentsController))
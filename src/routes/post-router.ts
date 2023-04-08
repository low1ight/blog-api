import {Router} from "express";
import {postController} from "./controllers/post/post-controller";
import {validateId} from "../middlewares/validators/params-id-validator";
import {postValidator} from "../middlewares/validators/post/post-validation";
import {errFormatter} from "../middlewares/validators/validationResult";
import {basicAuth} from "../middlewares/basic-auth";
import {postCommentsController} from "./controllers/post/post-comments-controller";
import {bearerAuth} from "../middlewares/bearer-auth";



export const postRouter = Router()





postRouter.get('/', postController.getPosts)

postRouter.get('/:id', validateId, postController.getPostById)

postRouter.post('/', basicAuth,postValidator,errFormatter, postController.createPost)

postRouter.put('/:id', basicAuth,validateId,postValidator,errFormatter, postController.updatePost)

postRouter.delete('/:id', basicAuth,validateId, postController.deletePost)



postRouter.get('/:id/comments', postCommentsController.getPostComments)

postRouter.post('/:id/comments', bearerAuth, postCommentsController.createComment)
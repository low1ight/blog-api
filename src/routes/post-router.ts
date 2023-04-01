import {Router} from "express";
import {postController} from "./controllers/post-controller";
import {validateId} from "../middlewares/validators/params-id-validator";
import {postValidator} from "../middlewares/validators/post/post-validation";
import {errFormatter} from "../middlewares/validators/validationResult";



export const postRouter = Router()





postRouter.get('/', postController.getPosts)

postRouter.get('/:id', validateId, postController.getPostById)

postRouter.post('/', postValidator,errFormatter, postController.createPost)

postRouter.put('/:id', validateId,postValidator,errFormatter, postController.updatePost)

postRouter.delete('/:id', validateId, postController.deletePost)
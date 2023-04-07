import {Router} from "express";
import {postCommentsController} from "./controllers/post/post-comments-controller";


export const commentRouter = Router()




commentRouter.get('/:id/comments', postCommentsController.getPostComments)
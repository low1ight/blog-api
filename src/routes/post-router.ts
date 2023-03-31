import {Router} from "express";
import {postController} from "./controllers/post-controller";



export const postRouter = Router()





postRouter.get('/', postController.getPosts)
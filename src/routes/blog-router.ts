import {Router} from "express";
import {getBlogById, getBlogs, postBlog} from "./controllers/blog-controller";




export const blogRouter = Router()



blogRouter.get('/',getBlogs)

blogRouter.get('/:id',getBlogById)

blogRouter.post('/',postBlog)

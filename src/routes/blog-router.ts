import {Router} from "express";
import {blogController} from "./controllers/blog-controller";
import {blogValidator} from "../middlewares/validators/blogs/blogs-validator";
import {errFormatter} from "../middlewares/validators/validationResult";




export const blogRouter = Router()



blogRouter.get('/',  blogController.getBlogs)

blogRouter.get('/:id',  blogController.getBlogById)

blogRouter.post('/',blogValidator,errFormatter, blogController.postBlog)

blogRouter.put('/:id',blogValidator,errFormatter, blogController.putBlog)

blogRouter.delete('/:id', blogController.deleteBlog)

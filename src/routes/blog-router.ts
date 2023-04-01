import {Router} from "express";
import {blogController} from "./controllers/blog-controller";
import {blogValidator} from "../middlewares/validators/blogs/blogs-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {validateId} from "../middlewares/validators/params-id-validator";
import {basicAuth} from "../middlewares/basic-auth";




export const blogRouter = Router()



blogRouter.get('/',  blogController.getBlogs)

blogRouter.get('/:id', validateId,  blogController.getBlogById)

blogRouter.post('/',basicAuth, blogValidator,errFormatter, blogController.postBlog)

blogRouter.put('/:id',basicAuth,validateId,blogValidator,errFormatter, blogController.putBlog)

blogRouter.delete('/:id', basicAuth,validateId, blogController.deleteBlog)

import {Router} from "express";
import {deleteBlog, getBlogById, getBlogs, postBlog, putBlog} from "./controllers/blog-controller";
import {blogValidator} from "../middlewares/validators/blogs/blogs-validator";
import {errFormatter} from "../middlewares/validators/validationResult";




export const blogRouter = Router()



blogRouter.get('/', getBlogs)

blogRouter.get('/:id', getBlogById)

blogRouter.post('/',blogValidator,errFormatter, postBlog)

blogRouter.put('/:id',blogValidator,errFormatter, putBlog)

blogRouter.delete('/:id', deleteBlog)

import {Router} from "express";
import {deleteBlog, getBlogById, getBlogs, postBlog, putBlog} from "./controllers/blog-controller";




export const blogRouter = Router()



blogRouter.get('/', getBlogs)

blogRouter.get('/:id', getBlogById)

blogRouter.post('/', postBlog)

blogRouter.put('/:id', putBlog)

blogRouter.delete('/:id', deleteBlog)

import {Router} from "express";
import {blogController} from "./controllers/blog/blog-controller";
import {blogValidator} from "../middlewares/validators/blogs/blogs-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {validateId} from "../middlewares/validators/params-id-validator";
import {basicAuth} from "../middlewares/basic-auth";
import {blogPostsController} from "./controllers/blog/blog-posts-controller";
import {postForBlogValidator} from "../middlewares/validators/post/post-for-blog-validation";




export const blogRouter = Router()


// base blog endpoints

blogRouter.get('/',  blogController.getBlogs)

blogRouter.get('/:id', validateId,  blogController.getBlogById)

blogRouter.post('/',basicAuth, blogValidator,errFormatter, blogController.postBlog)

blogRouter.put('/:id',basicAuth,validateId,blogValidator,errFormatter, blogController.putBlog)

blogRouter.delete('/:id', basicAuth,validateId, blogController.deleteBlog)




// blog posts endpoints


blogRouter.get('/:id/posts',validateId,  blogPostsController.getBlogPosts)

blogRouter.post('/:id/posts', basicAuth,validateId,postForBlogValidator,errFormatter, blogPostsController.createPostForBlog)

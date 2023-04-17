import {Router} from "express";
import {blogValidator} from "../middlewares/validators/blogs/blogs-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {validateId} from "../middlewares/validators/params-id-validator";
import {basicAuth} from "../middlewares/basic-auth";
import {postForBlogValidator} from "../middlewares/validators/post/post-for-blog-validation";
import {blogController, blogPostsController} from "../composition-root";




export const blogRouter = Router()


// base blog endpoints

blogRouter.get('/',  blogController.getBlogs.bind(blogController))

blogRouter.get('/:id', validateId,  blogController.getBlogById.bind(blogController))

blogRouter.post('/',basicAuth, blogValidator,errFormatter, blogController.postBlog.bind(blogController))

blogRouter.put('/:id',basicAuth,validateId,blogValidator,errFormatter, blogController.putBlog.bind(blogController))

blogRouter.delete('/:id', basicAuth,validateId, blogController.deleteBlog.bind(blogController))




// blog posts endpoints


blogRouter.get('/:id/posts',validateId,  blogPostsController.getBlogPosts.bind(blogPostsController))

blogRouter.post('/:id/posts', basicAuth,validateId,postForBlogValidator,errFormatter, blogPostsController.createPostForBlog.bind(blogPostsController))

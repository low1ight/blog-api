import {Router} from "express";
import {blogValidator} from "../middlewares/validators/blogs/blogs-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {validateId} from "../middlewares/validators/params-id-validator";
import {basicAuth} from "../middlewares/basic-auth";
import {postForBlogValidator} from "../middlewares/validators/post/post-for-blog-validation";
import {container} from "../composition-root";
import {optionalBearerAuth} from "../middlewares/bearer-auth";
import {getCurrentUserPostLikes} from "../middlewares/getCurrentUserLikes";
import {BlogController} from "./controllers/blog/blog-controller";
import {BlogPostsController} from "./controllers/blog/blog-posts-controller";




export const blogRouter = Router()

const blogController = container.resolve(BlogController)
const blogPostsController = container.resolve(BlogPostsController)


// base blog endpoints

blogRouter.get('/',  blogController.getBlogs.bind(blogController))

blogRouter.get('/:id', validateId,  blogController.getBlogById.bind(blogController))

blogRouter.post('/',basicAuth, blogValidator,errFormatter, blogController.postBlog.bind(blogController))

blogRouter.put('/:id',basicAuth,validateId,blogValidator,errFormatter, blogController.putBlog.bind(blogController))

blogRouter.delete('/:id', basicAuth,validateId, blogController.deleteBlog.bind(blogController))




// blog posts endpoints


blogRouter.get('/:id/posts',validateId,optionalBearerAuth,getCurrentUserPostLikes,  blogPostsController.getBlogPosts.bind(blogPostsController))

blogRouter.post('/:id/posts', basicAuth,validateId,postForBlogValidator,errFormatter, blogPostsController.createPostForBlog.bind(blogPostsController))

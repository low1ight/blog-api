import {UserRepository} from "./repository/user/user-repository";
import {UserQueryRepository} from "./repository/user/user-query-repository";
import {UserService} from "./domain/user-service";
import {UserController} from "./routes/controllers/user/user-controller";
import {AuthService} from "./domain/auth-service";
import {AuthController} from "./routes/controllers/auth/auth-controller";
import {DeviceRepository} from "./repository/device/device-repository";
import {DeviceQueryRepository} from "./repository/device/device-query-repository";
import {BlogRepository} from "./repository/blog/blog-repository";
import {BlogQueryRepository} from "./repository/blog/blog-query-repository";
import {CommentRepository} from "./repository/comment/comment-repository";
import {CommentQueryRepository} from "./repository/comment/comment-query-repository";
import {PostRepository} from "./repository/post/post-repository";
import {PostQueryRepository} from "./repository/post/post-query-repository";
import {RequestLimiterRepository} from "./repository/requestLimiter/requestLimiter-repository";
import {RequestLimiterQueryRepository} from "./repository/requestLimiter/requestLimiter-query-repository";
import {TestingRepository} from "./repository/testing/testing-repository";
import {JwtService} from "./application/jwt-service";
import {DeviceService} from "./domain/device-service";
import {EmailManager} from "./adapters/email-manager";
import {DeviceController} from "./routes/controllers/security/device-controller";
import {BlogService} from "./domain/blog-service";
import {CommentService} from "./domain/comment-service";
import {PostService} from "./domain/post-service";
import {RequestLimiterService} from "./domain/requsetLimiter-service";
import {TestingService} from "./domain/testing-service";
import {BlogController} from "./routes/controllers/blog/blog-controller";
import {BlogPostsController} from "./routes/controllers/blog/blog-posts-controller";
import {CommentController} from "./routes/controllers/comment/comment-controller";
import {PostController} from "./routes/controllers/post/post-controller";
import {PostCommentsController} from "./routes/controllers/post/post-comments-controller";
import {TestingController} from "./routes/controllers/testing/testing-controller";
import {LikeRepository} from "./repository/like/like-repository";
import {LikeService} from "./domain/like-service";



//managers
const emailManager = new EmailManager()



//repositories
export const likeRepository = new LikeRepository()
export const userRepository = new UserRepository()
const deviceRepository = new DeviceRepository()
const blogRepository = new BlogRepository()
export const commentRepository = new CommentRepository()
const postRepository = new PostRepository()
export const requestLimiterRepository = new RequestLimiterRepository()
const testingRepository = new TestingRepository()



//query-repositories
const userQueryRepository = new UserQueryRepository()
const deviceQueryRepository = new DeviceQueryRepository()
export const blogQueryRepository = new BlogQueryRepository()
const commentQueryRepository = new CommentQueryRepository()
const postQueryRepository = new PostQueryRepository()
export const requestLimiterQueryRepository = new RequestLimiterQueryRepository()



//application
export const jwtService = new JwtService(deviceRepository)



//services
const likeService = new LikeService(likeRepository)
const deviceService = new DeviceService(deviceRepository,jwtService)
const userService = new UserService(userRepository)
const blogService = new BlogService(blogRepository,blogQueryRepository)
const commentService = new CommentService(commentRepository,postQueryRepository,userRepository,likeService)
const postService = new PostService(blogQueryRepository,postRepository,postQueryRepository)
export const requestLimiterService = new RequestLimiterService(requestLimiterRepository)
const testingService = new TestingService(testingRepository)
const authService = new AuthService(userRepository,userService,deviceRepository,deviceService,jwtService,emailManager)







//controllers
export const deviceController = new DeviceController(jwtService,deviceQueryRepository,deviceService)
export const blogController = new BlogController(blogService,blogQueryRepository)
export const commentController = new CommentController(commentService,userRepository,commentQueryRepository)
export const blogPostsController = new BlogPostsController(postService,postQueryRepository,blogQueryRepository)
export const postController = new PostController(postService,postQueryRepository)
export const postCommentsController = new PostCommentsController(commentService,postQueryRepository,likeRepository,commentQueryRepository)
export const testingController = new TestingController(testingService)
export const userController = new UserController(userService,userQueryRepository)
export const authController = new AuthController(authService,userQueryRepository)
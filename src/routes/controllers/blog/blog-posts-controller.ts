import {Response} from "express";
import {PostQueryRepository} from "../../../repository/post/post-query-repository";
import {PostViewModel} from "../../../types/models/post/post-view-model";
import {RequestWithParamsAndBody, RequestWithParamsAndQuery} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {BlogQueryRepository} from "../../../repository/blog/blog-query-repository";
import {PostForBlogInputModel} from "../../../types/models/post/post-for-blog-input-model";
import {PostService} from "../../../domain/post-service";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {PostQueryType} from "../../../types/queryType/post/post-query-type";
import {blogQueryMapper} from "../../query-mappers/post-query-mapper";
import {PostInputQueryType} from "../../../types/queryType/post/post-input-query-type";
import {injectable} from "inversify";

@injectable()
export class BlogPostsController  {


    constructor(protected postService:PostService,
                protected postQueryRepository:PostQueryRepository,
                protected blogQueryRepository:BlogQueryRepository) {}
    async getBlogPosts(req: RequestWithParamsAndQuery<IdModel,PostInputQueryType>, res: Response) {


        const blogId = req.params.id

        const isBlogExist: boolean = await this.blogQueryRepository.isBlogExist(blogId)

        if (!isBlogExist) return res.sendStatus(404)

        const query:PostQueryType = blogQueryMapper(req.query)

        const userPostsLikes = req.userActivity || null

        const posts: ViewModelWithPaginator<PostViewModel[]> = await this.postQueryRepository.getBlogPosts(query,userPostsLikes,blogId)

        return res.json(posts)
    }

    async createPostForBlog(req: RequestWithParamsAndBody<IdModel,PostForBlogInputModel>, res: Response) {

        const blogId = req.params.id

        const isBlogExist: boolean = await this.blogQueryRepository.isBlogExist(blogId)

        if (!isBlogExist) return res.sendStatus(404)


        const result:PostViewModel = await this.postService.createPost({...req.body,blogId:blogId})

        return res.status(201).json(result)

    }



}
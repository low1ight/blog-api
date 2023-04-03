import {Response} from "express";
import {postQueryRepository} from "../../../repository/post/post-query-repository";
import {PostViewModel} from "../../../types/models/post/post-view-model";
import {RequestWithParams, RequestWithParamsAndBody} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {blogQueryRepository} from "../../../repository/blog/blog-query-repository";
import {PostForBlogInputModel} from "../../../types/models/post/post-for-blog-input-model";
import {postService} from "../../../domain/post-service";


export const blogPostsController = {

    async getBlogPosts(req: RequestWithParams<IdModel>, res: Response) {

        const blogId = req.params.id

        const isBlogExist: boolean = await blogQueryRepository.isBlogExist(blogId)

        if (!isBlogExist) return res.sendStatus(404)


        const posts: PostViewModel[] = await postQueryRepository.getBlogPosts(blogId)
        return res.json(posts)
    },

    async createPostForBlog(req: RequestWithParamsAndBody<IdModel,PostForBlogInputModel>, res: Response) {

        const blogId = req.params.id

        const isBlogExist: boolean = await blogQueryRepository.isBlogExist(blogId)

        if (!isBlogExist) return res.sendStatus(404)


        const result:PostViewModel = await postService.createPost({...req.body,blogId:blogId})

        return res.status(201).json(result)

    },



}
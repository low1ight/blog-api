import {Response} from 'express'
import {postQueryRepository} from "../../../repository/post/post-query-repository";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {PostViewModel} from "../../../types/models/post/post-view-model";
import {PostInputModel} from "../../../types/models/post/post-input-model";
import {postService} from "../../../domain/post-service";
import {blogQueryMapper} from "../../query-mappers/post-query-mapper";
import {PostInputQueryType} from "../../../types/queryType/post/post-input-query-type";
import {PostQueryType} from "../../../types/queryType/post/post-query-type";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";


export const postController = {



    async getPosts(req: RequestWithQuery<PostInputQueryType>, res: Response) {

        const query:PostQueryType = blogQueryMapper(req.query)

        const posts:ViewModelWithPaginator<PostViewModel[]> = await postQueryRepository.getPosts(query)

        return res.json(posts)


    },


    async getPostById(req: RequestWithParams<IdModel>, res: Response) {

        const post:null | PostViewModel = await postQueryRepository.getPostById(req.params.id)

        if(!post) return res.sendStatus(404)

        return res.json(post)

    },



    async createPost(req:RequestWithBody<PostInputModel>,res:Response) {

        const createdPost:PostViewModel = await postService.createPost(req.body)

        return res.status(201).json(createdPost)

    },

    async updatePost(req:RequestWithParamsAndBody<IdModel,PostInputModel>,res:Response) {

        const isPostUpdated:boolean = await postService.updatePost(req.body,req.params.id)

        if(!isPostUpdated) return res.sendStatus(404)

        return res.sendStatus(204)

    },


    async deletePost(req:RequestWithParams<IdModel>,res:Response) {

        const isPostDeleted:boolean = await postService.deletePost(req.params.id)

        if(!isPostDeleted) return res.sendStatus(404)

        return res.sendStatus(204)

    },


}
import {Request, Response} from 'express'
import {postQueryRepository} from "../../../repository/post/post-query-repository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {PostViewModel} from "../../../types/models/post/post-view-model";
import {PostInputModel} from "../../../types/models/post/post-input-model";
import {postService} from "../../../domain/post-service";


export const postController = {



    async getPosts(req: Request, res: Response) {

        const posts:PostViewModel[] = await postQueryRepository.getPosts()

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
import {Response} from 'express'
import {PostQueryRepository} from "../../../repository/post/post-query-repository";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {PostViewModel} from "../../../types/models/post/post-view-model";
import {PostInputModel} from "../../../types/models/post/post-input-model";
import {PostService} from "../../../domain/post-service";
import {blogQueryMapper} from "../../query-mappers/post-query-mapper";
import {PostInputQueryType} from "../../../types/queryType/post/post-input-query-type";
import {PostQueryType} from "../../../types/queryType/post/post-query-type";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {LikeStatusModel} from "../../../types/models/comment/like-status-input-model";
import {CustomResponse} from "../../../utils/errors/custromErrorObj/createCustomResponse";


export class PostController  {


    constructor(protected postService:PostService,
                protected postQueryRepository:PostQueryRepository) {}



    async getPosts(req: RequestWithQuery<PostInputQueryType>, res: Response) {

        const query:PostQueryType = blogQueryMapper(req.query)

        const posts:ViewModelWithPaginator<PostViewModel[]> = await this.postQueryRepository.getPosts(query)

        return res.json(posts)


    }

    async setLikeStatus(req: RequestWithParamsAndBody<IdModel,LikeStatusModel>, res: Response) {

        const result:CustomResponse<string> = await this.postService.setLikeStatus(
            req.body.likeStatus,
            req.params.id,
            req.authUserData!.userId)

        return res.sendStatus(result.statusCode)



    }


    async getPostById(req: RequestWithParams<IdModel>, res: Response) {

        const post:null | PostViewModel = await this.postQueryRepository.getPostById(req.params.id)

        if(!post) return res.sendStatus(404)

        return res.json(post)

    }



    async createPost(req:RequestWithBody<PostInputModel>,res:Response) {

        const createdPost:PostViewModel = await this.postService.createPost(req.body)

        return res.status(201).json(createdPost)

    }

    async updatePost(req:RequestWithParamsAndBody<IdModel,PostInputModel>,res:Response) {

        const isPostUpdated:boolean = await this.postService.updatePost(req.body,req.params.id)

        if(!isPostUpdated) return res.sendStatus(404)

        return res.sendStatus(204)

    }


    async deletePost(req:RequestWithParams<IdModel>,res:Response) {

        const isPostDeleted:boolean = await this.postService.deletePost(req.params.id)

        if(!isPostDeleted) return res.sendStatus(404)

        return res.sendStatus(204)

    }


}
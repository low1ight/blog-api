import {RequestWithParamsAndBody, RequestWithParamsAndQuery} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {Response} from "express"
import {CommentQueryRepository} from "../../../repository/comment/comment-query-repository";
import {commentQueryMapper} from "../../query-mappers/comment-query-mapper";
import {CommentInputQueryType} from "../../../types/queryType/comment/comment-input-query-type";
import {CommentInputModel} from "../../../types/models/comment/comment-input-model";
import {CommentViewModel} from "../../../types/models/comment/comment-view-model";
import {CommentService} from "../../../domain/comment-service";
import {PostQueryRepository} from "../../../repository/post/post-query-repository";

export class PostCommentsController  {


    constructor(protected commentService:CommentService,
                protected postQueryRepository:PostQueryRepository,
                protected commentQueryRepository:CommentQueryRepository) {}


    async getPostComments(req:RequestWithParamsAndQuery<IdModel,CommentInputQueryType>, res:Response) {

        const isPostExist = await this.postQueryRepository.isPostExist(req.params.id)

        if(!isPostExist) return res.sendStatus(404)


        const commentUserActivity = req.userActivity?.commentActivity || null


        const query = commentQueryMapper(req.query)

       const comments = await this.commentQueryRepository.getPostComments(query,req.params.id,commentUserActivity)

        return res.json(comments)


    }


    async createComment(req:RequestWithParamsAndBody<IdModel, CommentInputModel>,res:Response) {

        const comment:CommentViewModel | null = await this.commentService.createComment(req.body,req.params.id,req.authUserData!.userId)

        if(!comment) return res.sendStatus(404)

        return res.status(201).json(comment)

    }

}
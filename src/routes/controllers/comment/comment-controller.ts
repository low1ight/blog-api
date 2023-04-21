import {RequestWithParams, RequestWithParamsAndBody} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {CommentInputModel} from "../../../types/models/comment/comment-input-model";
import {Response} from "express"
import {CommentService} from "../../../domain/comment-service";
import {CommentQueryRepository} from "../../../repository/comment/comment-query-repository";
import {CommentViewModel} from "../../../types/models/comment/comment-view-model";
import {LikeStatusModel} from "../../../types/models/comment/like-status-input-model";
import {CustomResponse} from "../../../utils/errors/custromErrorObj/createCustomResponse";
import {UserRepository} from "../../../repository/user/user-repository";


export class CommentController  {

    constructor(protected commentService:CommentService,
                protected userRepository:UserRepository,
                protected commentQueryRepository:CommentQueryRepository) {}

    async updateComment(req:RequestWithParamsAndBody<IdModel, CommentInputModel>,res:Response) {

        const isUpdated:boolean = await this.commentService.updateComment(req.body,req.params.id)

        if(!isUpdated) res.sendStatus(500)

        res.sendStatus(204)


    }

    async setLikeStatus(req:RequestWithParamsAndBody<IdModel, LikeStatusModel>,res:Response) {

        const result:CustomResponse<string> = await this.commentService.setLikeStatus(req.body.likeStatus,req.params.id,req.authUserData!.userId)

        return res.sendStatus(result.statusCode)


    }

    async getCommentById(req:RequestWithParams<IdModel>,res:Response) {

         const commentUserActivity = req.userActivity?.commentActivity || null

        const comment:CommentViewModel | null = await this.commentQueryRepository.getCommentById(req.params.id,commentUserActivity)

        if(!comment) return res.sendStatus(404)

        return res.json(comment)

    }


    async deleteComment(req:RequestWithParams<IdModel>,res:Response) {

        const isDeleted:boolean = await this.commentService.deleteComment(req.params.id)

        if(!isDeleted) return res.sendStatus(404)

        return res.sendStatus(204)

    }



}
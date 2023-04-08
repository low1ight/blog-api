import {RequestWithParamsAndBody, RequestWithParamsAndQuery} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {Response} from "express"
import {commentQueryRepository} from "../../../repository/comment/comment-query-repository";
import {commentQueryMapper} from "../../query-mappers/comment-query-mapper";
import {CommentInputQueryType} from "../../../types/queryType/comment/comment-input-query-type";
import {CommentInputModel} from "../../../types/models/comment/comment-input-model";
import {CommentViewModel} from "../../../types/models/comment/comment-view-model";
import {commentService} from "../../../domain/comment-service";

export const postCommentsController = {

    async getPostComments(req:RequestWithParamsAndQuery<IdModel,CommentInputQueryType>, res:Response) {

        const query = commentQueryMapper(req.query)

       const comments = await commentQueryRepository.getPostComments(query,req.params.id)

        res.json(comments)


    },


    async createComment(req:RequestWithParamsAndBody<IdModel, CommentInputModel>,res:Response) {

        const comment:CommentViewModel | null = await commentService.createComment(req.body,req.params.id,req.authUserData!.userId)

        if(!comment) return res.sendStatus(404)

        return res.status(201).json(comment)

    }

}
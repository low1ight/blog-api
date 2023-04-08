import {RequestWithParams, RequestWithParamsAndBody} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {CommentInputModel} from "../../../types/models/comment/comment-input-model";
import {Response} from "express"
import {commentService} from "../../../domain/comment-service";
import {commentQueryRepository} from "../../../repository/comment/comment-query-repository";
import {CommentViewModel} from "../../../types/models/comment/comment-view-model";


export const commentController = {

    async updateComment(req:RequestWithParamsAndBody<IdModel, CommentInputModel>,res:Response) {

        const isUpdated:boolean = await commentService.updateComment(req.body,req.params.id)

        if(!isUpdated) res.sendStatus(500)

        res.sendStatus(204)


    },


    async getCommentById(req:RequestWithParams<IdModel>,res:Response) {

        const comment:CommentViewModel | null = await  commentQueryRepository.getCommentById(req.params.id)

        if(!comment) return res.sendStatus(404)

        return res.json(comment)

    },

    async deleteComment(req:RequestWithParams<IdModel>,res:Response) {

        const isDeleted:boolean = await commentService.deleteComment(req.params.id)

        if(!isDeleted) return res.sendStatus(404)

        return res.sendStatus(204)

    },









}
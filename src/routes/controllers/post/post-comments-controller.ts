import {RequestWithParamsAndQuery} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {Response} from "express"
import {commentQueryRepository} from "../../../repository/comment/comment-query-repository";
import {commentQueryMapper} from "../../query-mappers/comment-query-mapper";
import {CommentInputQueryType} from "../../../types/queryType/comment/comment-input-query-type";

export const postCommentsController = {

    async getPostComments(req:RequestWithParamsAndQuery<IdModel,CommentInputQueryType>, res:Response) {

        const query = commentQueryMapper(req.query)

       const comments = await commentQueryRepository.getPostComments(query,req.params.id)

        res.json(comments)


    }

}
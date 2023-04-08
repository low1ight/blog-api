import {getCommentsWithQuery} from "../_common-func/comment/getCommentsWithQuery";
import {CommentQueryType} from "../../types/queryType/comment/comment-query-type";
import {CommentViewModel} from "../../types/models/comment/comment-view-model";
import {Comment} from "../../db/models/comment";
import {commentsObjToViewModel} from "../_mappers/toCommentViewModel";


export const commentQueryRepository = {

    async getPostComments(query:CommentQueryType,postId:string) {

       return getCommentsWithQuery(query, {postId})
    },


    async getCommentById(id:string):Promise<CommentViewModel | null> {

        const comment = await Comment.findById(id)

        if(!comment) return null

        return commentsObjToViewModel(comment)

    }



}
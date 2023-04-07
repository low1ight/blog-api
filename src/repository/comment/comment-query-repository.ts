import {getCommentsWithQuery} from "../_common-func/comment/getCommentsWithQuery";
import {CommentQueryType} from "../../types/queryType/comment/comment-query-type";


export const commentQueryRepository = {

    async getPostComments(query:CommentQueryType,postId:string) {

       return getCommentsWithQuery(query, {postId})
    }



}
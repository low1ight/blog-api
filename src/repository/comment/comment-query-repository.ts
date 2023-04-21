import {getCommentsWithQuery} from "../_common-func/comment/getCommentsWithQuery";
import {CommentQueryType} from "../../types/queryType/comment/comment-query-type";
import {Comment} from "../../db/models/comment";
import {commentsObjToViewModel} from "../_mappers/toCommentViewModel";
import {ActivityElem} from "../../types/models/user/user-DB-type";



export class CommentQueryRepository  {

    async getPostComments(query:CommentQueryType,postId:string,userActivity:null | ActivityElem) {

       return getCommentsWithQuery(query,userActivity,{postId})

    }


    async getCommentById(id:string,commentUserActivity:ActivityElem | null):Promise<any> {

        //{likes: { $slice: [ 0,5 ] }}


        const comment = await Comment.findOne({_id:id})

        if(!comment) return null

        return commentsObjToViewModel(comment,commentUserActivity)


    }



}
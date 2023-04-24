import {getCommentsWithQuery} from "../_common-func/comment/getCommentsWithQuery";
import {CommentQueryType} from "../../types/queryType/comment/comment-query-type";
import {Comment} from "../../db/models/comment";
import {commentsObjToViewModel} from "../_mappers/toCommentViewModel";

import {LikeDBModel} from "../../types/models/like/Like-DB-model";
import {CommentPopulatedType} from "../../types/models/comment/comment-DB-type";



export class CommentQueryRepository  {

    async getPostComments(query:CommentQueryType,postId:string,userActivity:null | any) {



       return getCommentsWithQuery(query,userActivity,{postId})

    }


    async getCommentById(id:string,currentUserLikes:LikeDBModel[] | null):Promise<any> {

        //{likes: { $slice: [ 0,5 ] }}


        const comment:CommentPopulatedType | null = await Comment.findOne({_id:id}).populate('likes')

        if(!comment) return null

        return commentsObjToViewModel(comment,currentUserLikes)


    }



}
import {CommentInputModel} from "../../types/models/comment/comment-input-model";
import {Comment} from "../../db/models/comment";
import {Types} from "mongoose";
import {UserDBType} from "../../types/models/user/user-DB-type";
import {commentsObjToViewModel} from "../_mappers/toCommentViewModel";
import {CommentViewModel} from "../../types/models/comment/comment-view-model";


export const commentRepository = {



    async createComment({content}:CommentInputModel,postId:string,user:UserDBType):Promise<CommentViewModel> {


        const comment =  await Comment.create({
            content,
            postId:new Types.ObjectId(postId),
            commentatorInfo: {
                userId:user._id,
                userLogin: user.login
            }
        })


        return commentsObjToViewModel(comment)
    },


}
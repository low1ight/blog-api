import {CommentInputModel} from "../../types/models/comment/comment-input-model";
import {Comment} from "../../db/models/comment";
import {Types} from "mongoose";
import {UserDBType} from "../../types/models/user/user-DB-type";
import {commentsObjToViewModel} from "../_mappers/toCommentViewModel";
import {CommentViewModel} from "../../types/models/comment/comment-view-model";
import {CommentDBType} from "../../types/models/comment/comment-DB-type";


export class CommentRepository  {



    async createComment({content}:CommentInputModel,postId:string,user:UserDBType):Promise<CommentViewModel> {


        const comment =  await Comment.create({
            content,
            postId:new Types.ObjectId(postId),
            commentatorInfo: {
                userId:user._id,
                userLogin: user.userData.login
            }
        })


        return commentsObjToViewModel(comment,null)
    }




    async updateComment({content}:CommentInputModel,commentId:string):Promise<boolean> {

        const updatingResult = await Comment.updateOne(
            {_id:commentId},
            {content}
        )

        return updatingResult.matchedCount === 1

    }



    async isCommentExist(id:string):Promise<boolean> {

        const comment = await Comment.exists({_id:id})

        return comment !== null
    }



    async getCommentById(id:string):Promise<CommentDBType | null> {
        return Comment.findOne({_id:id})

    }


    async deleteComment(id:string):Promise<boolean> {

        const deletingResult = await Comment.deleteOne({_id:id})

        return deletingResult.deletedCount === 1

    }



    async isUserLikeStatusExist(userId:string,commentId:string):Promise<boolean> {
        const status = await Comment.findOne(
            {
                _id: commentId,
                $or: [
                    {"likes.userId": userId},
                    {"dislikes.userId": userId}
                ]
            })

        return !!status
    }

    async createLikeStatus(commentId:string,userId:string,likeStatus:string) {

        const likeObj = {userId:new Types.ObjectId(userId)}

        if(likeStatus === "Like") {

            return Comment.updateOne(
                { _id: commentId },
                { $push: { likes: likeObj } },
            );
        }

        return Comment.updateOne(
            { _id: commentId },
            { $push: { dislikes: likeObj } },
        );

    }



    async deleteLikeStatus(commentId:string,userId:string) {
        const deletingResult = await Comment.updateOne(
            {_id:commentId},
            {$pull: {
                likes:{userId},
                dislikes:{userId}
            }},


        )

        return deletingResult.matchedCount === 1
    }


}
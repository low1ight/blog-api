import {PostQueryRepository} from "../repository/post/post-query-repository";
import {CommentInputModel} from "../types/models/comment/comment-input-model";
import {UserRepository} from "../repository/user/user-repository";
import {CommentRepository} from "../repository/comment/comment-repository";
import {CommentViewModel} from "../types/models/comment/comment-view-model";
import {commentRepository, userRepository} from "../composition-root";
import {createCustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {LikeService} from "./like-service";
import {LikeDBModel} from "../types/models/like/Like-DB-model";


export class CommentService {



    constructor(protected commentRepository:CommentRepository,
                protected postQueryRepository:PostQueryRepository,
                protected userRepository:UserRepository,
                protected likeService:LikeService) {


    }

    async createComment(commentData:CommentInputModel,postId:string,userId:string,):Promise<CommentViewModel | null> {



        //check comment is creating for existing post

        const isPostExist = await this.postQueryRepository.isPostExist(postId)

        if(!isPostExist) return null




        //get user data

        const user = await this.userRepository.getUserById(userId)

        if(!user) return null

        return await this.commentRepository.createComment(commentData,postId,user)



    }


    async setLikeStatus(likeStatus:"Like" | "Dislike" | "None", commentId:string, userId:string) {

        const isCommentExist = await this.commentRepository.isCommentExist(commentId)
        if(!isCommentExist) return createCustomResponse(false, 404, 'not exist')


        //get like if like exist or null
        const like:LikeDBModel | null = await this.likeService.getUserLikeForTarget(userId,commentId,'comment')


        if(likeStatus === "None") {

           if (!like) return createCustomResponse(true, 204, 'like already has None status')

            const isUserLikeDeleted = await this.likeService.deleteLikeById(like._id)

            if (isUserLikeDeleted) return createCustomResponse(true, 204, 'successful')


        } else {

            if(like) {
                //if current like status the same with new like status, return
                if(like.likeStatus === likeStatus) return createCustomResponse(true, 204, 'successful')

                const result = await this.likeService.updateLikeStatus(like._id,likeStatus)

                if(result) return createCustomResponse(true, 204, 'successful')

            } else {

                const creatingLikeResult = await this.likeService.addLike('comment',commentId,likeStatus,userId)

                if(creatingLikeResult)  return createCustomResponse(true, 204, 'successful')

            }


        }

        return createCustomResponse(false, 400, 'db err')




    }


    async updateComment(dataForUpdating:CommentInputModel,commentId:string) {


        return await this.commentRepository.updateComment(dataForUpdating,commentId)

    }


    async deleteComment(commentId:string):Promise<boolean> {


        return await this.commentRepository.deleteComment(commentId)

    }


    async checkLikeIsLikeStatusForCommentAndUser(userId:string,commentId:string) {

        const isUserLikeStatusExist = await userRepository.isUserLikeStatusForCommentExist(userId,commentId)
        const isCommentLikeStatusExist = await commentRepository.isUserLikeStatusExist(userId,commentId)

        return isUserLikeStatusExist && isCommentLikeStatusExist


    }



}
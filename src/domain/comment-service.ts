import {PostQueryRepository} from "../repository/post/post-query-repository";
import {CommentInputModel} from "../types/models/comment/comment-input-model";
import {UserRepository} from "../repository/user/user-repository";
import {CommentRepository} from "../repository/comment/comment-repository";
import {CommentViewModel} from "../types/models/comment/comment-view-model";
import {commentRepository, userRepository} from "../composition-root";
import {createCustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";


export class CommentService {


    constructor(protected commentRepository:CommentRepository,
                protected postQueryRepository:PostQueryRepository,
                protected userRepository:UserRepository) {}

    async createComment(commentData:CommentInputModel,postId:string,userId:string,):Promise<CommentViewModel | null> {



        //check comment is creating for existing post

        const isPostExist = await this.postQueryRepository.isPostExist(postId)

        if(!isPostExist) return null




        //get user data

        const user = await this.userRepository.getUserById(userId)

        if(!user) return null

        return await this.commentRepository.createComment(commentData,postId,user)



    }


    async setLikeStatus(likeStatus:string,commentId:string,userId:string) {

        const isCommentExist = await this.commentRepository.isCommentExist(commentId)
        if(!isCommentExist) return createCustomResponse(false, 404, 'not exist')

        const isLikesExist = await this.checkLikeIsLikeStatusForCommentAndUser(userId,commentId)


        if(likeStatus === "None") {

            if (!isLikesExist) return createCustomResponse(true, 204, 'like already has None status')


            const isDeleteUserLike = await userRepository.deleteLikeStatus(commentId, userId)
            const isDeleteCommentLike = await commentRepository.deleteLikeStatus(commentId, userId)

            if (isDeleteUserLike && isDeleteCommentLike) return createCustomResponse(true, 204, 'successful')

            return createCustomResponse(false, 500, 'db err')

        } else {

            if(isLikesExist) {

                const isUpdateUserLike = await userRepository.deleteLikeStatus(commentId, userId)
                const isUpdateCommentLike = await commentRepository.deleteLikeStatus(commentId, userId)

                if(isUpdateUserLike && isUpdateCommentLike) return createCustomResponse(true, 204, 'successful')

            }



            const creatingCommentLikeStatusResult = await commentRepository.createLikeStatus(commentId,userId,likeStatus)
            const creatingUserLikeStatusResult = await userRepository.createLikeStatus(userId,commentId,likeStatus)

            if(creatingCommentLikeStatusResult && creatingUserLikeStatusResult) {
                return createCustomResponse(true, 204, 'successful')
            }
            return createCustomResponse(false, 500, 'db err')






        }





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
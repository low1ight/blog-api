import {postQueryRepository} from "../repository/post/post-query-repository";
import {CommentInputModel} from "../types/models/comment/comment-input-model";
import {userRepository} from "../repository/user/user-repository";
import {commentRepository} from "../repository/comment/comment-repository";
import {CommentViewModel} from "../types/models/comment/comment-view-model";


export const commentService = {

    async createComment(commentData:CommentInputModel,postId:string,userId:string,):Promise<CommentViewModel | null> {



        //check comment is creating for existing post

        const isPostExist = await postQueryRepository.isPostExist(postId)

        if(!isPostExist) return null




        //get user data

        const user = await userRepository.getUserById(userId)

        if(!user) return null

        return await commentRepository.createComment(commentData,postId,user)



    }



}
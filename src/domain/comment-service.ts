import {PostQueryRepository} from "../repository/post/post-query-repository";
import {CommentInputModel} from "../types/models/comment/comment-input-model";
import {UserRepository} from "../repository/user/user-repository";
import {CommentRepository} from "../repository/comment/comment-repository";
import {CommentViewModel} from "../types/models/comment/comment-view-model";


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


    async updateComment(dataForUpdating:CommentInputModel,commentId:string) {


        return await this.commentRepository.updateComment(dataForUpdating,commentId)

    }


    async deleteComment(commentId:string):Promise<boolean> {


        return await this.commentRepository.deleteComment(commentId)

    }



}
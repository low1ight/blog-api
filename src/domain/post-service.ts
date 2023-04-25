import {PostInputModel} from "../types/models/post/post-input-model";
import {BlogQueryRepository} from "../repository/blog/blog-query-repository";
import {PostRepository} from "../repository/post/post-repository";
import {PostQueryRepository} from "../repository/post/post-query-repository";
import {LikeService} from "./like-service";
import {createCustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {injectable} from "inversify";

@injectable()
export class PostService {

    constructor(protected blogQueryRepository: BlogQueryRepository,
                protected postRepository: PostRepository,
                protected postQueryRepository: PostQueryRepository,
                protected likeService: LikeService) {
    }

    async createPost(newPostData: PostInputModel) {

        const blog = await this.blogQueryRepository.getBlogById(newPostData.blogId)


        //blog must exist (we check it in validation middleware)
        return await this.postRepository.createPost(newPostData, blog!.name)

    }


    async updatePost(newPostData: PostInputModel, postId: string): Promise<boolean> {


        const isPostExist = this.postQueryRepository.isPostExist(postId)

        if (!isPostExist) return false

        const blog = await this.blogQueryRepository.getBlogById(newPostData.blogId)


        //blog must exist (we check it in validation middleware)
        return await this.postRepository.updatePost(newPostData, blog!.name, postId)

    }


    async deletePost(postId: string): Promise<boolean> {

        const isPostExist = this.postQueryRepository.isPostExist(postId)

        if (!isPostExist) return false

        return await this.postRepository.deletePost(postId)
    }


    async setLikeStatus(likeStatus:"Like" | "Dislike" | "None", postId:string, userId:string) {

        const isPostExist = await this.postQueryRepository.isPostExist(postId)

        if(!isPostExist) return createCustomResponse(false, 404, 'not exist')


        //get like if like exist or null

        return await this.likeService.setLikeStatus(likeStatus,postId,userId,'post')





    }


}
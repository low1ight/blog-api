import {PostInputModel} from "../types/models/post/post-input-model";
import {BlogQueryRepository} from "../repository/blog/blog-query-repository";
import {PostRepository} from "../repository/post/post-repository";
import {PostQueryRepository} from "../repository/post/post-query-repository";


export class PostService  {

    constructor(protected blogQueryRepository:BlogQueryRepository,
                protected postRepository:PostRepository,
                protected postQueryRepository:PostQueryRepository) {}

    async createPost(newPostData:PostInputModel) {

        const blog = await this.blogQueryRepository.getBlogById(newPostData.blogId)


        //blog must exist (we check it in validation middleware)
        return await this.postRepository.createPost(newPostData,blog!.name)

    }



    async updatePost(newPostData:PostInputModel,postId:string):Promise<boolean> {



        const isPostExist = this.postQueryRepository.isPostExist(postId)

        if(!isPostExist) return false

        const blog = await this.blogQueryRepository.getBlogById(newPostData.blogId)


        //blog must exist (we check it in validation middleware)
        return await this.postRepository.updatePost(newPostData,blog!.name,postId)

    }


    async deletePost(postId:string):Promise<boolean> {

        const isPostExist = this.postQueryRepository.isPostExist(postId)

        if(!isPostExist) return false

        return await this.postRepository.deletePost(postId)
    }




}
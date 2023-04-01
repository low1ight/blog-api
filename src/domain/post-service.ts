import {PostInputModel} from "../types/models/post/post-input-model";

import {blogQueryRepository} from "../repository/blog/blog-query-repository";
import {postRepository} from "../repository/post/post-repository";
import {postQueryRepository} from "../repository/post/post-query-repository";


export const postService = {

    async createPost(newPostData:PostInputModel) {

        const blog = await blogQueryRepository.getBlogById(newPostData.blogId)


        //blog must exist (we check it in validation middleware)
        return await postRepository.createPost(newPostData,blog!.name)

    },



    async updatePost(newPostData:PostInputModel,postId:string):Promise<boolean> {



        const isPostExist = postQueryRepository.isPostExist(postId)

        if(!isPostExist) return false

        const blog = await blogQueryRepository.getBlogById(newPostData.blogId)


        //blog must exist (we check it in validation middleware)
        return await postRepository.updatePost(newPostData,blog!.name,postId)

    },


    async deletePost(postId:string):Promise<boolean> {

        const isPostExist = postQueryRepository.isPostExist(postId)

        if(!isPostExist) return false

        return await postRepository.deletePost(postId)
    }




}
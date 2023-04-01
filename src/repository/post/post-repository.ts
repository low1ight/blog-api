import {PostInputModel} from "../../types/models/post/post-input-model";
import {Post} from "../../db/models/post";
import {postsObjToViewModel} from "../_mappers/toPostViewModel";
import {PostDBType} from "../../types/models/post/post-DB-type";
import {PostViewModel} from "../../types/models/post/post-view-model";


export const postRepository = {

    async createPost({title, shortDescription, content, blogId}: PostInputModel, blogName: string):Promise<PostViewModel> {


        const newPost:PostDBType = await Post.create(
            {
                title,
                shortDescription,
                content,
                blogId,
                blogName
            }
        )

        return postsObjToViewModel(newPost)


    },



    async updatePost({title, shortDescription, content, blogId}: PostInputModel, blogName: string,postId:string):Promise<boolean> {

        const updateResult = await Post.updateOne({_id:postId},{title,shortDescription,content,blogId,blogName})

        return updateResult.matchedCount > 0

    },


    async deletePost(postId:string):Promise<boolean> {

        const deleteResult = await Post.deleteOne({_id:postId})

        return deleteResult.deletedCount === 1

    }


}
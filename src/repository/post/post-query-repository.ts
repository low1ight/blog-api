import {Post} from "../../db/models/post";
import {postsArrToViewModel, postsObjToViewModel} from "../_mappers/toPostViewModel";
import {PostDBType} from "../../types/models/post/post-DB-type";
import {PostViewModel} from "../../types/models/post/post-view-model";


export const postQueryRepository = {


    async getPosts():Promise<PostViewModel[]> {

        const result:PostDBType[] = await Post.find().lean()

        return postsArrToViewModel(result)
    },


    async getPostById(id:string):Promise<PostViewModel | null> {

        const result:PostDBType | null = await Post.findOne({_id:id}).lean()

        if(!result) return null

        return postsObjToViewModel(result)
    },


    async isPostExist(id:string):Promise<boolean> {

        const result = await Post.exists({_id:id})

        return result !== null
    },

    async getBlogPosts(blogId:string) {

        const result:PostDBType[] = await Post.find({blogId}).lean()

        return postsArrToViewModel(result)
    }



}
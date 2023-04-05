import {Post} from "../../db/models/post";
import {postsArrToViewModel, postsObjToViewModel} from "../_mappers/toPostViewModel";
import {PostDBType} from "../../types/models/post/post-DB-type";
import {PostViewModel} from "../../types/models/post/post-view-model";
import {getPostsWithQuery} from "../_common-func/post/getPostsWithQuery";
import {ViewModelWithPaginator} from "../../types/models/ViewModelWithPaginator";
import {PostQueryType} from "../../types/queryType/post/post-query-type";


export const postQueryRepository = {


    async getPosts(query:PostQueryType):Promise<ViewModelWithPaginator<PostViewModel[]>> {

        return await getPostsWithQuery(query,{})


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
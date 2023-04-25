import {Post} from "../../db/models/post";
import {postsObjToViewModel} from "../_mappers/toPostViewModel";
import {PostPopulatedType} from "../../types/models/post/post-DB-type";
import {PostViewModel} from "../../types/models/post/post-view-model";
import {getPostsWithQuery} from "../_common-func/post/getPostsWithQuery";
import {ViewModelWithPaginator} from "../../types/models/ViewModelWithPaginator";
import {PostQueryType} from "../../types/queryType/post/post-query-type";
import {LikeDBModel} from "../../types/models/like/Like-DB-model";
import {injectable} from "inversify";

@injectable()
export class PostQueryRepository  {


    async getPosts(query:PostQueryType,userPostsLikes:LikeDBModel[] | null):Promise<ViewModelWithPaginator<PostViewModel[]>> {

        return await getPostsWithQuery(query,userPostsLikes)


    }


    async getPostById(id:string,userPostsLikes:LikeDBModel[] | null):Promise<PostViewModel | null> {

        const result:PostPopulatedType | null = await Post.findOne({_id:id}).populate('likes')

        if(!result) return null

        return postsObjToViewModel(result,userPostsLikes)
    }


    async isPostExist(id:string):Promise<boolean> {

        const result = await Post.exists({_id:id})

        return result !== null
    }

    async getBlogPosts(query:PostQueryType,userPostsLikes:LikeDBModel[] | null,blogId:string):Promise<ViewModelWithPaginator<PostViewModel[]>> {

         return await getPostsWithQuery(query,userPostsLikes,{blogId})

    }



}
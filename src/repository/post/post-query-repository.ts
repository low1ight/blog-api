import {Post} from "../../db/models/post";
import {postsArrToViewModel} from "../_mappers/toPostViewModel";
import {PostDBType} from "../../types/models/post/post-DB-type";
import {PostViewModel} from "../../types/models/post/post-view-model";


export const postQueryRepository = {

    async getPosts():Promise<PostViewModel[]> {

        const result:PostDBType[] = await Post.find().lean()

        return postsArrToViewModel(result)
    }


}
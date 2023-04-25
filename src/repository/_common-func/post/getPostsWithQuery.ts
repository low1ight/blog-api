import {toViwModelWithPaginator} from "../toViwModelWithPaginator";
import {calcSkipCount} from "../calcSkipCount";
import {createSortObject} from "../createSortObject";
import {PostQueryType} from "../../../types/queryType/post/post-query-type";
import {Post} from "../../../db/models/post";
import {postsArrToViewModel} from "../../_mappers/toPostViewModel";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {PostViewModel} from "../../../types/models/post/post-view-model";
import {LikeDBModel} from "../../../types/models/like/Like-DB-model";


export const getPostsWithQuery = async ({sortBy,sortDirection,pageNumber,pageSize}:PostQueryType,userPostsLikes:LikeDBModel[] | null,additionalParams:object = {}):Promise<ViewModelWithPaginator<PostViewModel[]>> => {


    const sortObj = createSortObject(sortBy,sortDirection)

    const skipCount = calcSkipCount(pageNumber,pageSize)


    const query = Post.find(additionalParams);

    query.skip(skipCount)

    query.limit(pageSize)

    query.sort(sortObj)

    query.populate('likes');



    const totalElemCount = await Post.countDocuments(additionalParams).exec();

    const result = await query.exec();



    return toViwModelWithPaginator(postsArrToViewModel,result,pageNumber,pageSize,totalElemCount,userPostsLikes)

}








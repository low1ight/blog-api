import {toViwModelWithPaginator} from "../toViwModelWithPaginator";
import {calcSkipCount} from "../calcSkipCount";
import {createSortObject} from "../createSortObject";
import {PostQueryType} from "../../../types/queryType/post/post-query-type";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {PostViewModel} from "../../../types/models/post/post-view-model";
import {Comment} from "../../../db/models/comment";
import {commentsArrToViewModel} from "../../_mappers/toCommentViewModel";


export const getCommentsWithQuery = async ({sortBy,sortDirection,pageNumber,pageSize}:PostQueryType,additionalParams:object = {}):Promise<ViewModelWithPaginator<PostViewModel[]>> => {


    const sortObj = createSortObject(sortBy,sortDirection)

    const skipCount = calcSkipCount(pageNumber,pageSize)

    const query = Comment.find(additionalParams);

    query.skip(skipCount)

    query.limit(pageSize)

    query.sort(sortObj)

    query.setOptions({ lean : true });




    const totalElemCount = await Comment.countDocuments(additionalParams).exec();

    const result = await query.exec();



    return toViwModelWithPaginator(commentsArrToViewModel,result,pageNumber,pageSize,totalElemCount)

}








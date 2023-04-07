import {CommentInputQueryType} from "../../types/queryType/comment/comment-input-query-type";
import {CommentQueryType} from "../../types/queryType/comment/comment-query-type";



export const commentQueryMapper = ({sortBy,sortDirection,pageNumber,pageSize}:CommentInputQueryType):CommentQueryType => {
    return {
        sortBy: sortBy || "createdAt",
        sortDirection: sortDirection || "desc",
        pageNumber:Number(pageNumber) || 1,
        pageSize: Number(pageSize) || 10

    }
}








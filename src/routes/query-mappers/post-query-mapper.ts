import {PostInputQueryType} from "../../types/queryType/post/post-input-query-type";
import {PostQueryType} from "../../types/queryType/post/post-query-type";



export const blogQueryMapper = ({sortBy,sortDirection,pageNumber,pageSize}:PostInputQueryType):PostQueryType => {
    return {
        sortBy: sortBy || "createdAt",
        sortDirection: sortDirection || "desc",
        pageNumber:Number(pageNumber) || 1,
        pageSize: Number(pageSize) || 10

    }
}








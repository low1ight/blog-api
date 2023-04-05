import {BlogInputQueryType} from "../../types/queryType/blog/blog-input-query-type";
import {BlogQueryType} from "../../types/queryType/blog/blog-query-type";



export const blogQueryMapper = ({searchNameTerm,sortBy,sortDirection,pageNumber,pageSize}:BlogInputQueryType):BlogQueryType => {
    return {
        searchNameTerm: searchNameTerm || null,
        sortBy: sortBy || "createdAt",
        sortDirection: sortDirection || "desc",
        pageNumber:Number(pageNumber) || 1,
        pageSize: Number(pageSize) || 10

    }
}








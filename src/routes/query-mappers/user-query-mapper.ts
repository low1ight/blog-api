import {UserInputQueryType} from "../../types/queryType/user/user-input-query-type";
import {UserQueryType} from "../../types/queryType/user/user-query-type";



export const userQueryMapper = ({searchLoginTerm,searchEmailTerm,sortBy,sortDirection,pageNumber,pageSize}:UserInputQueryType):UserQueryType => {
    return {
        searchLoginTerm: searchLoginTerm || null,
        searchEmailTerm:searchEmailTerm || null,
        sortBy: sortBy || "createdAt",
        sortDirection: sortDirection || "desc",
        pageNumber:Number(pageNumber) || 1,
        pageSize: Number(pageSize) || 10

    }
}








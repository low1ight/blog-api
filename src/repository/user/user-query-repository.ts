import {UserQueryType} from "../../types/queryType/user/user-query-type";
import {getUsersWithQuery} from "../_common-func/user/getUsersWithQuery";


export const userQueryRepository = {

    async getUser(query:UserQueryType) {

        return await getUsersWithQuery(query)

    }




}
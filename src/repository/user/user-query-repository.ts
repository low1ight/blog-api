import {UserQueryType} from "../../types/queryType/user/user-query-type";
import {getUsersWithQuery} from "../_common-func/user/getUsersWithQuery";
import {UserDBType} from "../../types/models/user/user-DB-type";
import {userToAuthMeModel} from "../_mappers/userToAuthMeModel";
import {User} from "../../db/models/user";


export class UserQueryRepository {

    async getUser(query:UserQueryType) {

        return await getUsersWithQuery(query)

    }


    async getUserDataForAuthMe(id:string) {

        const user:UserDBType | null = await User.findById(id)

        if(!user) return null

        return userToAuthMeModel(user)


    }




}
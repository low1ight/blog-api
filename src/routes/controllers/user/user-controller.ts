import {RequestWithQuery} from "../../../types/request-type";
import {UserInputQueryType} from "../../../types/queryType/user/user-input-query-type";
import {Response} from "express";
import {UserQueryType} from "../../../types/queryType/user/user-query-type";
import {blogQueryMapper} from "../../query-mappers/user-query-mapper";
import {userRepository} from "../../../repository/user/user-repository";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {UserViewModel} from "../../../types/models/user/user-view-model";

export const userController = {

    async getUsers(req:RequestWithQuery<UserInputQueryType>,res:Response) {

        const query:UserQueryType = blogQueryMapper(req.query)

        const result:ViewModelWithPaginator<UserViewModel[]> = await userRepository.getUser(query)

        res.json(result)


    }


}
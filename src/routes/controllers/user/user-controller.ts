import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../../../types/request-type";
import {UserInputQueryType} from "../../../types/queryType/user/user-input-query-type";
import {Response} from "express";
import {UserQueryType} from "../../../types/queryType/user/user-query-type";
import {blogQueryMapper} from "../../query-mappers/user-query-mapper";
import {userQueryRepository} from "../../../repository/user/user-query-repository";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {UserViewModel} from "../../../types/models/user/user-view-model";
import {UserInputModel} from "../../../types/models/user/user-input-model";
import {userService} from "../../../domain/user-service";
import {IdModel} from "../../../types/models/common/id-model";

export const userController = {

    async getUsers(req:RequestWithQuery<UserInputQueryType>,res:Response) {

        const query:UserQueryType = blogQueryMapper(req.query)

        const result:ViewModelWithPaginator<UserViewModel[]> = await userQueryRepository.getUser(query)

        res.json(result)


    },



    async createUser(req:RequestWithBody<UserInputModel>,res:Response) {

        const createdUser = await userService.createUser(req.body)

        return res.status(201).json(createdUser)

    },

    async deleteUser(req:RequestWithParams<IdModel>,res:Response) {

        const result = await userService.deleteUser(req.params.id)

        if(!result)  return res.sendStatus(404)

        return res.sendStatus(204)

    }


}
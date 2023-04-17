import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../../../types/request-type";
import {UserInputQueryType} from "../../../types/queryType/user/user-input-query-type";
import {Response} from "express";
import {UserQueryType} from "../../../types/queryType/user/user-query-type";
import {userQueryMapper} from "../../query-mappers/user-query-mapper";
import {UserQueryRepository} from "../../../repository/user/user-query-repository";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {UserViewModel} from "../../../types/models/user/user-view-model";
import {UserInputModel} from "../../../types/models/user/user-input-model";
import {UserService} from "../../../domain/user-service";
import {IdModel} from "../../../types/models/common/id-model";

export class UserController {

    constructor(protected userService:UserService, protected userQueryRepository:UserQueryRepository) {}

    async getUsers(req:RequestWithQuery<UserInputQueryType>,res:Response) {

        const query:UserQueryType = userQueryMapper(req.query)

        const result:ViewModelWithPaginator<UserViewModel[]> = await this.userQueryRepository.getUser(query)

        res.json(result)


    }



    async createUser(req:RequestWithBody<UserInputModel>,res:Response) {

        const createdUser = await this.userService.createUser(req.body)

        return res.status(201).json(createdUser)

    }

    async deleteUser(req:RequestWithParams<IdModel>,res:Response) {

        const result = await this.userService.deleteUser(req.params.id)

        if(!result)  return res.sendStatus(404)

        return res.sendStatus(204)

    }


}
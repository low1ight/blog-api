import {RequestWithBody} from "../../../types/request-type";
import {LoginInputModel} from "../../../types/models/auth/login-input-model";
import {Request,Response} from 'express'
import {authService} from "../../../domain/auth-service";
import {userQueryRepository} from "../../../repository/user/user-query-repository";

export const authController = {
    
    
    async login(req:RequestWithBody<LoginInputModel>,res:Response) {

        const loginResult:null | string = await authService.login(req.body)

        if(!loginResult) return res.sendStatus(401)

        return res.status(200).json({accessToken:loginResult})

    },


    async me(req:Request,res:Response) {

        const currentUserData = await userQueryRepository.getUserDataForAuthMe(req.authUserData!.userId)

        if(!currentUserData) res.sendStatus(404)

        res.json(currentUserData)
    }
    
    
}
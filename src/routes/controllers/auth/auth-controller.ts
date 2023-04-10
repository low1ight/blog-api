import {RequestWithBody} from "../../../types/request-type";
import {LoginInputModel} from "../../../types/models/auth/login-input-model";
import {Request,Response} from 'express'
import {authService} from "../../../domain/auth-service";
import {userQueryRepository} from "../../../repository/user/user-query-repository";
import {UserInputModel} from "../../../types/models/user/user-input-model";
import {EmailConfirmationInputModel} from "../../../types/models/auth/emailConfirmation-input-model";
import {CustomResponse} from "../../../utils/errors/custromErrorObj/createCustomResponse";


export const authController = {
    
    
    async login(req:RequestWithBody<LoginInputModel>,res:Response) {

        const loginResult:null | string = await authService.login(req.body)

        if(!loginResult) return res.sendStatus(401)

        return res.status(200).json({accessToken:loginResult})

    },


    async registration(req:RequestWithBody<UserInputModel>,res:Response) {

        const registrationResult = authService.registration(req.body)

        if(!registrationResult) return res.sendStatus(500)

        res.sendStatus(204)

    },
    

    async confirmEmail(req:RequestWithBody<EmailConfirmationInputModel>,res:Response) {

        const result:boolean | CustomResponse = await authService.confirmUserEmail(req.body)

        if(!result.successful) return res.status(400).json(result.content)

        return res.sendStatus(204)


    },


    async me(req:Request,res:Response) {

        const currentUserData = await userQueryRepository.getUserDataForAuthMe(req.authUserData!.userId)

        if(!currentUserData) res.sendStatus(404)

        res.json(currentUserData)
    }
    
    
}
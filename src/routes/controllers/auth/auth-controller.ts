import {RequestWithBody} from "../../../types/request-type";
import {LoginInputModel} from "../../../types/models/auth/login-input-model";
import {Response} from 'express'
import {authService} from "../../../domain/auth-service";

export const authController = {
    
    
    async login(req:RequestWithBody<LoginInputModel>,res:Response) {

        const loginResult:boolean = await authService.login(req.body)

        if(!loginResult) return res.sendStatus(401)

        return res.sendStatus(204)

    }
    
    
}
import {RequestWithBody} from "../../../types/request-type";
import {LoginInputModel} from "../../../types/models/auth/login-input-model";
import {Request,Response} from 'express'
import {AuthService} from "../../../domain/auth-service";
import {UserQueryRepository} from "../../../repository/user/user-query-repository";
import {UserInputModel} from "../../../types/models/user/user-input-model";
import {EmailConfirmationInputModel} from "../../../types/models/auth/emailConfirmation-input-model";
import {CustomResponse} from "../../../utils/errors/custromErrorObj/createCustomResponse";
import {SendCodeOnEmailInputModel} from "../../../types/models/auth/sendCodeOnEmailInputModel";
import {errorObj} from "../../../utils/errors/errorObj";
import {errorBody} from "../../../utils/errors/errorBody";
import {TokensType} from "../../../types/models/jwt/TokensType";
import {NewPasswordInputModel} from "../../../types/models/auth/new-password-input-model";
import {injectable} from "inversify";

@injectable()
export class AuthController {

    constructor(protected authService:AuthService,protected userQueryRepository:UserQueryRepository) {}
    
    async login(req:RequestWithBody<LoginInputModel>,res:Response) {

        const clientDevice:any = req.headers['user-agent']

        const clientIp:any = req.headers['x-forwarded-for'] || req.socket.remoteAddress


        const loginResult:null | TokensType = await this.authService.login(req.body,clientDevice,clientIp)

        if(!loginResult) return res.sendStatus(401)

        return res.status(200)
            .cookie('refreshToken',loginResult.refreshToken,{httpOnly:true,secure:true})
            .json({accessToken:loginResult.accessToken})

    }


    async logout(req:Request,res:Response) {

        const refreshToken = req.cookies.refreshToken

        if(!refreshToken) return res.sendStatus(401)

        const isLogOut:CustomResponse<string> = await this.authService.logout(refreshToken)

        if(!isLogOut.successful) return res.sendStatus(401)

        return res.sendStatus(204)

    }


    async setNewPassword(req:RequestWithBody<NewPasswordInputModel>,res:Response) {

        const result:CustomResponse<string> = await this.authService.setNewPassword(req.body)

        if(!result.successful) return res.status(result.statusCode).json(errorBody(errorObj(result.content,"recoveryCode")))

        return res.sendStatus(result.statusCode)

    }




    async refreshToken(req:Request,res:Response) {

        const refreshToken = req.cookies.refreshToken

        if(!refreshToken) return res.sendStatus(401)



        const result:CustomResponse<TokensType> = await this.authService.refreshRefreshToken(refreshToken)

        if(!result.successful) return res.sendStatus(401)

        return res.status(200)
            .cookie('refreshToken',result.content.refreshToken,{httpOnly:true,secure:true})
            .json({accessToken:result.content.accessToken})


    }


    async registration(req:RequestWithBody<UserInputModel>,res:Response) {

        const registrationResult = this.authService.registration(req.body)

        if(!registrationResult) return res.sendStatus(500)

        res.sendStatus(204)

    }

    async resendEmailCode(req:RequestWithBody<SendCodeOnEmailInputModel>, res:Response) {

        const result:CustomResponse<string> = await this.authService.resendConfirmationCode(req.body)

        if(!result.successful) {

            const err = errorObj(result.content as string,"email")

            return res.status(400).json(errorBody(err))
        }

        return res.sendStatus(204)

    }
    

    async confirmEmail(req:RequestWithBody<EmailConfirmationInputModel>,res:Response) {

        const result:boolean | CustomResponse<string> = await this.authService.confirmUserEmail(req.body)

        if(!result.successful) {

            const err = errorObj(result.content as string,"code")

            return res.status(400).json(errorBody(err))
        }

        return res.sendStatus(204)


    }


    async passwordRecovery(req:RequestWithBody<SendCodeOnEmailInputModel>,res:Response) {

        const result:CustomResponse<string> = await this.authService.sendPasswordRecoveryCode(req.body)

        if(!result.successful) return res.sendStatus(result.statusCode)

        res.sendStatus(204)

    }


    async me(req:Request,res:Response) {

        const currentUserData = await this.userQueryRepository.getUserDataForAuthMe(req.authUserData!.userId)

        if(!currentUserData) res.sendStatus(404)

        res.json(currentUserData)
    }
    
    
}
import {Router} from "express";
import {authController} from "./controllers/auth/auth-controller";
import {bearerAuth} from "../middlewares/bearer-auth";
import {userValidator} from "../middlewares/validators/user/user-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {registrationConfirmationValidator} from "../middlewares/validators/auth/registration-confirmation-validator";
import {sendCodeUsingEmailValidator} from "../middlewares/validators/auth/send-code-using-email-validator";
import {rateLimiter} from "../middlewares/requestLimiter";
import {newPasswordValidator} from "../middlewares/validators/auth/new-password-validator";


export const authRouter = Router()



authRouter.post('/login',rateLimiter,authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/password-recovery',rateLimiter,sendCodeUsingEmailValidator,errFormatter, authController.passwordRecovery)

authRouter.post('/new-password',rateLimiter,newPasswordValidator,errFormatter, authController.setNewPassword)

authRouter.post('/registration',rateLimiter,userValidator,errFormatter, authController.registration)

authRouter.post('/registration-confirmation',rateLimiter,registrationConfirmationValidator,errFormatter, authController.confirmEmail)

authRouter.post('/refresh-token', authController.refreshToken)

authRouter.post('/registration-email-resending',rateLimiter,sendCodeUsingEmailValidator,errFormatter, authController.resendEmailCode)

authRouter.get('/me', bearerAuth, authController.me)
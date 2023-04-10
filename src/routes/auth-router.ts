import {Router} from "express";
import {authController} from "./controllers/auth/auth-controller";
import {bearerAuth} from "../middlewares/bearer-auth";
import {userValidator} from "../middlewares/validators/user/user-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {registrationConfirmationValidator} from "../middlewares/validators/auth/registration-confirmation-validator";
import {registrationResendingCodeValidator} from "../middlewares/validators/auth/registration-resending-code-validator";


export const authRouter = Router()



authRouter.post('/login',authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/registration',userValidator,errFormatter, authController.registration)

authRouter.post('/registration-confirmation',registrationConfirmationValidator,errFormatter, authController.confirmEmail)

authRouter.post('/refresh-token', authController.refreshToken)

authRouter.post('/registration-email-resending',registrationResendingCodeValidator,errFormatter, authController.resendEmailCode)

authRouter.get('/me', bearerAuth, authController.me)
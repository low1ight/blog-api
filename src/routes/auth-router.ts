import {Router} from "express";
import {bearerAuth} from "../middlewares/bearer-auth";
import {userValidator} from "../middlewares/validators/user/user-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {registrationConfirmationValidator} from "../middlewares/validators/auth/registration-confirmation-validator";
import {sendCodeUsingEmailValidator} from "../middlewares/validators/auth/send-code-using-email-validator";
import {rateLimiter} from "../middlewares/requestLimiter";
import {newPasswordValidator} from "../middlewares/validators/auth/new-password-validator";
import {authController} from "../composition-root";


export const authRouter = Router()


authRouter.post('/login',rateLimiter,authController.login.bind(authController))

authRouter.post('/logout', authController.logout.bind(authController))

authRouter.post('/password-recovery',rateLimiter,sendCodeUsingEmailValidator,errFormatter, authController.passwordRecovery.bind(authController))

authRouter.post('/new-password',rateLimiter,newPasswordValidator,errFormatter, authController.setNewPassword.bind(authController))

authRouter.post('/registration',rateLimiter,userValidator,errFormatter, authController.registration.bind(authController))

authRouter.post('/registration-confirmation',rateLimiter,registrationConfirmationValidator,errFormatter, authController.confirmEmail.bind(authController))

authRouter.post('/refresh-token', authController.refreshToken.bind(authController))

authRouter.post('/registration-email-resending',rateLimiter,sendCodeUsingEmailValidator,errFormatter, authController.resendEmailCode.bind(authController))

authRouter.get('/me', bearerAuth, authController.me.bind(authController))
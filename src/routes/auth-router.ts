import {Router} from "express";
import {authController} from "./controllers/auth/auth-controller";
import {bearerAuth} from "../middlewares/bearer-auth";
import {userValidator} from "../middlewares/validators/user/user-validator";
import {errFormatter} from "../middlewares/validators/validationResult";


export const authRouter = Router()




authRouter.post('/login',authController.login)

authRouter.post('/registration',userValidator,errFormatter, authController.registration)

authRouter.post('/registration-confirmation', authController.confirmEmail)

authRouter.get('/me', bearerAuth, authController.me)
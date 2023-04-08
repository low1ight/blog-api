import {Router} from "express";
import {authController} from "./controllers/auth/auth-controller";
import {bearerAuth} from "../middlewares/bearer-auth";


export const authRouter = Router()




authRouter.post('/login',authController.login)
authRouter.get('/me', bearerAuth, authController.me)
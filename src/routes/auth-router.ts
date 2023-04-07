import {Router} from "express";
import {authController} from "./controllers/auth/auth-controller";


export const authRouter = Router()




authRouter.post('/login',authController.login)
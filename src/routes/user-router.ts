import {Router} from "express";
import {userController} from "./controllers/user/user-controller";
import {basicAuth} from "../middlewares/basic-auth";


export const userRouter = Router()



userRouter.get('/',basicAuth, userController.getUsers)
userRouter.post('/', basicAuth, userController.createUser)
userRouter.delete('/:id', basicAuth, userController.deleteUser)
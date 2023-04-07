import {Router} from "express";
import {userController} from "./controllers/user/user-controller";
import {basicAuth} from "../middlewares/basic-auth";
import {userValidator} from "../middlewares/validators/user/user-validator";
import {validateId} from "../middlewares/validators/params-id-validator";
import {errFormatter} from "../middlewares/validators/validationResult";


export const userRouter = Router()



userRouter.get('/',basicAuth, userController.getUsers)
userRouter.post('/', basicAuth,userValidator,errFormatter, userController.createUser)
userRouter.delete('/:id', basicAuth,validateId, userController.deleteUser)
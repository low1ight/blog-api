import {Router} from "express";

import {basicAuth} from "../middlewares/basic-auth";
import {userValidator} from "../middlewares/validators/user/user-validator";
import {validateId} from "../middlewares/validators/params-id-validator";
import {errFormatter} from "../middlewares/validators/validationResult";
import {userController} from "../composition-root";


export const userRouter = Router()



userRouter.get('/',basicAuth, userController.getUsers.bind(userController))
userRouter.post('/', basicAuth,userValidator,errFormatter, userController.createUser.bind(userController))
userRouter.delete('/:id', basicAuth,validateId, userController.deleteUser.bind(userController))
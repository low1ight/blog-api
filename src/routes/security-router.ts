import {Router} from "express";
import {deviceController} from "./controllers/security/device-controller";
import {validateId} from "../middlewares/validators/params-id-validator";


export const securityRouter = Router()




securityRouter.get('/devices', deviceController.getDevices)

securityRouter.delete('/devices', deviceController.deleteAllAnotherDevices)

securityRouter.delete('/devices/:id',validateId, deviceController.deleteDeviceById)
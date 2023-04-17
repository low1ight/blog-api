import {Router} from "express";
import {validateId} from "../middlewares/validators/params-id-validator";
import {deviceController} from "../composition-root";


export const securityRouter = Router()



securityRouter.get('/devices', deviceController.getDevices.bind(deviceController))

securityRouter.delete('/devices', deviceController.deleteAllAnotherDevices.bind(deviceController))

securityRouter.delete('/devices/:id',validateId, deviceController.deleteDeviceById.bind(deviceController))
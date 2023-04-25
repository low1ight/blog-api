import {Router} from "express";
import {validateId} from "../middlewares/validators/params-id-validator";
import {container} from "../composition-root";
import {DeviceController} from "./controllers/security/device-controller";


export const securityRouter = Router()

const deviceController = container.resolve(DeviceController)


securityRouter.get('/devices', deviceController.getDevices.bind(deviceController))

securityRouter.delete('/devices', deviceController.deleteAllAnotherDevices.bind(deviceController))

securityRouter.delete('/devices/:id',validateId, deviceController.deleteDeviceById.bind(deviceController))
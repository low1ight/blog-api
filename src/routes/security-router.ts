import {Router} from "express";
import {deviceController} from "./controllers/security/device-controller";
import {bearerAuth} from "../middlewares/bearer-auth";


export const securityRouter = Router()




securityRouter.get('/devices',bearerAuth, deviceController.getDevices)

securityRouter.delete('/devices',bearerAuth, deviceController.deleteAllAnotherDevices)

securityRouter.delete('/devices/:id',bearerAuth, deviceController.deleteDeviceById)
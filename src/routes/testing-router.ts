import {Router} from "express";
import {testingController} from "./controllers/testing/testing-controller";


export const testingRouter = Router()



testingRouter.delete('/all-data', testingController.deleteAllData)
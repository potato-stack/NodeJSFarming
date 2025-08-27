import { TelemetryController } from "../controllers/device/telemetryController.js";
import express from "express";

const deviceRouter = express.Router()
const controller = new TelemetryController();

deviceRouter.get('/', controller.getAllDevice).get('/:id', controller.getDeviceByID);
deviceRouter.post('/', controller.createDevice);
deviceRouter.put('/:id', controller.updateDevice);
deviceRouter.delete('/:id', controller.deleteDevice);

export {deviceRouter}
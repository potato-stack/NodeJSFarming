import { TelemetryController } from "../controllers/device/telemetryController.js";
import { createDeviceSchema, getDeviceSchema, validate } from "../middlewares/ValidateMiddleware.js";
import express from "express";

const deviceRouter = express.Router()
const controller = new TelemetryController();

deviceRouter
    .get('/', controller.getAllDevice)
    .get('/:id', validate(getDeviceSchema, "params"), controller.getDeviceByID);
deviceRouter.post('/', validate(createDeviceSchema, "body"), controller.createDevice);
deviceRouter.put('/:id', validate(getDeviceSchema, "params"), validate(createDeviceSchema, "body"), controller.updateDevice);
deviceRouter.delete('/:id', validate(getDeviceSchema, "params"), controller.deleteDevice);

export { deviceRouter }
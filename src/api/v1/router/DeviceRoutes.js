import { TelemetryController } from '../controllers/DeviceController.js';
import { getDeviceSchema, createDeviceSchema } from '../schemas/DeviceSchemas.js';
import { getGardenSchema } from '../schemas/GardenSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';

const deviceRouter = express.Router({ mergeParams: true });
const controller = new TelemetryController();

deviceRouter
  .get('/', controller.getAllDevice)
  .get('/:device_id', validate(getDeviceSchema, 'params'), controller.getDeviceByID);
deviceRouter.post(
  '/',
  validate(createDeviceSchema, 'body'),
  validate(getGardenSchema, 'params'),
  controller.createDevice,
);
deviceRouter.put(
  '/:device_id',
  validate(createDeviceSchema, 'body'),
  validate(getGardenSchema, 'params'),
  controller.updateDevice,
);
deviceRouter.delete('/:device_id', validate(getDeviceSchema, 'params'), controller.deleteDevice);

export { deviceRouter };

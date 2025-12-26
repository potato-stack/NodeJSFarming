import { getDeviceSchema, createDeviceSchema } from '../schemas/DeviceSchemas.js';
import { getGardenSchema } from '../schemas/GardenSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';
import { controllerManage } from '../../../dependencies/bindingcontroller.js';
import { TYPES } from '../../../dependencies/types.js';

const deviceRouter = express.Router({ mergeParams: true });
const controller = controllerManage.get(TYPES.TelemetryController);

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

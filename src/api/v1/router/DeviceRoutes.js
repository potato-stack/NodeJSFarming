import { getDeviceSchema, createDeviceSchema } from '../schemas/DeviceSchemas.js';
import { getGardenSchema } from '../schemas/GardenSchemas.js';
import { validate } from '../../../middlewares/ValidateMiddleware.js';
import express from 'express';

export const createDeviceRouter = (telemetryController) => {
  const deviceRouter = express.Router({ mergeParams: true });
  deviceRouter
    .get('/', telemetryController.getAllDevice)
    .get('/:device_id', validate(getDeviceSchema, 'params'), telemetryController.getDeviceByID);
  deviceRouter.post(
    '/',
    validate(createDeviceSchema, 'body'),
    validate(getGardenSchema, 'params'),
    telemetryController.createDevice,
  );
  deviceRouter.put(
    '/:device_id',
    validate(createDeviceSchema, 'body'),
    validate(getGardenSchema, 'params'),
    telemetryController.updateDevice,
  );
  deviceRouter.delete('/:device_id', validate(getDeviceSchema, 'params'), telemetryController.deleteDevice);

  return deviceRouter;
};

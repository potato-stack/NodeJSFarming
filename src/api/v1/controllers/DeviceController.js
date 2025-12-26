import StatusCodes from 'http-status-codes';
import { CreateDeviceDto, updateDeviceDto } from '../../../dtos/Device.dto.js';
import { serviceManage } from '../../../dependencies/bindingService.js';
import { TYPES } from '../../../dependencies/types.js';

const telemetryService = serviceManage.get(TYPES.TelemetryServices);

export class TelemetryController {
  createDevice = async (req, res, next) => {
    try {
      // Mappers
      const device = new CreateDeviceDto({ ...req.body, ...req.params });
      const createdDevice = await telemetryService.createDevice(device);

      res.status(StatusCodes.CREATED).json(createdDevice);
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  };

  getDeviceByID = async (req, res, next) => {
    try {
      const id = req.params.device_id;
      const device = await telemetryService.getDeviceByID(id);
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      next(error);
    }
  };

  getAllDevice = async (req, res, next) => {
    try {
      const devices = await telemetryService.getAllDevices();
      res.status(StatusCodes.OK).json(devices);
    } catch (error) {
      next(error);
    }
  };

  updateDevice = async (req, res, next) => {
    try {
      const updateTarget = new updateDeviceDto({ ...req.body, ...req.params });
      const response = await telemetryService.updateDevice(updateTarget);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  deleteDevice = async (req, res, next) => {
    try {
      const id = req.params.device_id;
      const device = await telemetryService.deleteDevice(id);
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      next(error);
    }
  };
}

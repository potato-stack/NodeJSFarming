import StatusCodes from 'http-status-codes';
import { TelemetryServices } from '../services/TelemetryService.js';
import { TelemetryDevicesDto } from '../Dtos/Device.Dto.js';

export class TelemetryController {
  static telemetryServices = null;

  static getService() {
    if (!TelemetryController.telemetryServices) {
      TelemetryController.telemetryServices = new TelemetryServices();
    }
    return TelemetryController.telemetryServices;
  }

  createDevice = async (req, res, next) => {
    try {
      const device = new TelemetryDevicesDto(req.body);
      const createdDevice = await TelemetryController.getService().createDevice(device);

      res.status(StatusCodes.CREATED).json(createdDevice);
    } catch (error) {
      // Bubble up the error
      next(error);
    }
  }

  getDeviceByID = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const device = await TelemetryController.getService().getDeviceByID(id);
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      next(error);
    }
  }

  getAllDevice = async (req, res, next) => {
    try {
      const devices = await TelemetryController.getService().getAllDevices();
      res.status(StatusCodes.OK).json(devices);
    } catch (error) {
      next(error);
    }
  }

  updateDevice = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const newDevice = new TelemetryDevicesDto(req.body);
      const response = await TelemetryController.getService().updateDevice(newDevice, {
        where: { id: id },
      });
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  deleteDevice = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const device = await TelemetryController.getService().deleteDevice(id);
      res.status(StatusCodes.OK).json(device);
    } catch (error) {
      next(error);
    }
  }
}

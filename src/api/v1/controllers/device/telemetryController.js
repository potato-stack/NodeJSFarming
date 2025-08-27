import StatusCodes from "http-status-codes";
import { TelemetryServices } from "../../services/device/TelemetryService.js";
import { TelemetryDevicesDTO } from "../../dtos/device/telemetryDevice.dto.js";
import { DeviceError } from "../../errors/DeviceError.js";

export class TelemetryController {
    static telemetryServices = null;

    static getService() {
        if (!TelemetryController.telemetryServices) {
            TelemetryController.telemetryServices = new TelemetryServices();
        }
        return TelemetryController.telemetryServices;
    }

    async createDevice(req, res, next) {
        try {
            const device = new TelemetryDevicesDTO(req.body);
            const createdDevice = await TelemetryController.getService().createDevice(device);

            res.status(StatusCodes.CREATED).json(createdDevice)
        }
        catch (error) {
            // Bubble up the error 
            next(error)
        }

    }

    async getDeviceByID(req, res, next) {
        try {
            const id = Number(req.params.id);
            const device = await TelemetryController.getService().getDeviceByID(id);
            res.status(StatusCodes.OK).json(device)
        }
        catch (error) {
            next(error)
        }
    }

    async getAllDevice(req, res, next) {
        try {
            const devices = await TelemetryController.getService().getAllDevices();
            res.status(StatusCodes.OK).json(devices)
        }
        catch (error) {
            next(error)
        }
    }

    async updateDevice(req, res, next) {
        try {
            const id = Number(req.params.id);
            const newDevice = new TelemetryDevicesDTO(req.body);
            const response = await TelemetryController.getService().updateDevice(newDevice, { where: { id: id } });
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error)
        }
    }

    async deleteDevice(req, res, next) {
        try {
            const id = Number(req.params.id);
            const device = await TelemetryController.getService().deleteDevice(id);
            res.status(StatusCodes.OK).json(device)
        } catch (error) {
            next(error)
        }
    }
}
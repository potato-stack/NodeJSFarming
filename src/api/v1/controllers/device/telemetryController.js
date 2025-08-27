import StatusCodes from "http-status-codes";
import { TelemetryServices } from "../../services/device/TelemetryService.js";
import { TelemetryDevicesDTO } from "../../dtos/device/telemetryDevice.dto.js";

export class TelemetryController {
    static telemetryServices = null;

    static getService() {
        if (!TelemetryController.telemetryServices) {
            TelemetryController.telemetryServices = new TelemetryServices();
        }
        return TelemetryController.telemetryServices;
    }

    async createDevice(req, res) {
        const device = new TelemetryDevicesDTO(req.body);
        const createdDevice = await TelemetryController.getService().createDevice(device);

        res.status(StatusCodes.CREATED).json(createdDevice)
    }

    async getDeviceByID(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid ID: ID must be a number' })
        }
        const device = await TelemetryController.getService().getDeviceByID(id);
        res.status(StatusCodes.OK).json(device)
    }

    async getAllDevice(req, res) {
        console.log('here')
        const devices = await TelemetryController.getService().getAllDevices();
        if(!devices) devices = {message: "No device in the database!"}
        res.status(StatusCodes.OK).json(devices)
    }

    async updateDevice(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid ID: ID must be a number' })
        }
        const newDevice = new TelemetryDevicesDTO(req.body);
        try {
            const response = await TelemetryController.getService().updateDevice(newDevice, {where: {id: id}});
            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            console.log(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    async deleteDevice(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid ID: ID must be a number' })
        }
        const device = await TelemetryController.getService().deleteDevice(id);
        res.status(StatusCodes.OK).json(device)
    }
}
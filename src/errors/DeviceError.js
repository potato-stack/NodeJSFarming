import { ServerError } from "./ServerError.js";
import { StatusCodes } from "http-status-codes";

export class DeviceError extends ServerError {
    constructor(message, statusCode) {
        super("Device Error: " + message, statusCode);
    }

    static NotFound(message = "Device Is Not Found") {
        return new DeviceError(message, StatusCodes.NOT_FOUND);
    }

    static Conflict(message = "Device Already Exist") {
        return new DeviceError(message, StatusCodes.CONFLICT);
    }

    static Validation(message = "Device Validation Failed") {
        return new DeviceError(message, StatusCodes.UNPROCESSABLE_ENTITY);
    }

}
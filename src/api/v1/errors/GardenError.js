import { ServerError } from "./ServerError";
import { StatusCodes } from "http-status-codes";

export class GardenError extends ServerError {
    constructor(message, statusCode) {
        super("Garden Error: " + message, statusCode);
    }

    static BadRequest(message = "Bad Request") {
        return new DeviceError(message, StatusCodes.BAD_REQUEST);
    }

    static NotFound(message = "Garden Is Not Found") {
        return new DeviceError(message, StatusCodes.NOT_FOUND);
    }

    static Conflict(message = "Duplicated Garden") {
        return new DeviceError(message, StatusCodes.CONFLICT);
    }

    static Validation(message = "Garden Validation Failed") {
        return new DeviceError(message, StatusCodes.UNPROCESSABLE_ENTITY);
    }
}
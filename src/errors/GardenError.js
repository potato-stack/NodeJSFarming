import { GardenError } from "./ServerError.js";
import { StatusCodes } from "http-status-codes";

export class GardenError extends ServerError {
    constructor(message, statusCode) {
        super("Garden Error: " + message, statusCode);
    }

    static NotFound(message = "Garden Is Not Found") {
        return new GardenError(message, StatusCodes.NOT_FOUND);
    }

    static Conflict(message = "Duplicated Garden") {
        return new GardenError(message, StatusCodes.CONFLICT);
    }

    static Validation(message = "Garden Validation Failed") {
        return new GardenError(message, StatusCodes.UNPROCESSABLE_ENTITY);
    }
}
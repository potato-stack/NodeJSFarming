import { ServerError } from "./ServerError.js";
import { StatusCodes } from "http-status-codes";

export class UserError extends ServerError {
	constructor(message, statusCode) {
		super(message, statusCode);
	}

	static BadRequest(message = "Bad User Request") {
		return new UserError(message, StatusCodes.BAD_REQUEST);
	}

	static Unauthorized(messge = "Inavlid token") {
		return new UserError(messge, StatusCodes.UNAUTHORIZED)
	}

	static ForbiddenError(message = "User is not permitted") {
		return new UserError(message, StatusCodes.FORBIDDEN)
	}

	static NotFound(message = "User Is Not Found") {
		return new UserError(message, StatusCodes.NOT_FOUND);
	}

	static Conflict(message = "User Already Exist") {
		return new UserError(message, StatusCodes.CONFLICT);
	}

	static Validation(message = "User Validation Failed") {
		return new UserError(message, StatusCodes.UNPROCESSABLE_ENTITY);
	}

}
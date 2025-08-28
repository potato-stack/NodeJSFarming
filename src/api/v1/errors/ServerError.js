
import { StatusCodes } from "http-status-codes";

export class ServerError extends Error {
    constructor(msg, status) {
        super(msg || 'Server internal error!');
        this.statusCode = status || StatusCodes.INTERNAL_SERVER_ERROR;
    }

    static MiddleWare(msg = "Middleware Error") {
        return new ServerError(msg)
    }

    static DatabaseError(msg = "Database Error") {
        return new ServerError(msg)
    }
}

export const HandleDBError = (error) => {
  // Fall back for database connection error or undefined error
  if (error.name === 'SequelizeDatabaseError') throw ServerError.DatabaseError(error);
  // Forward the error
  throw error;
};
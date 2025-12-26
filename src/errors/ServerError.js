import { StatusCodes } from 'http-status-codes';

export class ServerError extends Error {
  constructor(msg, status) {
    super(msg || 'Server internal error!');
    this.statusCode = status || StatusCodes.INTERNAL_SERVER_ERROR;
  }

  static DomainError(msg = 'Validate Error') {
    return new ServerError(msg);
  }

  static InfraError(msg = 'Infrastructure Error') {
    return new ServerError(msg);
  }

  static BadRequest(message = 'Bad Request') {
    return new ServerError(message, StatusCodes.BAD_REQUEST);
  }
}
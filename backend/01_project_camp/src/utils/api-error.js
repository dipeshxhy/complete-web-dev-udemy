import { HttpStatusCodes } from "./constants.js";

export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request") {
    return new ApiError(HttpStatusCodes.BAD_REQUEST, message);
  }
  static unAuthorized(message = "Unauthorized") {
    return new ApiError(HttpStatusCodes.UNAUTHORIZED, message);
  }
  static conflict(message = "conflict") {
    return new ApiError(HttpStatusCodes.CONFLICT, message);
  }
  static forbidden(message = "Forbidden") {
    return new ApiError(HttpStatusCodes.FORBIDDEN, message);
  }
  static internal(message = "Internal server error") {
    return new ApiError(HttpStatusCodes.INTERNAL_SERVER_ERROR, message);
  }
  static notFound(message = "Resource not found") {
    return new ApiError(HttpStatusCodes.NOT_FOUND, message);
  }
}

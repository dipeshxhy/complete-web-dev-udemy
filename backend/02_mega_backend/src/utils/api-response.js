import { HttpStatusCodes } from "./constants.js";

export class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 400;
  }
  static success(res, data = null, message = "success") {
    return res
      .status(HttpStatusCodes.OK)
      .json(new ApiResponse(HttpStatusCodes.OK, data, message));
  }
  static created(res, data = null, message = "created") {
    return res
      .status(HttpStatusCodes.CREATED)
      .json(new ApiResponse(HttpStatusCodes.CREATED, data, message));
  }
  static noContent(res, message = "no content") {
    return res
      .status(HttpStatusCodes.NO_CONTENT)
      .json(new ApiResponse(HttpStatusCodes.NO_CONTENT, null, message));
  }
  static healthcheck(res, message = "Server is healthy") {
    return res
      .status(HttpStatusCodes.OK)
      .json(new ApiResponse(HttpStatusCodes.OK, null, message));
  }
}

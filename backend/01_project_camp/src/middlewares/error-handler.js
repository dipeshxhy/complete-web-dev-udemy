import { ApiResponse } from "../utils/api-response.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, null, err.message));
  } else {
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
  next();
};

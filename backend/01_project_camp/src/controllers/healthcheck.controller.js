import { ApiResponse } from "../utils/api-response.js";

const healthCheck = (req, res) => {
  return ApiResponse.success(res, null, "Server is running");
};

export { healthCheck };

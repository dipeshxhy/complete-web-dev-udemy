import { ApiResponse } from "../utils/api-response.js";

const healthcheck = async (req, res) => {
  return ApiResponse.healthcheck(res, "Health check passed");
};

export default { healthcheck };

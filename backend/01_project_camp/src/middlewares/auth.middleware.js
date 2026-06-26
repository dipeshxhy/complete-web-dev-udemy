import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error";

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw ApiError.unauthorized("No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    const user = await User.findById(decoded._id).select('-password -refreshToken -forgotPasswordToken -forgotPasswordTokenExpiry -emailVerificationToken -emailVerificationTokenExpiry');
    if(!user) {
      throw ApiError.unauthorized("Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw ApiError.unauthorized("Invalid token");
  }
}

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden("You do not have permission to perform this action");
    }
    next();
  };
}
export { authenticate, authorize };

import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { emailVerificationTemplate } from "../utils/mail.js";

const generateAccessAndRefreshTokens = (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
};
const register = async (req, res) => {
  const { username, fullName, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw ApiError.conflict("User with username or email already exists");
  }
  const user = await User.create({ username, fullName, email, password });
  const { raw, hashedToken, expiry } = user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = new Date(expiry);
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);

  await user.save({ validateBeforeSave: false });
  const userData = {
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
  };

  const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${raw}`;
  await emailVerificationTemplate(user.username, user.email, verificationUrl);
  await ApiResponse.success(
    res,
    { user: userData },
    "User registered successfully. Please check your email to verify your account.",
  );
};

export { register };

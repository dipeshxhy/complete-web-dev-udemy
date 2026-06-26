import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { emailVerificationTemplate } from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

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
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user);

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
// login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }
  if (!user.isEmailVerified) {
    throw ApiError.unauthorized(
      "Email not verified. Please verify your email before logging in.",
    );
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user);
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  const userData = {
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    }) // 1 day
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }) // 7 days
    .json({
      success: true,
      message: "User logged in successfully",
      data: { user: userData, accessToken, refreshToken },
    });
};
export { login, register };

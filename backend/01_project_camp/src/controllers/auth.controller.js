import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  emailVerificationTemplate,
  forgotPasswordTemplate,
} from "../utils/mail.js";

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
  await ApiResponse.created(
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
    throw ApiError.unAuthorized(
      "Email not verified. Please verify your email before logging in.",
    );
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw ApiError.unAuthorized("Invalid email or password");
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

// logout
const logout = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  user.refreshToken = undefined;
  await user.save({ validateBeforeSave: false });
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  ApiResponse.success(res, null, "User logged out successfully");
};

// get current user
const getCurrentUser = async (req, res) => {
  ApiResponse.success(
    res,
    { user: req.user },
    "Current user retrieved successfully",
  );
};

// verify email
const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    throw ApiError.badRequest("Email verification token is required");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw ApiError.badRequest("Invalid or expired email verification token");
  }
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiry = undefined;
  await user.save({ validateBeforeSave: false });
  ApiResponse.success(
    res,
    { isEmailVerified: true },
    "Email verified successfully",
  );
};
// resend email verification token
const resendEmailVerificationToken = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw ApiError.badRequest("Email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  if (user.isEmailVerified) {
    throw ApiError.badRequest("Email is already verified");
  }
  const { raw, hashedToken, expiry } = user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = new Date(expiry);
  const verificationUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${raw}`;
  await emailVerificationTemplate(user.username, user.email, verificationUrl);
  await user.save({ validateBeforeSave: false });
  ApiResponse.success(
    res,
    { isEmailVerified: false },
    "Email verification token sent successfully, please check your email",
  );
};

// refresh access token
const refreshAccessToken = async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1];
  if (!refreshToken) {
    throw ApiError.unAuthorized("No refresh token provided");
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw ApiError.unAuthorized("Invalid or expired refresh token");
    }
    if (!user.isEmailVerified) {
      throw ApiError.unAuthorized(
        "Email not verified. Please verify your email before refreshing access token.",
      );
    }
    if (user.refreshToken !== refreshToken) {
      throw ApiError.unAuthorized("Invalid refresh token");
    }
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    ApiResponse.success(
      res,
      { accessToken, refreshToken: newRefreshToken },
      "Access token refreshed successfully",
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.unAuthorized("Invalid  refresh token");
  }
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  const { raw, hashedToken, expiry } = user.generateTemporaryToken();
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordTokenExpiry = new Date(expiry);
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${raw}`;
  await forgotPasswordTemplate(user.username, user.email, resetUrl);
  ApiResponse.success(res, {}, "Password reset email sent successfully");
};

// reset forgot password
const resetForgotPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  if (!token) {
    throw ApiError.badRequest("Password reset token is required");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw ApiError.badRequest("Invalid or expired password reset token");
  }
  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;
  await user.save();
  ApiResponse.success(
    res,
    {},
    "Password reset successfully. You can now log in with your new password.",
  );
};

// change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  const isPasswordValid = await user.comparePassword(currentPassword);
  if (!isPasswordValid) {
    throw ApiError.badRequest("Current password is incorrect");
  }
  user.password = newPassword;
  await user.save();
  ApiResponse.success(res, {}, "Password changed successfully");
};
export {
  changePassword,
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  register,
  resendEmailVerificationToken,
  resetForgotPassword,
  verifyEmail,
};

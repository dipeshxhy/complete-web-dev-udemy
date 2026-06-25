import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/200x200/png?text=Avatar",
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [
        UserRolesEnum.ADMIN,
        UserRolesEnum.MEMBER,
        UserRolesEnum.PROJECT_ADMIN,
      ],
      default: UserRolesEnum.MEMBER,
    },
    refreshToken: { type: String, default: null },
    forgotPasswordToken: { type: String, default: null },
    forgotPasswordTokenExpiry: { type: Date, default: null },
    emailVerificationToken: { type: String, default: null },
    emailVerificationTokenExpiry: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);
userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

userSchema.methods.generateTemporaryToken = function () {
  const raw = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(raw).digest("hex");

  const expiry = Date.now() + 20 * 60 * 1000; // 20 minutes from now
  return { raw, hashedToken, expiry };
};
const User = mongoose.model("User", userSchema);
export default User;

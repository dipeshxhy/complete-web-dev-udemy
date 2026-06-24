import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

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
const User = mongoose.model("User", userSchema);
export default User;

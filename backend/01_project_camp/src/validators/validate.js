import z from "zod";

export const registerUserInputSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .trim()
    .toLowerCase(),
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserInputSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const resendEmailVerificationTokenInputSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
});

export const forgotPasswordInputSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
});

export const resetForgotPasswordInputSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

export const changePasswordInputSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters long"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

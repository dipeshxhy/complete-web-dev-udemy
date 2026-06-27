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

export const createProjectInputSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters long"),
  description: z
    .string()
    .optional()
    .min(10, "Project description must be at least 10 characters long"),
});

export const updateProjectInputSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters long"),
  description: z
    .string()
    .optional()
    .min(10, "Project description must be at least 10 characters long"),
});

export const addMemberToProjectInputSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: z.enum(
    ["admin", "project_admin", "member"],
    "Role must be either 'admin', 'project_admin', or 'member'",
  ),
});

export const updateMemberRoleInProjectInputSchema = z.object({
  role: z.enum(
    ["admin", "project_admin", "member"],
    "Role must be either 'admin', 'project_admin', or 'member'",
  ),
});

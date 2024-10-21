// lib\Interface\auth\reset-password\schema.ts

import { z } from "zod";

// Email schema for email validation
export const emailOnlySchema = z.object({
  email: z
    .string()
    .nonempty({ message: "This field is mandatory" })
    .max(80, { message: "Email must not exceed 80 characters." })
    .refine((val) => /@(gmail|yahoo|hotmail|outlook)\.com$/.test(val), {
      message: "Email must end with a valid domain: @gmail, @yahoo, @hotmail, or @outlook",
    }),
});

// Schema for the reset key validation
export const OnlyResetKeySchema = z.string().nonempty({ message: "Reset key is required" });

// New password schema for new password and confirmation validation
export const baseNewPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(48, { message: "Password must not exceed 48 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*()_+~]/, { message: "Password must contain at least one special character." })
    .regex(/^\S*$/, { message: "Password must not contain any spaces." }),

  confirmPassword: z
    .string()
    .min(1, { message: "Password confirmation is required." }),
});

// Refinement to ensure that newPassword and confirmPassword match
export const newPasswordSchema = baseNewPasswordSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }
);

// Exporting the new password schema type
export type newPasswordSchema = z.infer<typeof newPasswordSchema>;

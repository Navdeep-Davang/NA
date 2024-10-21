// lib\Interface\auth\signup\schema.ts

import { z } from "zod";

// Define base schema without refine for individual field validation
export const baseSignUpSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username field cannot be empty." })
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(15, { message: "Username must be at most 15 characters long." })
    .regex(/^[a-zA-Z0-9_.-]*$/, { message: "Username can only contain letters, numbers, underscores, hyphens, and periods." })
    .refine((val) => !["admin", "user", "root"].includes(val), { message: "This username is not allowed." }),
  
    email: z
    .string()
    .nonempty({ message: "This field is memdatory" }) // Ensures the email field is not empty
    .email({ message: "Email address is not valid" }) // Validates general email format
    .max(80, { message: "Email must not exceed 80 characters." })
    .refine((val) => /@(gmail|yahoo|hotmail|outlook)\.com$/.test(val), {
      message: "Email doesn't end with valid domain as @gmail | @yahoo | @hotmail | @ouklook" 
    }),

    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(48, { message: "Password must not exceed 48 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*()_+~]/, { message: "Password must contain at least one special character." })
    .regex(/^\S*$/, { message: "Password must not contain any spaces." }),
  
  
    confirmPassword: z.string().min(1, { message: "Password confirmation is required." }),
});

// Define the full schema with password confirmation refinement
export const signUpSchema = baseSignUpSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }
);

export type SignUpSchema = z.infer<typeof signUpSchema>;


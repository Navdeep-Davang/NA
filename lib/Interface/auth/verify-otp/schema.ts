import { z } from "zod";

// Define the verify OTP schema
export const verifyOTPSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "This field is memdatory" }) 
    .max(80, { message: "Email must not exceed 80 characters." })
    .refine((val) => /@(gmail|yahoo|hotmail|outlook)\.com$/.test(val), {
      message: "Email doesn't end with valid domain as @gmail | @yahoo | @hotmail | @ouklook "
    }),

  otp: z
    .string()
    .nonempty({ message: "OTP is required." })
    .length(6, { message: "OTP must be 6 digits." })
    .regex(/^\d+$/, { message: "OTP must contain only numbers." }),
});

// Types
export type verifyOTPSchema = z.infer<typeof verifyOTPSchema>;

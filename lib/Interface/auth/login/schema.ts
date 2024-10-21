import { z } from "zod";

// Define the login schema
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "This field is memdatory" }) 
    .max(80, { message: "Email must not exceed 80 characters." })
    .refine((val) => /@(gmail|yahoo|hotmail|outlook)\.com$/.test(val), {
      message: "Email doesn't end with valid domain as @gmail | @yahoo | @hotmail | @ouklook"
    }),

  password: z
    .string()
    .nonempty({ message: "Password field cannot be empty" }) 
    .max(48, { message: "Password must not exceed 48 characters" }),
});


// Types
export type loginSchema = z.infer<typeof loginSchema>;


import { z } from "zod";

// Define the request OTP schema
export const requestOTPSchema = z.object({
  
  email: z
    .string()
    .nonempty({ message: "This field is memdatory" }) 
    .max(80, { message: "Email must not exceed 80 characters." })
    .refine((val) => /@(gmail|yahoo|hotmail|outlook)\.com$/.test(val), {
      message: "Email doesn't end with valid domain as @gmail | @yahoo | @hotmail | @ouklook "
    })

});


// Types
export type requestOTPSchema = z.infer<typeof requestOTPSchema>;


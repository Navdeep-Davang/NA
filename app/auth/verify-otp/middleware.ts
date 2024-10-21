// app\auth\verify-otp\middleware.ts

import { z } from "zod";
import { NextResponse } from "next/server";

// Define an email-only schema for the middleware
const emailOnlySchema = z.object({
  email: z
    .string()
    .nonempty({ message: "This field is mandatory" })
    .max(80, { message: "Email must not exceed 80 characters." })
    .refine((val) => /@(gmail|yahoo|hotmail|outlook)\.com$/.test(val), {
      message: "Email must end with a valid domain: @gmail, @yahoo, @hotmail, or @outlook",
    }),
});

export async function middleware(request: Request) {
  console.log('m00 ,Middleware running!');

  console.log("m0, Incoming request headers:", request.headers);


  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  // Check if email is null or empty
  if (!email) {
    console.log("m1, No eamil found in query parameter")
    return NextResponse.redirect(new URL("/auth/request-otp", request.url));
  }

  // Validate the email using the email-only schema
  try {
    await emailOnlySchema.parseAsync({ email });
  } catch (error) {
    console.log("m2, Eamil found but formate is not valid")
    return NextResponse.redirect(new URL("/auth/request-otp", request.url));
  }

  // Check for the 'email' cookie
  const cookieHeader = request.headers.get('cookie');
  console.log("m3 Received Cookies:", cookieHeader);
  const cookies = cookieHeader ? Object.fromEntries(cookieHeader.split('; ').map(c => c.split('='))) : {};
  const otpEmailCookie = cookies['email'];
 
  console.log("m4", JSON.stringify(otpEmailCookie));

  // Compare the cookie value with the query email
  if (!otpEmailCookie || otpEmailCookie !== email) {
    console.log("m5, Cookie not Found")
    return NextResponse.redirect(new URL("/auth/request-otp", request.url));
  }

  return NextResponse.next();
}

// Specify the paths for which this middleware should run
export const config = {
  matcher: "/auth/verify-otp",
};

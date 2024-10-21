// app\auth\reset-password\middleware.ts

import { z } from "zod";
import { NextResponse } from "next/server";
import { emailOnlySchema, OnlyResetKeySchema } from "@/lib/Interface/auth/reset-password/schema";


// Define a schema for validating the reset_key format


export async function middleware(request: Request) {
  console.log('m00, Reset Password Middleware running!');

  console.log("m0, Incoming request headers:", request.headers);

  // Check for the 'email' and 'reset_key' cookies
  const cookieHeader = request.headers.get('cookie');
  console.log("m1, Received Cookies:", cookieHeader);
  const cookies = cookieHeader ? Object.fromEntries(cookieHeader.split('; ').map(c => c.split('='))) : {};
  
  const otpEmailCookie = cookies['email'];
  const resetKeyCookie = cookies['reset_key'];

  console.log("m2, Email Cookie:", JSON.stringify(otpEmailCookie));
  console.log("m3, Reset Key Cookie:", JSON.stringify(resetKeyCookie));

  // Validate the email cookie
  if (!otpEmailCookie) {
    console.log("m4, Email cookie not found");
    return NextResponse.redirect(new URL("/auth/request-otp", request.url));
  }

  // Validate the reset_key cookie
  if (!resetKeyCookie) {
    console.log("m5, Reset key cookie not found");
    return NextResponse.redirect(new URL("/auth/request-otp", request.url));
  }

  // Validate the email format using the email-only schema
  try {
    await emailOnlySchema.parseAsync({ email: otpEmailCookie });
  } catch (error) {
    console.log("m6, Email cookie format is not valid");
    return NextResponse.redirect(new URL("/auth/request-otp", request.url));
  }

  // Validate the reset_key format using the reset key schema
  try {
    await OnlyResetKeySchema.parseAsync(resetKeyCookie);
  } catch (error) {
    console.log("m7, Reset key cookie format is not valid");
    return NextResponse.redirect(new URL("/auth/request-otp", request.url));
  }

  return NextResponse.next();
}

// Specify the paths for which this middleware should run
export const config = {
  matcher: "/auth/reset-password",
};

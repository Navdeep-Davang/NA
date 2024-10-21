// app\auth\verify-otp\page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation"; 
import { VerifyOTPForm } from "@/lib/components/auth/verify-otp/verifyOTPForm";

export default async function VerifyOTPPage() {
  const cookieStore = cookies();
  const emailCookie = cookieStore.get("email")?.value || null;

  // Check if the email cookie exists, if not, redirect to the Request OTP page
  if (!emailCookie) {
    redirect("/auth/request-otp");
  }

  return <VerifyOTPForm email={emailCookie} />;
}

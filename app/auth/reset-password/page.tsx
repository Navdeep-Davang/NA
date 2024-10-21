// app/auth/reset-password/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation"; 
import { ResetPasswordForm } from "@/lib/components/auth/reset-password/resetPasswordForm";

export default function ResetPasswordPage() {
  const cookieStore = cookies();
  const emailCookie = cookieStore.get("email")?.value || null;
  const resetKeyCookie = cookieStore.get("reset_key")?.value|| null;

  
  if (!emailCookie) {
    redirect("/auth/request-otp");
  }

  if (!resetKeyCookie) {
    redirect("/auth/request-otp");
  }

  return <ResetPasswordForm email={emailCookie} reset_key={resetKeyCookie}/>;
}

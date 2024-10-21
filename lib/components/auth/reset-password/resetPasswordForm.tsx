'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordFormProps } from "@/lib/Interface/auth/reset-password/types";
import { newPasswordSchema} from "@/lib/Interface/auth/reset-password/schema";
import { LucideAsterisk, LucideEye, LucideEyeOff } from "lucide-react";
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { resetPassword } from '@/lib/services/auth/reset-password/resetPassword';

export function ResetPasswordForm({ email, reset_key }: resetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const { toast } = useToast();
  const router = useRouter();

  // Real-time new password validation
  const validateNewPassword = (password: string) => {
    // Clear the error immediately when the user is typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      newPassword: undefined, // Clear the password error as the user types
    }));
  
    try {
      // Run validation if password length is greater than or equal to 8
      if (password.length >= 8) {
        newPasswordSchema.parse({ newPassword: password, confirmPassword });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const passwordError = error.errors.find((err) => err.path.includes('newPassword'));
        if (passwordError) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            newPassword: passwordError.message,
          }));
        }
      }
    }
  };
  
  // Real-time confirm password validation
  const validateConfirmPassword = (value: string) => {
    if (value !== newPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: undefined }));
    }
  };





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setSuccessMessage(null);
    setLoading(true);

    try {
      // Validate the input using the new password schema
      newPasswordSchema.parse({ newPassword, confirmPassword });

      // Prepare form data for the reset password API call
      const formData = { email, reset_key, newPassword, confirmPassword };

      // Send request to reset password
      const responseData = await resetPassword(formData);

      if (responseData.status === "success") {
        // Successful password reset
        const successTitle = responseData.success || "Password Reset Successful";
        const successMessage = responseData.message || "Your password has been reset successfully. You may now sign in.";

        toast({
          title: successTitle,
          description: successMessage,
          variant: "success",
        });

        setTimeout(() => {
          toast({
            title: "Redirecting...",
            description: "You will now be redirected to the login page",
            variant: "default",
            duration: 1500,
          });
        }, 1500);

        setTimeout(() => {
          router.push("/auth/login");
          // window.open(`/auth/login`, '_blank');
        }, 2500);
      }
    } catch (error) {
      let errorTitle = "Reset Password Failed";
      let errorMessage = "An unexpected error occurred.";

      // Check if error is ZodError
      if (error instanceof ZodError) {
        // console.log("Hit Zod error");
        const newFormErrors = error.errors.reduce((acc: Record<string, string>, curr) => {
          acc[curr.path[0]] = curr.message; // Map errors to their respective fields
          return acc;
        }, {});
        
        setErrors(newFormErrors); 

        errorTitle = "Validation Failed"; 
        errorMessage = newFormErrors[Object.keys(newFormErrors)[0]];
        
      } else if (error instanceof Error) {
       
        try {
          
          const parsedError = JSON.parse(error.message);
          errorTitle = parsedError.error || errorTitle;
          errorMessage = parsedError.message || errorMessage;

          if (parsedError.status === "410" ) {
            toast({
              title: errorTitle,
              description: errorMessage,
              variant: "destructive",
            });

            setTimeout(() => {
              toast({
                title: "Redirecting...",
                description: "You will now be redirected to the request OTP page.",
                variant: "default",
                duration: 1500,
              });
            }, 1500);

            setTimeout(() => {
              router.push("/auth/request-otp");
              // window.open(`/auth/request-otp`, '_blank');
            }, 2500);

            
            return; 
            
          }
        } catch {
          errorMessage = error.message || errorMessage;
        }
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
        duration: 4000
      });

      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Create New Password</CardTitle>
        <CardDescription>
          Enter the new password in the following field and confirm it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="flex flex-col space-y-1">
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => {
                    const passwordValue = e.target.value;
                    setNewPassword(passwordValue);
                                        
                    if (passwordValue.length >= 4) {
                      validateNewPassword(passwordValue);
                    }
                  }}
                  required
                  className="text-sm border border-gray-300 rounded p-2"
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showNewPassword ? (
                    <LucideEyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <LucideEye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <div className="flex items-center text-red-500 text-xs pl-2 mt-1">
                  <LucideAsterisk className="w-3 h-3 mr-1" />
                  <span>{errors.newPassword}</span>
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="flex flex-col space-y-1">
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value); // Real-time validation
                  }}
                  required
                  className="text-sm border border-gray-300 rounded p-2"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <LucideEyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <LucideEye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center text-red-500 text-xs pl-2 mt-1">
                  <LucideAsterisk className="w-3 h-3 mr-1" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>
          </div>
          {successMessage && <div className="text-green-500 text-sm text-center mt-2">{successMessage}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Remembered your password?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

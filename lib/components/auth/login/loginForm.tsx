// app/auth/login/login.tsx
'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/Interface/auth/login/schema";
import { LoginFormErrors } from '@/lib/Interface/auth/login/types';
import { z } from "zod";
import { LucideAsterisk, LucideEye, LucideEyeOff } from "lucide-react"; // Assuming this is the correct path for the asterisk icon
import { loginUser } from '@/lib/services/auth/login/loginUser';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);  // Toggle the password visibility state
  };

  const { toast } = useToast();
  const router = useRouter();

  // Handle input change, validate field, and set error if needed
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Validate each field on change for real-time error display
    try {
      loginSchema.shape[field].parse(value);
      setErrors({ ...errors, [field]: undefined, message: undefined }); // Clear specific error and general message
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ ...errors, [field]: error.errors[0].message });
      }
    }
  };

  // Handle form submission with complete validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    
    try {
      loginSchema.parse(formData); // Validate the full form data
      console.log("Form submission data:", JSON.stringify(formData));
      
      const responseData = await loginUser(formData, setErrors);

      if (responseData.status === "success") {

        // router.push("/dashboard")
        toast({
          title: responseData.success ,
          description: responseData.success,
          variant: "success", 
        }); 
      }

    } catch (error) {

      let errorMessage = "An unexpected error occurred.";
      let errorTitle = "Log In Failed";

      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const formErrors = error.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message; // Map the error messages by field
            return acc;
        }, {} as Record<string, string>);
        
        // Set the errors for UI feedback
        setErrors(formErrors);

        // Use the first error message as the title and description
        errorTitle = "Validation Error";
        errorMessage = formErrors[Object.keys(formErrors)[0]] || errorMessage;
      } else if (error instanceof Error) {
          const parsedError = JSON.parse(error.message); 
          errorTitle = parsedError.error || errorTitle; 
          errorMessage = parsedError.message || errorMessage;         
        }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive", 
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <div className="flex flex-col justify-between h-full space-y-4">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl">Log in to your Account</CardTitle>
          <CardDescription>Welcome back! We miss you.</CardDescription>
        </CardHeader>
  
        {errors.message && (
          <div className="flex items-center justify-center text-red-500 text-xs ">
            <LucideAsterisk className="w-3 h-3 mr-1" />
            <span>{errors.message}</span>
          </div>
        )}
  
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex flex-col space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="text-sm border border-gray-300 rounded p-2"
                />
                {errors.email && (
                  <div className="flex items-center text-red-500 text-xs pl-2 mt-1">
                    <LucideAsterisk className="w-3 h-3 mr-1" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
            </div>
  
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/request-otp" className="ml-auto inline-block text-sm underline">
                  Forget Password?
                </Link>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="relative">    
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="text-sm border border-gray-300 rounded p-2"
                />

                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                  {showPassword ? (
                  <LucideEyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                  <LucideEye className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                </div>
                
                {errors.password && (
                  <div className="flex items-center text-red-500 text-xs pl-2 mt-1">
                    <LucideAsterisk className="w-3 h-3 mr-1" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>  
            </div>
  
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Create New Account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
  
}

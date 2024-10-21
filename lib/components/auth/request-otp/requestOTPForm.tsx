  // app/auth/request-otp/request-otp.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestOTPSchema } from "@/lib/Interface/auth/request-otp/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { requestOTPFormErrors } from "@/lib/Interface/auth/request-otp/types";
import { requestOTP } from "@/lib/services/auth/request-otp/requestOTP";
import { z } from "zod";
import { LucideAsterisk } from "lucide-react";



export function RequestOTPForm() {
  const [formData, setFormData] = useState({ email: ""});
  const [errors, setErrors] = useState<requestOTPFormErrors>({});
  const [loading, setLoading] = useState(false);


  const { toast } = useToast();
  const router = useRouter();


  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });

    setErrors({ });

  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setLoading(true);  
    
    try {
        // Validate the form data against the schema
        requestOTPSchema.parse(formData); 
            
        // Call the service function to request the OTP
        const responseData = await requestOTP(formData);

        if (responseData.status === "success") {
          
                      
          toast({
              title: responseData.success || "OTP Requested",
              description: responseData.message || "Please check your inbox for the OTP.",
              variant: "success", 
          });

          setTimeout(() => {
            toast({
              title: "Redirecting...",
              description: "You will now be redirected to verification page to verify OTP",
              variant: "default", 
              duration: 1000 
          });
            
          }, 1500);

          setTimeout(() => {

            router.push(`/auth/verify-otp?email=${encodeURIComponent(responseData.email)}`);
            // window.open(`/auth/verify-otp?email=${encodeURIComponent(responseData.email)}`, '_blank');

          }, 2500);        
                    
        }

    } catch (error) {
        let errorMessage = "An unexpected error occurred. Please try again later.";
        let errorTitle = "Request Failed";

        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            const formErrors = error.errors.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message; // Map errors by field
                return acc;
            }, {} as Record<string, string>);
            
            // Set the errors in state for UI feedback
            setErrors(formErrors);

            // Use the first error message as the title and description
            errorTitle = "Validation Error";
            errorMessage = formErrors[Object.keys(formErrors)[0]] || errorMessage;
        } else if (error instanceof Error) {
            // Handle any other API error format
            const parsedError = JSON.parse(error.message); 
            errorTitle = parsedError.error || errorTitle; 
            errorMessage = parsedError.message || errorMessage;         
        }

        // Display toast notification for errors
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
        <CardTitle className="text-xl">Request an OTP</CardTitle>
        <CardDescription>
          Enter the registered email to get the OTP.
        </CardDescription>
      </CardHeader>
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Get OTP"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

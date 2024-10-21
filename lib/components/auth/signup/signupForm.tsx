// app/auth/signup/signupForm.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { baseSignUpSchema, signUpSchema } from "@/lib/Interface/auth/signup/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


// Import field components
import UsernameField  from "./UsernameField/UsernameField";
import  EmailField  from "./EmailField/EmailField";
import  PasswordField  from "./PasswordField/PasswordField";
import  ConfirmPasswordField  from "./ConfirmPasswordField/ConfirmPasswordField";
import { signUpUser } from '@/lib/services/auth/signup/signupUser';

// Import types
import { SignUpFormData, SignUpFormErrors } from "@/lib/Interface/auth/signup/types";

export function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<SignUpFormErrors>({});

  // Manage password visibility
  const [showPassword, setShowPassword] = useState(false); 
  // Manage confirm password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Error toast
  const { toast } = useToast();
  const router = useRouter();

  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);  // Toggle the password visibility state
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);    // Toggle confirm password visibility
  };


  const handleChange = (field: keyof SignUpFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const clearError = (field: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
  };
  
  const validateField = async (field: keyof SignUpFormData) => {
    try {
      await baseSignUpSchema.shape[field].parseAsync(formData[field]);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [field]: (error as z.ZodError).errors[0].message,
      }));
    }
  };

  const handleBlur = async (field: keyof SignUpFormData) => {
    await validateField(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      signUpSchema.parse(formData);
      
      // Call the service function to create the user
      const responseData = await signUpUser(formData, setErrors);

            
      if (responseData.status === "success") {
        
        let successTitle = "SignUp Successfull";
        let successMessage = "Your account registeration is successfull";          
      
        successTitle = responseData.success || successTitle; 
        successMessage = responseData.message || successMessage;

        toast({
          title: successTitle,
          description: successMessage,
          variant: "success", 
        }); 
        
        setTimeout(() => {
          toast({
            title: "Redirecting...",
            description: "You will now be redirected to log in page, to sign in.",
            variant: "default", 
            duration: 2000 
        });
          
        }, 2000);
        
        setTimeout(() => {
          router.push("/auth/login"); 
        }, 2000);
          
      } 

    } catch (error) {
        
      let errorMessage = "An unexpected error occurred.";
      let errorTitle = "Sign Up Failed";  
      
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const formErrors = error.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message; // map the error messages by field
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
      <CardHeader>
        <CardTitle className="text-xl">Create Account</CardTitle>
        <CardDescription>Create an account so you can start taking your notes.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">

          <UsernameField
            value={formData.username} // Use 'value' instead of 'username'
            onChange={(value) => handleChange("username", value)}
            clearError={() => clearError("username")}
            onBlur={() => handleBlur("username")}
            error={errors.username}
          />

          <EmailField
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            clearError={() => clearError("email")}
            onBlur={() => handleBlur("email")}
            error={errors.email}
          />

          <PasswordField
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
            showPassword={showPassword} // Pass the showPassword state
            togglePasswordVisibility={togglePasswordVisibility} // Pass the toggle function
            error={errors.password}
          />

          <ConfirmPasswordField
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onChange={(value) => handleChange("confirmPassword", value)}
            showConfirmPassword={showConfirmPassword} // Pass the showConfirmPassword state
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility} // Pass the toggle function
            error={errors.confirmPassword}
          />

          <Button type="submit" className="w-full">Sign Up</Button>
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

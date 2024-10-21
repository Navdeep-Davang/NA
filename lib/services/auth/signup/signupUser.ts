// lib/services/auth/signup/signupUser.ts


import { SignUpFormErrors } from "@/lib/Interface/auth/signup/types";

export const signUpUser = async (
  formData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  setErrors: React.Dispatch<React.SetStateAction<SignUpFormErrors>>
) => {
  
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  // Attempt to read the response body once
  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 409) {

      const errorData = {
        status: "error",
        error: "Invalid Input",
        message: `Please try a different value at ${
          responseData.errors?.username ? "username" : responseData.errors?.email ? "email" : "the provided field"
        }`,
      };
      
      // error shown below the input field
      if (responseData.errors && responseData.errors.username) {
        setErrors({ username: responseData.message }); 
      }
      if (responseData.errors && responseData.errors.email) {
        setErrors({ email: responseData.message }); 
      }

       // error shown as a toast
      throw new Error(JSON.stringify(errorData));
    } 
    
    if (response.status === 422 || response.status === 500) {
      const errorData = {
        status: 'error',
        error: responseData.error,
        message: responseData.message,
      };
      throw new Error(JSON.stringify(errorData));
    }
    
  }


  const successData = {
    status : "success",
    success : responseData.success,
    message : responseData.message,
  }
  return successData; // Return the parsed data
};

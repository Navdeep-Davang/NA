// lib\services\auth\request-otp\requestOTP.ts

import { requestOTPFormData } from "@/lib/Interface/auth/request-otp/types";

export const requestOTP = async ( formData : requestOTPFormData) =>
{

const response = await fetch('/api/auth/request-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

 // Attempt to read the response body once
 const responseData = await response.json();
 if (!response.ok) {
  const errorData = {
    status: "error",
    error: responseData.error,
    message: responseData.message,
    };
  
  // Handle specific error statuses
    if (response.status === 404) {        
      throw new Error(JSON.stringify(errorData));      
    }
    
    if (response.status === 503) {
      throw new Error(JSON.stringify(errorData));      
    }

    if (response.status === 500) {        
      throw new Error(JSON.stringify(errorData));
    }
  }

  
  const successData = {
    status: "success",
    success: responseData.success,
    message: responseData.message,
    email: responseData.email,
  };
  
  return successData; 
};

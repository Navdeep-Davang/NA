// lib\services\auth\request-otp\requestOTP.ts

import { resetPasswordFormData } from "@/lib/Interface/auth/reset-password/types";

export const resetPassword = async ( formData : resetPasswordFormData) =>{


const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

 // Attempt to read the response body once
 const responseData = await response.json();

console.log("s1", JSON.stringify(responseData));
 
 if (!response.ok) {
  const errorData = {
    status: "error",
    error: responseData.error,
    message: responseData.message,
    };
  
  // Handle specific error statuses
    if (response.status === 410) {         
      errorData.status = "410";

      throw new Error(JSON.stringify(errorData));      
    }
    
    if (response.status === 503 || response.status === 422) {   
     
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
  };
  
  return successData; 
};

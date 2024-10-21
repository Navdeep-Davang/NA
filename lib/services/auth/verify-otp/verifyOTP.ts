// lib/services/auth/verify-otp/verifyOTP.ts

import { toast } from "@/hooks/use-toast";
import { verifyOTPFormData } from "@/lib/Interface/auth/verify-otp/types";

export const verifyOTP = async (formData: verifyOTPFormData) => {

  const response = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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

    
    if (response.status === 400) {
      throw new Error(JSON.stringify(errorData));
    }

    if (response.status === 410) {
      
      errorData.status = "410";
      
      throw new Error(JSON.stringify(errorData));

    }

    if (response.status === 429) {

      errorData.status = "429";

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

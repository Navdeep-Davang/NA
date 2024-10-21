// lib\services\auth\login\loginUser.ts

import { LoginFormErrors } from "@/lib/Interface/auth/login/types"; // Adjust the path according to your directory structure

export const loginUser = async (
  formData: {
    email: string;
    password: string;
  },
  setErrors: React.Dispatch<React.SetStateAction<LoginFormErrors>>
) => {
  const response = await fetch('/api/auth/login', {
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

    // Handle specific error statuses
    if (response.status === 401) {
      setErrors({ message: "Either email or password credentials are incorrect." });

      throw new Error(JSON.stringify(errorData));      
    }

    if (response.status === 500) {      
      throw new Error(JSON.stringify(errorData));
    }
  }

  
  const successData = {
    status : "success",
    success : responseData.success,
    message : responseData.message,
  };
  
  return successData; 
};

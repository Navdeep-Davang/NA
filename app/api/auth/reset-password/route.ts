// app/api/auth/reset-password/route.ts

import { NextResponse } from 'next/server';
import { ApiErrorResponse } from '@/lib/Interface/auth/reset-password/types'; // Adjust the import path accordingly
import { emailOnlySchema, newPasswordSchema } from '@/lib/Interface/auth/reset-password/schema'; // Adjust the import path for email validation

// Function to simulate a reset password call to an external server
async function resetUserPassword(email: string, reset_key: string, new_password: string) {
  
  const response = await fetch(`${process.env.SERVER_URL}/resetPassword/1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, reset_key, new_password }),
  });

 
  if (!response.ok) {
    const errorData = await response.json();
    
    throw { statusCode: response.status, ...errorData }; 
  }

  return await response.json(); 
}

// Enhanced function to check if the error matches the ApiErrorResponse format
function isApiErrorResponse(error: any): error is ApiErrorResponse {
  return (
    error &&
    error.status === "error" &&
    typeof error.message === "string" &&
    typeof error.error === "string"
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
   

    // Validate the email and password fields
    emailOnlySchema.parse({ email: formData.email }); 
    newPasswordSchema.parse({ newPassword: formData.newPassword, confirmPassword: formData.confirmPassword });

    console.log(JSON.stringify(formData));

    if (formData.newPassword !== formData.confirmPassword)  {
      return NextResponse.json(
        {
          status: "error",
          message: "Please check Password and Confirm-Password Field, and make sure they match",
          error: "Password Confirmation Failed",
        },
        { status: 422 }
      );
    }

    const { email, reset_key, new_password } = formData;

    const resetResponse = await resetUserPassword(email, reset_key, new_password);

    // Return success response
    return NextResponse.json(
      resetResponse,
      { status: 200 }
    );

  } catch (error: any) {    
    // console.log("r1, Caught error:", JSON.stringify(error));

   
    if (error.statusCode === 410 || error.statusCode === 503) {
      // console.log("r2", JSON.stringify(error.statusCode));
 
      if (isApiErrorResponse(error)) {
        return NextResponse.json(
            {
              status: "error",
              error: error.error,
              message: error.message,
            },
            { status: error.statusCode }
          );
      }
    }
    
    return NextResponse.json(
      {
        status: "error",
        error: "Bad Request",
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}

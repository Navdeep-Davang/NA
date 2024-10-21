// app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import { signUpSchema } from '@/lib/Interface/auth/signup/schema'; 
import { ApiErrorResponse } from '@/lib/Interface/auth/signup/types';



// Mock function to simulate creating a user in a database
export async function createUser(username: string, email: string, password: string) {
  const SERVER_URL = process.env.SERVER_URL;
  
  const response = await fetch(`${SERVER_URL}/register?param=3`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // console.log("r1, Error response received:", errorData);

    throw { statusCode: response.status, ...errorData }; 
  }

  return await response.json();
}




// Function to check if the error matches the ApiErrorResponse format
function isApiErrorResponse(error: any): error is ApiErrorResponse {
  return (
    error &&
    error.status === "error" &&
    typeof error.message === "string" &&
    typeof error.errors === "object" &&
    (error.errors.username || error.errors.email) // Adjust based on your API's response structure
  );
}




export async function POST(request: Request) {
  try {
    const formData = await request.json();
    // Validate the incoming data against the schema
    signUpSchema.parse(formData);

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please check Password and Confirm-Password Field, and make sure they match",
          error: "Password Confirmation Failed",
        },
        { status: 422 }
      );
    }

    const { username, email, password } = formData;

    // Call the user creation function
    const signupResponce = await createUser(username, email, password);

    // Return success response
    return NextResponse.json(
      signupResponce,
      { status: 201 }
    );

  } catch (error: any) {
    
    if (error.statusCode === 409) {
      
      if (isApiErrorResponse(error)) {
        // console.log("r2 API error response:", error);
        return NextResponse.json(
          error,
          { status: error.statusCode }
        );
      } 
      
    }

    // Generic error response for any other error types
    return NextResponse.json(
      {
        status: "error",
        error: "Bad Request",
        message: "Something went wrong. Please try again later."
      },
      { status: 500 }
    );
  }
}

// app\api\auth\login\route.ts

import { NextResponse } from 'next/server';
import { ApiErrorResponse } from '@/lib/Interface/auth/login/types'; // Adjust the import path accordingly
import { loginSchema } from '@/lib/Interface/auth/login/schema';



// Function to simulate a login call to an external server
async function getUser(email: string, password: string) {
  const response = await fetch(`${process.env.SERVER_URL}/login?param=2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    
    throw { statusCode: response.status, ...errorData }; 
  }

  return await response.json(); 
}




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
    loginSchema.parse(formData);

    const { email, password } = formData;

    const loginResponse = await getUser(email, password);

    
    return NextResponse.json(
      loginResponse,
      { status: 200 }
    );
  } catch (error: any) {
    

    if (error.statusCode === 401) {
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

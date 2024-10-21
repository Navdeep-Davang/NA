import { NextResponse } from 'next/server';
import { verifyOTPSchema } from '@/lib/Interface/auth/verify-otp/schema';
import { ApiErrorResponse } from '@/lib/Interface/auth/verify-otp/types';


interface CookieValues {
  email?: string; 
  reset_key?: string; 
}



// Function to simulate OTP verification against an external server
async function verifyOTPService(email: string, otp: string) {
  const response = await fetch(`${process.env.SERVER_URL}/verifyOTP/1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { statusCode: response.status, ...errorData }; 
  }

  const responseBody = await response.json();
  const setCookieHeader = response.headers.get('set-cookie');

  return { responseBody, setCookieHeader }; 
}

function isApiErrorResponse(error: any): error is ApiErrorResponse {
  return (
    error &&
    error.status === "error" &&
    typeof error.error === "string" &&
    typeof error.message === "string"
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    verifyOTPSchema.parse(formData); 

    const { email, otp } = formData; 
    const { responseBody, setCookieHeader } = await verifyOTPService(email, otp); // Call the service function

    // console.log("r1, Set-Cookie Header:", setCookieHeader);
    
    if (!setCookieHeader) {
      throw new Error("Verification cookie not set or returned from the server");
    }
    
    const cookiesArray = setCookieHeader.split(', '); 
    const cookieValues: CookieValues = {}; 


    const response = NextResponse.json(responseBody, { status: 200 });


    cookiesArray.forEach(cookie => {
      const [nameValue, ...attributes] = cookie.split(';');
      const [name, value] = nameValue.split('=');
      
      
      if (name === 'email' || name === 'reset_key') {
        cookieValues[name as keyof CookieValues] = value; 
      }

      
      response.cookies.set(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/auth/reset-password', 
        maxAge: 600, 
      });
    });

    
    if (!cookieValues.email || !cookieValues.reset_key) {
      throw new Error("Required cookies (email or reset_key) are not set");
    }

    return response; 

  } catch (error: any) {
    

    if (error.statusCode === 400 && isApiErrorResponse(error)) {
      return NextResponse.json(
        {
          status: "error",
          error: error.error,
          message: error.message,
        },
        { status: 400 }
      );
    }

    if (error.statusCode === 410 && isApiErrorResponse(error)) {
      return NextResponse.json(
        {
          status: "error",
          error: error.error,
          message: error.message,
        },
        { status: 410 }
      );
    }

    if (error.statusCode === 429 && isApiErrorResponse(error)) {
      return NextResponse.json(
        {
          status: "error",
          error: error.error,
          message: error.message,
        },
        { status: 429 }
      );
    }

    if (error.statusCode === 503 && isApiErrorResponse(error)) {
      return NextResponse.json(
        {
          status: "error",
          error: error.error,
          message: error.message,
        },
        { status: 503 }
      );
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

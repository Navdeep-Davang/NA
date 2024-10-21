import { NextResponse } from 'next/server';
import { requestOTPSchema } from '@/lib/Interface/auth/request-otp/schema';
import { ApiErrorResponse } from '@/lib/Interface/auth/request-otp/types';

// Function to simulate OTP request to an external server
async function sendOTP(email: string) {
  const response = await fetch(`${process.env.SERVER_URL}/requestOTP/1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email }),
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
    requestOTPSchema.parse(formData);

    const { email } = formData;
    const { responseBody, setCookieHeader } = await sendOTP(email);
    // console.log("r1, Set-Cookie Header:", setCookieHeader);

    // Make sure the set-cookie header is properly formatted
    const cookieOptions = setCookieHeader?.split(';').reduce((acc, part) => {
      const [key, value] = part.split('=').map(p => p.trim());
      if (key === 'email') acc.email = value;
      return acc;
    }, { email: '' });
    
    if (!cookieOptions || !cookieOptions.email) {
      throw new Error("Email cookie not set or returned from the server.");
    }
    const response = NextResponse.json(responseBody, { status: 200 });

    response.cookies.set('email', cookieOptions.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 600,
      path: '/auth/verify-otp',
    });
    
    return response;

  } catch (error: any) {
   
    // console.log("r3",JSON.stringify(error));

    if ((error.statusCode === 404 || error.statusCode === 503) && isApiErrorResponse(error)) {
      return NextResponse.json(
        {
          status: "error",
          error: error.error,
          message: error.message,
        },
        { status: error.statusCode }
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

// app/api/search-filter/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Access the cookies and get the values as strings
  const accessToken = req.cookies.get('access_token')?.value; // Use optional chaining
  const refreshToken = req.cookies.get('refresh_token')?.value; // Use optional chaining

  // Check if the access token exists
  if (!accessToken) {
    return NextResponse.redirect('/login'); // Redirect to login if no access token
  }

  // Function to check if the access token is expired (implement your own logic)
  const isAccessTokenExpired = (token: string | undefined) => {
    if (!token) return true; // Token is missing, consider it expired
  
    // Split the token to get the payload (second part of the token)
    const payload = token.split('.')[1];
  
    // Decode the payload from Base64Url
    const decodedPayload = JSON.parse(atob(payload));
  
    // Get the expiration time from the payload
    const expirationTime = decodedPayload.exp;
  
    // Check if the current time is greater than the expiration time
    return Date.now() > expirationTime * 1000; // Convert to milliseconds
  };

  // Check if access token is expired
  if (isAccessTokenExpired(accessToken)) {
    // Send a request to refresh the token
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-access-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      const newAccessToken = data.access_token;

      // Set the new access token in cookies or wherever you manage them
      const res = NextResponse.next();
      res.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure based on environment
        path: '/',
      });

      return res; // Proceed with the request using the new access token
    } else {
      return NextResponse.redirect('/login'); // Redirect if refresh fails
    }
  }

  return NextResponse.next(); // Proceed with the original request
}

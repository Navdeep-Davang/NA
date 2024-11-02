// app/api/get-access-token/route.ts


import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.redirect('/login'); // Redirect if no refresh token is present
  }

  try {
    // Use SERVER_URL for the backend API call
    const response = await fetch(`${process.env.SERVER_URL}/get-access-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    const newAccessToken = data.access_token;

    const res = NextResponse.next();
    res.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      path: '/',
    });

    return res; // Proceed with the request using the new access token
  } catch (error) {
    return NextResponse.redirect('/login'); // Redirect to login if refresh fails
  }
}

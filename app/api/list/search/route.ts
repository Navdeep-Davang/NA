// app/api/search-filter/listSearch/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { searchTerm } = await request.json();

  if (!searchTerm || typeof searchTerm !== 'string') {
    return NextResponse.json({ folders: [], notes: [] });
  }

  const accessToken = request.cookies.get('access_token')?.value;

  try {
    const response = await fetch(`${process.env.SERVER_URL}/listSearch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ searchTerm }),
    });

    if (!response.ok) {
      // If the response is unauthorized, attempt to refresh the token
      if (response.status === 401) {
        await fetch('/api/get-access-token', { method: 'POST' });
        
        // After trying to refresh, retry the request with the new access token
        const newAccessToken = request.cookies.get('access_token')?.value; // Fetch the new token
        const retryResponse = await fetch(`${process.env.SERVER_URL}/listSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newAccessToken}`,
          },
          body: JSON.stringify({ searchTerm }),
        });

        if (!retryResponse.ok) {
          throw new Error('Failed to fetch data from the server after token refresh');
        }
        return NextResponse.json(await retryResponse.json());
      }

      throw new Error('Failed to fetch data from the server');
    }

    return NextResponse.json(await response.json());
  } catch (error) {
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

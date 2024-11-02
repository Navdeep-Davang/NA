// app/api/list/data/route.ts

import { NextResponse } from 'next/server';
import { mockNotes, mockFolders } from '@/lib/storage/data/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/db'; // Import mock data

const SERVER_URL = 'server_url/listdata';

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request
    const { type, filter } = await request.json();

    console.log("r1", JSON.stringify({ type, filter }));

    // Uncomment this block to forward the request to the Django server (mocked by Postman)
    /*
    // Forward the request to the Django server (mocked by Postman)
    const response = await fetch(`${process.env.SERVER_URL}/listData/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, filter }), // Send type and filter in the body
    });

    // Check if the response is successful
    if (!response.ok) {
      return NextResponse.error();
    }

    // Pass the Django server response back to the client
    const data = await response.json();
    return NextResponse.json(data);
    */

    // Use mock data instead
    if (type === 'Note') {
      // Here you can add filtering logic based on the filter object if needed
      return NextResponse.json(mockNotes);
    } else if (type === 'Folder') {
      // Here you can add filtering logic based on the filter object if needed
      return NextResponse.json(mockFolders);
    } else {
      return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

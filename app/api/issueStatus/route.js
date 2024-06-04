// pages/api/issueStatus.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { sessionId, issuerSession, ticketId } = await request.json();
  const serverURI = process.env.WEBSOCKET_SERVER_URL + "/issueStatus?sessionId=" + sessionId;

  const options = {
    method: "GET",
    next: {
      revalidate: 0,
    },
  };

  try {
    const response = await fetch(serverURI, options);
    const result = await response.json();

    // Check the result from the API and stop polling if a condition is met
    if (result.status === "success") {
      return NextResponse.json({ status: "success", data: result });
    }

    return NextResponse.json({ status: "pending", data: result });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "error", error: e.message });
  }
}

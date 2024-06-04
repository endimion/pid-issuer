import { NextResponse } from "next/server";
import {
  getSessionData,
  setOrUpdateSessionData,
} from "../../services/redisService";
import { streamToBuffer } from "@jorgeferrero/stream-to-buffer";
const qr = require("qr-image");
const imageDataURI = require("image-data-uri");

export async function POST(request) {
  const { sessionId, issuerSession, ticketId } = await request.json();
  // const tickets = await getSessionData(sessionId, "tickets");
  const serverURI = process.env.WEBSOCKET_SERVER_URL + "/pre-offer-jwt-pid";

  const options = {
    method: "GET",
    next: {
      revalidate: 0,
    },
  };
  try {
    const response = await fetch(serverURI, options);
    console.log(await response.json());
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({ status: "OK" });
}

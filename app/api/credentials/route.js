import { NextResponse } from "next/server";
import {
  getSessionData,
  setOrUpdateSessionData,
} from "../../services/redisService";
import { streamToBuffer } from "@jorgeferrero/stream-to-buffer";
const qr = require("qr-image");
const imageDataURI = require("image-data-uri");

export async function POST(request) {
  const { sessionId, gatacaSession, ticketId } = await request.json();
  const tickets = await getSessionData(sessionId, "tickets");
  const serverURI = process.env.WEBSOCKET_SERVER_URL + "/issue";
  
  let ticketData = tickets[ticketId];
  let qrCode = await makeQRdata(ticketData.ticketLet+ticketData.ticketNumber)
  
  ticketData["qrCode"] = qrCode
  

  const requestObject = {
    gatacaSession: gatacaSession,
    userData: ticketData,
    issueTemplate: process.env.GATACA_ISSUE_TEMPLATE,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(requestObject),
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


async function makeQRdata(qrData){
  let code = qr.image(qrData, {
    type: "jpg",
    ec_level: "H",
    size: 10,
    margin: 10,
  });
  let mediaType = "jpg";
  let encodedQR = imageDataURI.encode(
    await streamToBuffer(code),
    mediaType
  );
  return encodedQR
}
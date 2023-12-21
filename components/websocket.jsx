"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Websocket({
  gatacaSessionId,
  issueTemplate,
  WEBSOCKET_SERVER,
  cffSessionId,
  ticketIndex,
  issueCompleted,
}) {
  const socket = io(WEBSOCKET_SERVER);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isIssued, setIsIssued] = useState(false);
  const [gatacaSession, setGatacaSession] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("message", {
        type: "start-session",
        id: gatacaSessionId,
        socketID: socket.id,
        credential: issueTemplate,
      });
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("message", async (data) => {
      // console.log(data)
      if (data.status === "READY" && data.sessionId === gatacaSessionId) {
        console.log("my issuance is completed");
        
        let response = await initiateIssuance(cffSessionId, gatacaSessionId, ticketIndex);
        console.log(response)
        if(response.status == 400){
          alert("ERROR")
        }else{
          issueCompleted()
        }
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  return <></>;
}

async function initiateIssuance(sessionId, gatacaSession, ticketId) {
  const issueAPIURL = "/api/credentials";

  const requestObject = {
    gatacaSession: gatacaSession,
    ticketId: ticketId,
    sessionId: sessionId,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(requestObject),
    next: {
      revalidate: 0,
    },
  };
//   console.log("test", sessionId, gatacaSession, ticketId)
  try {
    const response = await fetch(issueAPIURL, options);
    // console.log(await response.json());
    return await response.json()
  } catch (e) {
    console.log(e);
    return e
  }
}

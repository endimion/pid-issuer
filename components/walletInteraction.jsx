"use client";

import QRPrompt from "@/components/qrPrompt";
import DeepLinkPrompt from "@/components/deepLinkPrompt";
import IssueComplete from "@/components/issueComplete";
import Websocket from "@/components/websocket";
import Polling from "@/components/polling";
import { useEffect, useState } from "react";

export default function WalletInteraction({
  error,
  gatacaSession,
  issueSessionId,
  ticketIndex,
  issueTemplate,
  WEBSOCKET_SERVER,
  WEBSOCKET_SERVER_URL,
  qrContent,
  deepLink,
  Placeholder,
  CompleteImg,
  Continue,
  id,
  Terminate
}) {
  const [tickets, setTicket] = useState([]);
  const [ticketTimestamp, setTicketTimestamp] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    //re-set in state the tickets... from local storage to update them if issuance is completed
    //we do not check how long the tickets are cached here, as it doesn't matter at this point...
    const storedState = localStorage.getItem("state");
    if (storedState && tickets.length == 0) {
      const stateObject = JSON.parse(storedState);
      setTicket(stateObject.tickets);
      setTicketTimestamp(stateObject.timestamp);
    }

    // Check if window is defined (to avoid server-side rendering issues)
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set initial size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Add event listener to update dimensions on window resize
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const errorContet = (
    <>
      <QRPrompt
        qrContent={
          <img
            alt="QR Code Placeholder"
            className="mr-6"
            height="300"
            src={Placeholder.src}
            style={{
              aspectRatio: "300/300",
              objectFit: "cover",
            }}
            width="300"
          />
        }
      />
      <p>{error}</p>
    </>
  );

  let content = (
    <>
      {/* <Websocket
        gatacaSessionId={gatacaSession}
        issueSessionId={issueSessionId}
        ticketIndex={ticketIndex}
        issueTemplate={issueTemplate}
        WEBSOCKET_SERVER={WEBSOCKET_SERVER}
        WEBSOCKET_SERVER_URL={WEBSOCKET_SERVER_URL}
        issueCompleted={() => {
          setIsComplete(true);
        }}
      /> */}

      <Polling
        issuanceSession={issueSessionId}
        WEBSOCKET_SERVER_URL={WEBSOCKET_SERVER_URL}
        issueCompleted={() => {
          setIsComplete(true);
        }}
      />
      <QRPrompt qrContent={qrContent} Continue={Continue}/>
    </>
  );

  let contentMobile = (
    <>
      {/* <Websocket
        gatacaSessionId={gatacaSession}
        issueSessionId={issueSessionId}
        ticketIndex={ticketIndex}
        issueTemplate={issueTemplate}
        WEBSOCKET_SERVER={WEBSOCKET_SERVER}
        WEBSOCKET_SERVER_URL={WEBSOCKET_SERVER_URL}
        issueCompleted={() => {
          setIsComplete(true);
        }}
      /> */}
      <Polling
        WEBSOCKET_SERVER_URL={WEBSOCKET_SERVER_URL}
        issuanceSession={issueSessionId}
        issueCompleted={() => {
          setIsComplete(true);
        }}
      />
      <DeepLinkPrompt deepLink={deepLink} />
    </>
  );

  let completedContent = (
    <IssueComplete
      imageContent={
        <img
          alt="QR Code Placeholder"
          className="mr-6"
          height="150"
          src={CompleteImg.src}
          style={{
            aspectRatio: "150/150",
            objectFit: "cover",
            marginLeft: "20%",
          }}
          width="150"
        />
      }
      Continue={Continue}
      Terminate={Terminate}
      id={id}
    />
  );

  if (error) return errorContet;
  if (isComplete) return completedContent;
  if (windowSize.width < 650) return contentMobile;
  return content;
}

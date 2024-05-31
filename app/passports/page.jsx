import WalletInteraction from "@/components/walletInteraction";
import { v4 as uuidv4 } from "uuid";

import Placeholder from "./Placeholder.png";
import Bluecheck from "./bluecheck.png";

async function generateVCIrequest(personaId, sessionId) {
  try {
    const response = await fetch(
      process.env.WEBSOCKET_SERVER_URL +
        "/pre-offer-jwt-passport?sessionId=" +
        sessionId +
        "&personaId=" +
        personaId,
      {
        cache: "no-cache",
      }
    );
    const responseData = await response.json();
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(
      `error trying ${
        process.env.WEBSOCKET_SERVER_URL +
        "/pre-offer-jwt-passport=" +
        sessionId +
        "&personaId=" +
        personaId
      }`
    );
    console.error("Error fetching Issuance Request", error);
    return {
      error: error,
    };
  }
}

export default async function Personas({ searchParams }) {
  // const { searchParams } = new URL(req.url);
  const { id } = searchParams;
  const issueSessionId = uuidv4() + "-persona=" + id;
  const ticketIndex = id;

  const qrGenerationResult = await generateVCIrequest(id, issueSessionId);
  const gatacaSession = qrGenerationResult.gatacaSession;

  return (
    <WalletInteraction
      error={qrGenerationResult.error}
      gatacaSession={gatacaSession}
      issueSessionId={issueSessionId}
      ticketIndex={ticketIndex}
      issueTemplate={process.env.ISSUE_TEMPLATE}
      WEBSOCKET_SERVER={process.env.WEBSOCKET_SERVER} //TODO there is not WB support
      WEBSOCKET_SERVER_URL={process.env.WEBSOCKET_SERVER_URL}
      qrContent={
        <img
          alt="QR Code Placeholder"
          className="mr-6"
          height="300"
          src={qrGenerationResult.qr}
          style={{
            aspectRatio: "300/300",
            objectFit: "cover",
          }}
          width="300"
        />
      }
      deepLink={qrGenerationResult.deepLink}
      Placeholder={Placeholder}
      CompleteImg={Bluecheck}
      Terminate={true}
    />
  );
}

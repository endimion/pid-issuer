import WalletInteraction from "@/components/walletInteraction";
import { v4 as uuidv4 } from "uuid";
import qr from "qr-image";
import imageDataURI from "image-data-uri";
import { streamToBuffer } from "@jorgeferrero/stream-to-buffer";

import Placeholder from "./Placeholder.png";
import Bluecheck from "./bluecheck.png";

async function generateVCIrequest(personaId, sessionId) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || "/pid"; // Fallback to '' if not set
  try {
    const response = await fetch(`${baseUrl}/api/igrant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({ id: personaId }),
    });
    const responseData = await response.json();

    let code = qr.image(responseData.credentialOffer, {
      type: "png",
      ec_level: "H",
      size: 10,
      margin: 10,
    });
    let mediaType = "PNG";
    let encodedQR = imageDataURI.encode(await streamToBuffer(code), mediaType);

    // console.log(responseData);
    let result = {
      qr: encodedQR,
      deepLink: responseData.credentialOffer,
      issuerState: responseData.credentialExchangeId,
    };
    return result;
  } catch (error) {
    console.log(
      `error trying ${baseUrl}/api/igrant
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
  const issuerSession = qrGenerationResult.issuerState;

  return (
    <WalletInteraction
      error={qrGenerationResult.error}
      // issuerSession={issuerSession}
      issueSessionId={issuerSession}
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
      pollingMode={"igrant"}
    />
  );
}

import WalletInteraction from "@/components/walletInteraction";

import Placeholder from "./Placeholder.png";
import Bluecheck from "./bluecheck.png";

async function getGatacaRequestQR() {

  


  try {
    const response = await fetch(
      process.env.WEBSOCKET_SERVER_URL +
        "/makeIssueOffer/" +
        process.env.GATACA_ISSUE_TEMPLATE,
      {
        cache: "no-cache",
      }
    );
    console.log("making new issuance session... ");
    const responseData = await response.json();
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(
      `error trying ${
        process.env.WEBSOCKET_SERVER_URL +
        "/makeIssueOffer/" +
        process.env.GATACA_ISSUE_TEMPLATE
      } ,`
    );
    console.error("Error fetching GATACA Issuance Request", error);
    return {
      error: error,
    };
  }
}

export default async function Issue({ params, searchParams }) {
  // const { searchParams } = new URL(req.url);
  const { sessionId, id } = searchParams;
  const cffSessionId = sessionId;
  const ticketIndex = id;

  const qrGenerationResult = await getGatacaRequestQR();
  const gatacaSession = qrGenerationResult.gatacaSession;

  return (
    <WalletInteraction
      error={qrGenerationResult.error}
      gatacaSession={gatacaSession}
      cffSessionId={cffSessionId}
      ticketIndex={ticketIndex}
      issueTemplate={process.env.GATACA_ISSUE_TEMPLATE}
      WEBSOCKET_SERVER={process.env.WEBSOCKET_SERVER}
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
    />
  );
}

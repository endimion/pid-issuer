import WalletInteraction from "@/components/walletInteraction";

import Placeholder from "./Placeholder.png";
import Bluecheck from "./bluecheck.png";

async function generateVCIrequest(sessionId, personaId) {
  console.log("Generating new VCI Request");
  try {
    const response = await fetch(
      process.env.WEBSOCKET_SERVER_URL +
        "/offer-pid-persona?sessionId=" +
        sessionId +
        "&personaId=" +
        personaId,
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
        process.env.ISSUE_TEMPLATE
      } ,`
    );
    console.error("Error fetching Issuance Request", error);
    return {
      error: error,
    };
  }
}

export default async function Personas({ params, searchParams }) {
  // const { searchParams } = new URL(req.url);
  const { sessionId, id } = searchParams;
  const issueSessionId = sessionId+ "-persona=" + id;
  const ticketIndex = id;

  const qrGenerationResult = await generateVCIrequest(sessionId, id);
  const issuerSession = qrGenerationResult.issuerSession;

  return (
    <WalletInteraction
      error={qrGenerationResult.error}
      issuerSession={issuerSession}
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
      Continue={true}
      id={id}
      pollingMode={"rfc-issuer"}
    />
  );
}

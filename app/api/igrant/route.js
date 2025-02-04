import { NextResponse } from "next/server";
import {
  getSessionData,
  setOrUpdateSessionData,
} from "../../services/redisService";
import { streamToBuffer } from "@jorgeferrero/stream-to-buffer";
const qr = require("qr-image");
const imageDataURI = require("image-data-uri");

export async function GET(req) {
  // Extract the id from the request params
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log("polling igrant status");
  const igrantKey = process.env.IGRANT_KEY;
  const serverURI =
    "https://demo-api.igrant.io/v2/config/digital-wallet/openid/sdjwt/credential/history/" +
    id;

  const response = await fetch(serverURI, {
    method: "GET",
    headers: {
      Authorization: "ApiKey " + igrantKey,
    },
  });
  const result = await response.json();
  if (result.credentialHistory.isAccessed)
    console.log(result.credentialHistory.isAccessed);
  // Use the id to perform any necessary actions, e.g., fetch data from a database
  if (result.credentialHistory.isAccessed) {
    return NextResponse.json({ status: "success" });
  } else {
    return NextResponse.json({ status: "pending" });
  }
}

export async function POST(req) {
  const igrantKey = process.env.IGRANT_KEY;
  const body = await req.json();
  const id = body.id; //new URL(req.body);
  // const id = searchParams.get("id");
  // const tickets = await getSessionData(sessionId, "tickets");
  const serverURI =
    "https://demo-api.igrant.io/v2/config/digital-wallet/openid/sdjwt/credential/issue";

  let requestBody = {};
  if (id === "1") {
    // requestBody = {
    //   issuanceMode: "InTime",
    //   userPin: "",
    //   credential: {
    //     type: ["VerifiableCredential", "VerifiableAttestation", "Passport"],

    //     credentialSubject: {
    //       firstName: "Mario",
    //       lastName: "Conti",
    //       image: "",
    //       serialNumber: "000010",
    //       gender: "Male",
    //       signature: "",
    //       personalNumber: "19800411-5312",
    //       issuerAuthority: "EWC",
    //       birthDate: "1980-04-11",
    //       expiryDate: "2025-04-12",
    //       nationality: "Italy",
    //     },
    //   },
    // };
    requestBody= {
      "issuanceMode": "InTime",
      "credentialDefinitionId": "d329f541-b805-4d0c-a608-5c365852ab1c",
      "credential": {
        "claims": {
          "birthDate": "1990-05-15",
          "expiryDate": "2033-03-01",
          "firstName": "Mario",
          "gender": "Male",
          "image": "NIL",
          "issuerAuthority": "Swedish Police Authority",
          "lastName": "Conti",
          "nationality": "Italy",
          "personalNumber": "900515-1234",
          "serialNumber": "X12345678",
          "signature": "NIL"
        }
      }
    }
  
  
  } else if (id === "2") {
    requestBody= {
      "issuanceMode": "InTime",
      "credentialDefinitionId": "d329f541-b805-4d0c-a608-5c365852ab1c",
      "credential": {
        "claims": {
          "birthDate": "1990-05-15",
          "expiryDate": "2033-03-01",
          "firstName": "Hannah",
          "gender": "Male",
          "image": "NIL",
          "issuerAuthority": "Swedish Police Authority",
          "lastName": "Matkalainen",
          "nationality": "Finland",
          "personalNumber": "900515-1234",
          "serialNumber": "X12345678",
          "signature": "NIL"
        }
      }
    }

  } else {
    

    requestBody= {
      "issuanceMode": "InTime",
      "credentialDefinitionId": "d329f541-b805-4d0c-a608-5c365852ab1c",
      "credential": {
        "claims": {
          "birthDate": "1990-05-15",
          "expiryDate": "2033-03-01",
          "firstName": "Felix",
          "gender": "Male",
          "image": "NIL",
          "issuerAuthority": "Swedish Police Authority",
          "lastName": "Fischer",
          "nationality": "German",
          "personalNumber": "900515-1234",
          "serialNumber": "X12345678",
          "signature": "NIL"
        }
      }
    }
  }

  try {
    const credentialResponse = await fetch(serverURI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "ApiKey " + igrantKey,
      },
      body: JSON.stringify(requestBody),
    });
    let res = await credentialResponse;
    let igrantResponse = await res.json();
    // console.log(igrantResponse);

    let apiResponse = {
      status: "OK",
      credentialOffer: igrantResponse.credentialHistory.credentialOffer,
      issuerState: igrantResponse.credentialHistory.issuerState,
      credentialExchangeId:
        igrantResponse.credentialHistory.CredentialExchangeId,
    };
    console.log("12321");
    console.log(apiResponse);
    return NextResponse.json(apiResponse);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "ERROR" });
  }
}

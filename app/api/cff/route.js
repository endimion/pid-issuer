import { NextResponse } from "next/server";
import {
  getSessionData,
  setOrUpdateSessionData,
} from "../../services/redisService";
import { v4 as uuidv4 } from "uuid";

const DATA_SOURCE_URL = process.env.CFF_CONNECTOR_URL;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lastName = searchParams.get("lastName");
  const pnr = searchParams.get("pnr");

  //   console.log(lastName)
  //   console.log(pnr)
  if (!lastName || !pnr)
    NextResponse.json(
      { message: "lastName and pnr are required" },
      {
        status: 403,
      }
    );

  const formData = new URLSearchParams();
  formData.append("client_id", "cff-ticket-cheker");
  formData.append("client_secret", "80a7e5b5-d43c-4dfc-ba43-15472efb9646");
  formData.append("grant_type", "client_credentials");
  formData.append("scope", "openid");
  const tokenResponse = await fetch(process.env.OAUTH_SERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });
  //TODO cache this token
  const authToken = await tokenResponse.json();
  // console.log(authToken);
  if (!authToken || !authToken.access_token)
    return NextResponse.json(
      { message: "authentication failed" },
      {
        status: 403,
      }
    );
  const token = authToken.access_token;

  try {
    const res = await fetch(
      `${DATA_SOURCE_URL}?lastName=${lastName}&pnr=${pnr}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const tickets = await res.json();
    if (tickets.status == 200) {
      console.log("success getting tickets");
      const uuid = uuidv4();
      console.log("Generated UUID:", uuid);
      setOrUpdateSessionData(uuid, "tickets", tickets.tickets);
      tickets.sessionId = uuid;
      // console.log(tickets.tickets)
    }

    return NextResponse.json(tickets);

    //   console.log(tickets);
  } catch (e) {
    if (e) console.log(e);
    return NextResponse.json(
      { message: "error getting tickets" },
      {
        status: 403,
      }
    );
  }
}

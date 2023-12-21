"use client";

import { useState, useEffect } from "react";
import TicketResults from "../../../components/ticketResults.jsx";

export default function ViewTickets({ searchParams }) {
  const [tickets, setTicket] = useState([]);
  // console.log(router.query)
  // const { sessionId } = router.query;
  let { sessionId } = searchParams;
  // console.log(sessionId)

  useEffect(() => {
    // Fetching state from localStorage
    let storedState = localStorage.getItem("state");
    if (storedState) {
      const stateObject = JSON.parse(storedState);
      console.log(
        `comparing ${new Date().getTime()} with ${
          stateObject.timestamp
        } result ${new Date().getTime() < stateObject.timestamp}`
      );
      if (new Date().getTime() < stateObject.timestamp) {
        // Cache is still valid
        if (tickets.length == 0) {
          setTicket(stateObject.tickets);
          if (!sessionId) sessionId = stateObject.sessionId;
        }
      } else {
        // Cache has expired, remove it from localStorage
        localStorage.removeItem("state");
      }
    }
  }, []);

  
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TicketResults
        tickets={tickets.tickets}
        sessionId={sessionId}
      />
    </div>
  );
}

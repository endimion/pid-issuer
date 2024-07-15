"use client";

import { useEffect, useState } from "react";

export default function Polling({
  issuanceSession,
  issueCompleted,
  WEBSOCKET_SERVER_URL,
}) {
  const [sessionId, setSessionId] = useState(issuanceSession);
  const [polling, setPolling] = useState(true); // Polling status
  const pollingInterval = 5000; // Poll every 5 seconds

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    console.log("useEffect  polling.jsx")

    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || '/pid'; // Fallback to '' if not set
        console.log("baseURL " +baseUrl)
        const response = await fetch(`${baseUrl}/api/issueStatus`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sessionId })
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (isMounted) {
          // Check the result from the API and stop polling if a condition is met
          if (result.status === "success") {
            setPolling(false);
            issueCompleted();
          }
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
        }
      }
    };

    if (polling) {
      fetchData(); // Initial fetch
      const interval = setInterval(fetchData, pollingInterval);

      // Cleanup function to clear the interval and avoid memory leaks
      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }
  }, [polling, pollingInterval]);

  return <></>;
}

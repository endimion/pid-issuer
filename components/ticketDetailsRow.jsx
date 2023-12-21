"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TicketDetailRow({
  ticket,
  idx,
  backgroundColor,
  sessionId,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/tickets/issue?sessionId=${sessionId}&id=${idx}`);
  };

  const button = loading ? (
    <Button
      className="text-blue-600 border-blue-600"
      variant="disabled"
      onClick={onClick}
    >
      Loading...
    </Button>
  ) : ticket.issued ? (
    <Button
      className="text-green-600 border-green-600"
      variant="outline"
      style={{ width: "80px" }} // Adjust the width to your preference
      onClick={onClick}
    >
      Re-Issue
    </Button>
  ) : (
    <Button
      className="text-blue-600 border-blue-600"
      variant="outline"
      style={{ width: "80px" }} // Adjust the width to your preference
      onClick={onClick}
    >
      Issue
    </Button>
  );

  return (
    <div
      className={`flex flex-col md:flex-row items-center ${backgroundColor} px-4 py-3 rounded-md`}
      key={idx}
    >
      <div className="w-full md:w-1/5">
        <span className="font-medium text-gray-900">Departure Date</span>
        <p className="text-gray-700">{ticket.departureDate}</p>
      </div>
      <div className="w-full md:w-1/5 mt-4 md:mt-0">
        <span className="font-medium text-gray-900">Departure Port</span>
        <p className="text-gray-700">{ticket.departurePort}</p>
      </div>
      <div className="w-full md:w-1/5 mt-4 md:mt-0">
        <span className="font-medium text-gray-900">Arrival Port</span>
        <p className="text-gray-700">{ticket.arrivalPort}</p>
      </div>
      <div className="w-full md:w-1/5 mt-4 md:mt-0">
        <span className="font-medium text-gray-900">First Name</span>
        <p className="text-gray-700">{ticket.firstName}</p>
      </div>
      <div className="w-full md:w-1/5 mt-4 md:mt-0">
        <span className="font-medium text-gray-900">Last Name</span>
        <p className="text-gray-700">{ticket.lastName}</p>
      </div>
      <div className="w-full md:w-1/5 mt-4 md:mt-0 flex justify-center md:justify-start">
        {button}
      </div>
    </div>
  );
}

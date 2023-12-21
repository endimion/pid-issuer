"use client";

import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FindTicketsForm() {
  const [formData, setFormData] = useState({});
  const [ticketError, setTicketError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    //   console.log(name);
    //   console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here using formData
    // console.log("Form submitted with data:", formData);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cff?lastName=${formData.lastName}&pnr=${formData.pnr}`
      );
      const ticketsQueryResponse = await res.json();
      if (ticketsQueryResponse.status == 200) {
        console.log(ticketsQueryResponse);
        // store in cache the "issuance state of the ticket as well"
        ticketsQueryResponse.tickets = ticketsQueryResponse.tickets.map(
          (ticket) => {
            ticket["issued"] = false;
            return ticket;
          }
        );
        // console.log(`will cache teh tickets now.. `)
        // console.log(ticketsQueryResponse)
        const stateObject = {
          tickets: ticketsQueryResponse,
          sessionId: ticketsQueryResponse.sessionId,
          timestamp: new Date().getTime() + 3 * 60 * 1000,
        };
        localStorage.setItem("state", JSON.stringify(stateObject));
        //
        router.push(
          `/tickets/viewTickets?sessionId=${ticketsQueryResponse.sessionId}`
        );
      } else {
        setLoading(false);
        setTicketError(
          `Error fetching tickets for provided details. Please ensure they are correct and try again.`
        );
      }
    } catch (e) {
      // console.log(e);
      setLoading(false);
      setTicketError(
        `Error fetching tickets for provided details. Please try again later.`
      );
    }
  };

  let ticketErrorMessage = ticketError ? (
    <>
      <h3 className="m-8 text-1xl font-semibold text-amber-700 text-center">
        {ticketError}{" "}
      </h3>
    </>
  ) : (
    <></>
  );

  const mainContent = (
    <main>
      {ticketErrorMessage}

      <div className="flex-1 px-4 sm:px-6 md:px-8 bg-gray-100 dark:bg-gray-100">
        <form className="lg:mx-auto lg:w-2/3" onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block text-2xl font-medium text-black">
              Reservation Number
            </label>
            <Input
              className="mt-1 block w-full bg-white-100 dark:bg-white-100 text-xl"
              placeholder="Reservation Number"
              type="text"
              name="pnr"
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="mt-6">
            <label className="block text-2xl font-medium text-black">
              Last Name
            </label>
            <Input
              className="mt-1 block w-full bg-white-100 dark:bg-white-100 text-xl"
              placeholder="Last Name"
              type="text"
              name="lastName"
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-red-500 text-white text-xl" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </main>
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {!loading ? (
        mainContent
      ) : (
        <main>
          <div className="flex bg-gray-100 dark:bg-gray-100">
            <div className="flex-1">
              <div
                className="flex flex-col justify-center lg:w-4/6 pt-8"
                style={{ marginLeft: "8%" }}
              >
                <div className="text-center">
                  <div className="text-1xl font-semibold text-black">
                    Searching for tickets...
                  </div>
                  <div className="mt-4 border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

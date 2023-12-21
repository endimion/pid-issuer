import TicketDetailRow from "@/components/ticketDetailsRow";

export default function TicketResults({
  tickets,
  sessionId,
}) {
  const ticketsRows = [];
  // console.log(tickets);
  //   tickets.forEach((ticket) => {
  //     ticketsRows.push(<TicketDetailRow ticket={ticket} />);
  //   });
  if (tickets)
    tickets.forEach((t, index) => {
      const color = index % 2 == 0 ? "bg-gray-200" : "bg-white";
      ticketsRows.push(
        <TicketDetailRow
          ticket={t}
          idx={index}
          backgroundColor={color}
          sessionId={sessionId}
        />
      );
    });

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <main className="mt-4">
        <section className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-900" />
        </section>
        <div className="p-6 bg-gray-100">
          <div className="mt-6">
            {ticketsRows.length > 0 ? (
              ticketsRows
            ) : (
              <div className="flex justify-center items-center h-full">
                 <p className="text-center text-2xl font-bold">
                  No tickets found! Please search for your tickets using your
                  reservation details
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

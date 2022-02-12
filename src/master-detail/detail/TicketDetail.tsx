import { useParams } from "react-router";
import { Ticket } from "../../backend";
import { ErrorMessage } from "../List/ErrorMessage";
import { useTicket } from "./UseTicket";

function TicketForm({ ticket }: { ticket: Partial<Ticket> }) {
  return <div>{JSON.stringify(ticket)}</div>;
}

export function TicketDetail() {
  const params = useParams<{ id: string }>();
  const { data: ticket, isLoading, error } = useTicket(params?.id);
  if (params.id === undefined) {
    const error = new Error("No id");
    return <ErrorMessage error={error} />;
  }

  return ticket ? (
    <TicketForm ticket={ticket} />
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <ErrorMessage error={error as Error} />
  );
}

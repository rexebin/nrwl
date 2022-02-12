import { useTickets } from "./UseTickets";
import { useEffect, useState } from "react";
import { Ticket } from "../../../backend";
import { filters } from "../FilterBar";

export function useFilteredTickets({ filter }: { filter: string }) {
  const { data: tickets, isLoading, error } = useTickets();
  const [filteredTicket, setFilteredTicket] = useState<Ticket[] | undefined>();
  useEffect(() => {
    if (tickets) {
      setFilteredTicket(
        tickets.filter((ticket) => {
          switch (filter) {
            case filters.all:
              return true;
            case filters.completed:
              return ticket.completed;
            case filters.pending:
              return !ticket.completed;
            case filters.assigned:
              return ticket.assigneeId !== null;
            case filters.unassigned:
              return ticket.assigneeId === null;
            default:
              return false;
          }
        })
      );
    }
  }, [tickets, filter]);

  return {
    tickets: filteredTicket,
    isLoading,
    error,
  };
}

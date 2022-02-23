import { useTickets } from "./UseTickets";
import { useEffect, useState } from "react";
import { Ticket } from "../../../backend";
import { filters } from "../FilterBar";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";

export function useFilteredTickets({ filter }: { filter: string }) {
  const { data: tickets, isLoading, error } = useTickets();
  const [searchParams] = useSearchParams();

  const debouncedFilter = useDebounce(searchParams, 500);

  const [filteredTicket, setFilteredTicket] = useState<Ticket[] | undefined>();

  useEffect(() => {
    if (tickets) {
      let filteredTickets = tickets.filter((ticket) => {
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
      });
      const searchText = debouncedFilter.get("search");
      if (searchText) {
        filteredTickets = filteredTickets.filter((ticket) => {
          return ticket.description
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });
      }
      setFilteredTicket(filteredTickets);
    }
  }, [tickets, debouncedFilter, filter]);

  return {
    tickets: filteredTicket,
    isLoading,
    error,
  };
}

import { Grid, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTickets } from "./useTickets";
import { TicketCard } from "../detail/Ticket";
import { TicketSkeletonList } from "./TicketSkeledonList";
import { ErrorMessage } from "./ErrorMessage";
import { useParams } from "react-router";
import { FilterBar, filters } from "./FilterBar";
import styled from "@emotion/styled";
import { Ticket } from "../../backend";

const StyledListContainer = styled(Grid)`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

const StyledGridContainer = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
`;

export function TicketList() {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [filter, setFilter] = useState(filters.all);
  const params = useParams();
  useEffect(() => {
    if (params?.id !== undefined && params?.id !== "new") {
      setSelectedTicket(+params?.id);
      return;
    }
    setSelectedTicket(null);
  }, [params]);
  const { data: tickets, isLoading, error } = useTickets();
  const [filteredTicket, setFilteredTicket] = useState<Ticket[]>([]);
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
  return (
    <StyledListContainer container>
      <Grid item xs={12}>
        <FilterBar filter={filter} setFilter={setFilter} />
      </Grid>
      <StyledGridContainer>
        {tickets ? (
          <List sx={{ width: "100%" }}>
            {filteredTicket.map((t) => (
              <ListItem key={t.id}>
                <TicketCard
                  key={JSON.stringify(t)}
                  ticket={t}
                  isSelected={
                    selectedTicket !== null && +selectedTicket === +t.id
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : isLoading ? (
          <TicketSkeletonList />
        ) : (
          <ErrorMessage error={error as Error} />
        )}
      </StyledGridContainer>
    </StyledListContainer>
  );
}

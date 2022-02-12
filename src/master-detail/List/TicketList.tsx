import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useTickets } from "./useTickets";
import { TicketCard } from "../detail/Ticket";
import { TicketSkeletonList } from "./TicketSkeledonList";
import { ErrorMessage } from "./ErrorMessage";

export function TicketList() {
  const theme = useTheme();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: tickets, isLoading, error } = useTickets();
  return isMobile ? null : (
    <Container>
      {tickets ? (
        <Grid container spacing={2}>
          {tickets.map((t) => (
            <Grid item xs={12}>
              <TicketCard
                key={JSON.stringify(t)}
                ticket={t}
                isSelected={
                  selectedTicket !== null && +selectedTicket === +t.id
                }
                setSelectedTicket={setSelectedTicket}
              />
            </Grid>
          ))}
        </Grid>
      ) : isLoading ? (
        <TicketSkeletonList />
      ) : (
        <ErrorMessage error={error as Error} />
      )}
    </Container>
  );
}

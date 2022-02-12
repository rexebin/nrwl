import { Ticket } from "../../backend";
import { useSelectedTicket } from "./hooks/UseSelectedTicket";
import { List, ListItem } from "@mui/material";
import { TicketCard } from "../detail/TicketCard";
import React from "react";

export function TicketListView({ tickets }: { tickets: Ticket[] }) {
  const { selectedTicket } = useSelectedTicket();
  return (
    <List sx={{ width: "100%" }}>
      {tickets.map((t) => (
        <ListItem key={t.id}>
          <TicketCard
            key={JSON.stringify(t)}
            ticket={t}
            isSelected={selectedTicket !== null && +selectedTicket === +t.id}
          />
        </ListItem>
      ))}
    </List>
  );
}

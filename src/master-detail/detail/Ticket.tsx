import { PropsWithChildren } from "react";
import { Ticket } from "../../backend";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import { MdEdit } from "react-icons/md";

interface TicketProps {
  ticket: Ticket;
  setSelectedTicket: (id: number | null) => void;
  isSelected: boolean;
}

export function TicketCard({
  ticket,
  isSelected = false,
  setSelectedTicket,
  children,
}: PropsWithChildren<TicketProps>) {
  const navigate = useNavigate();
  const handleClick = () => {
    setSelectedTicket(ticket.id);
    navigate(`${ticket.id}`);
  };
  return (
    <Card>
      <CardContent>
        <CardHeader
          title={ticket.description}
          action={
            <IconButton aria-label="settings" onClick={() => handleClick()}>
              <MdEdit />
            </IconButton>
          }
        />
        <Grid container spacing={2} sx={{ paddingLeft: "15px" }}>
          <Grid item>
            <Chip
              label={ticket.completed ? "Completed" : "Pending"}
              color={"primary"}
            />
          </Grid>
          <Grid item>
            <Chip
              label={ticket.assigneeId ? `${ticket.assigneeId}` : "Assign"}
              color={"secondary"}
            />
          </Grid>
        </Grid>
        {children}
      </CardContent>
    </Card>
  );
}

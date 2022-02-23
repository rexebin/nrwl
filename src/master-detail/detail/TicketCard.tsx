import { PropsWithChildren, useMemo } from "react";
import { Ticket } from "../../backend";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { selectedBackground } from "../../theme";
import { useUserIdNameDict } from "./hooks/UseUserIdNameDict";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useToggleComplete } from "./hooks/UseToggleComplete";

interface TicketProps {
  ticket: Ticket;

  isSelected: boolean;
}

export function TicketCard({
  ticket,
  isSelected = false,
  children,
}: PropsWithChildren<TicketProps>) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ticket.id}`);
  };
  const SelectableCard = styled(Box)`
    background-color: ${isSelected ? selectedBackground : "transparent"};
    border-bottom: thin solid lightgray;
    cursor: pointer;
    width: 100%;
    padding: 30px;
  `;
  const { userLabels, isLoading } = useUserIdNameDict();
  const assignee = useMemo(() => {
    if (ticket.assigneeId) {
      return userLabels[ticket.assigneeId];
    }
  }, [ticket.assigneeId, userLabels]);

  const { mutate, isLoading: isToggleCompleteLoading } = useToggleComplete();

  function toggleCompleted(ticket: Ticket, event: MouseEvent) {
    event.stopPropagation();
    mutate(ticket.id);
  }

  return (
    <SelectableCard onClick={() => handleClick()}>
      <Typography variant="h5">{ticket.description}</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Chip
            label={`Status: ${ticket.completed ? "Completed" : "Pending"}`}
            color={"primary"}
            onClick={(e) => toggleCompleted(ticket, e as unknown as MouseEvent)}
          />
          {isToggleCompleteLoading !== undefined ? (
            <LoadingSpinner isLoading={isToggleCompleteLoading} />
          ) : null}
        </Grid>
        <Grid item>
          <Chip
            label={
              isLoading
                ? "Loading..."
                : ticket.assigneeId
                ? `Assigned: ${assignee}`
                : "UnAssign"
            }
            color={"secondary"}
          />
        </Grid>
      </Grid>
      {children}
    </SelectableCard>
  );
}

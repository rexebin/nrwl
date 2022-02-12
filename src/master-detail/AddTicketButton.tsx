import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export function AddTicketButton() {
  const navigate = useNavigate();
  const addTicket = () => {
    navigate("/tickets/new");
  };
  return (
    <Button color={"primary"} onClick={() => addTicket()}>
      New Ticket
    </Button>
  );
}

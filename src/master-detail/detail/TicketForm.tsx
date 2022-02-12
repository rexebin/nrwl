import { Ticket } from "../../backend";
import { Container, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { HfTextField } from "../../components/HfTextField";
import { HfSwitch } from "../../components/HfSwitch";
import { UserSelector } from "./hooks/UserSelector";
import { FormActionBar } from "./FormActionBar";
import { useSaveTicket } from "./hooks/UseSaveTicket";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function TicketForm({ ticket }: { ticket: Partial<Ticket> }) {
  const formContext = useForm<Ticket>({
    defaultValues: { ...ticket },
  });
  const { mutate, data, isLoading, isError, error, isSuccess } =
    useSaveTicket();
  const submit = (ticket: Ticket) => {
    mutate({ ticket, id: `${ticket.id ?? "new"}` });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && data?.id) {
      navigate(`/tickets/${data.id}`);
    }
  }, [isSuccess, data, navigate]);

  const {
    handleSubmit,
    formState: { errors },
  } = formContext;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(submit)(e);
      }}
    >
      <Container>
        <HfTextField
          formContext={formContext}
          name={"id"}
          sx={{ display: "none" }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HfTextField
              formContext={formContext}
              name={"description"}
              label={"Description"}
              multiline={true}
              minRows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <UserSelector
              formContext={formContext}
              name={"assigneeId"}
              label={"Assignee"}
            />
          </Grid>
          <Grid item xs={12}>
            <HfSwitch
              formContext={formContext}
              name={"completed"}
              label={"Completed"}
            />
          </Grid>
        </Grid>
      </Container>
      <Container>
        {isError ? <ErrorMessage error={error as Error} /> : null}
      </Container>
      <FormActionBar isLoading={isLoading} />
    </form>
  );
}

import { useParams } from "react-router";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useTicket } from "./hooks/UseTicket";
import { TicketForm } from "./TicketForm";
import styled from "@emotion/styled";
import { Ticket } from "../../backend";
import React from "react";
import { FormSkeleton } from "./FormSkeleton";
import { TicketFormContainer } from "./TicketFormContainer";

const DetailGridContainer = styled.div`
  flex: 1 1 auto;
  width: 50%;
  min-width: 375px;
  border-left: thin solid lightgray;
`;

export function TicketDetail() {
  const params = useParams<{ id: string }>();
  const { data: ticket, isLoading, error } = useTicket(params?.id);
  if (params.id === undefined) {
    const error = new Error("No id");
    return <ErrorMessage error={error} />;
  }

  return (
    <DetailGridContainer>
      <TicketFormContainer>
        {ticket ? (
          <TicketForm ticket={ticket as Ticket} key={JSON.stringify(ticket)} />
        ) : isLoading ? (
          <FormSkeleton />
        ) : (
          <ErrorMessage error={error as Error} />
        )}
      </TicketFormContainer>
    </DetailGridContainer>
  );
}

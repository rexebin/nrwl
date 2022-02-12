import { PropsWithChildren } from "react";
import { FormTitleBar } from "./FormTitleBar";
import { Container } from "@mui/material";
import styled from "@emotion/styled";

const StyledFormContainer = styled.div`
  padding-top: 24px;
`;

export function TicketFormContainer({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <FormTitleBar />
      <Container>
        <StyledFormContainer>{children}</StyledFormContainer>
      </Container>
    </>
  );
}

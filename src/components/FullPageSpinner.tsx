import React, { PropsWithChildren } from "react";

import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

const StyledFullPageSpinner = styled.div({
  fontSize: "4em",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export function FullPageSpinner({ children }: PropsWithChildren<unknown>) {
  return (
    <StyledFullPageSpinner>
      <CircularProgress />
      {children}
    </StyledFullPageSpinner>
  );
}

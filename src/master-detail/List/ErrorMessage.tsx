import React from "react";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export function ErrorMessage({ error }: { error: Error }) {
  return <StyledContainer>{error && error.message}</StyledContainer>;
}

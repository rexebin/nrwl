import React, { PropsWithChildren } from "react";
import { Route, Routes } from "react-router";
import styled from "@emotion/styled";

const DetailGridContainer = styled.div`
  flex: 1 1 auto;
  width: 50%;
  min-width: 375px;
  border-left: thin solid lightgray;
`;

export function DetailContainer({ children }: PropsWithChildren<unknown>) {
  return (
    <Routes>
      <Route
        path={`:id`}
        element={<DetailGridContainer>{children}</DetailGridContainer>}
      />
    </Routes>
  );
}

import React from "react";
import { TicketMasterDetail } from "../master-detail/TicketMasterDetail";
import { Navigate, Route, Routes } from "react-router";
import styled from "@emotion/styled";
import { TicketDetail } from "../master-detail/detail/TicketDetail";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

export function App() {
  return (
    <StyledContainer>
      <Routes>
        <Route path="/" element={<Navigate to={"/tickets"} replace />} />
        <Route path={"tickets"} element={<TicketMasterDetail />}>
          <Route path={":id"} element={<TicketDetail />} />
        </Route>
      </Routes>
    </StyledContainer>
  );
}

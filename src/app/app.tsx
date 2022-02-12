import React from "react";

import "./app.css";
import { TicketMasterDetail } from "../master-detail/TicketMasterDetail";
import { Navigate, Route, Routes } from "react-router";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  height: 100vh;
`;

export function App() {
  return (
    <StyledContainer>
      <Routes>
        <Route path="/" element={<Navigate to={"/tickets"} replace />} />
        <Route path={"/tickets/*"} element={<TicketMasterDetail />} />
      </Routes>
    </StyledContainer>
  );
}

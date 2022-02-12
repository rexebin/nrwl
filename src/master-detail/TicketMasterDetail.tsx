import { epicTitleHeight, MasterDetailTitleBar } from "./MasterDetailTitleBar";
import styled from "@emotion/styled";
import { DetailContainer } from "./DetailContainer";
import { TicketList } from "./List/TicketList";

import { Container } from "@mui/material";
import { TicketDetail } from "./detail/TicketDetail";
import { Ticket } from "../backend";
import { useState } from "react";

export const MasterDetailContentContainer = styled(Container)`
  height: calc(100% - ${epicTitleHeight});
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row;
`;

export const ListContainer = styled(Container)`
  display: flex;
  flex-grow: 1;
  min-width: 45%;
  padding: 20px;
  height: 100%;
  //border-right: thin solid lightgray;
  overflow: auto;
`;

export function TicketMasterDetail() {
  return (
    <>
      <MasterDetailTitleBar title={"Tickets"} />
      <MasterDetailContentContainer>
        <ListContainer>
          <TicketList />
        </ListContainer>
        <DetailContainer>
          <TicketDetail />
        </DetailContainer>
      </MasterDetailContentContainer>
    </>
  );
}

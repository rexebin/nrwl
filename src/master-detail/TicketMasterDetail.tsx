import { epicTitleHeight, MasterDetailTitleBar } from "./MasterDetailTitleBar";
import styled from "@emotion/styled";
import { TicketList } from "./List/TicketList";

import { Outlet } from "react-router-dom";
import { AddTicketButton } from "./AddTicketButton";
import React from "react";

export const MasterDetailContentContainer = styled.div`
  height: calc(100% - ${epicTitleHeight});
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-grow: 1;
  min-width: 50%;
  height: 100%;
`;

export function TicketMasterDetail() {
  return (
    <>
      <MasterDetailTitleBar title={"Tickets"}>
        <AddTicketButton />
      </MasterDetailTitleBar>
      <MasterDetailContentContainer>
        <ListContainer>
          <TicketList />
        </ListContainer>
        <Outlet />
      </MasterDetailContentContainer>
    </>
  );
}

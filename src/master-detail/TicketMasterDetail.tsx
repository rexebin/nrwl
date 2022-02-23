import { epicTitleHeight, MasterDetailTitleBar } from "./MasterDetailTitleBar";
import styled from "@emotion/styled";
import { TicketList } from "./list/TicketList";

import { Outlet } from "react-router-dom";
import { AddTicketButton } from "./actions/AddTicketButton";
import React from "react";
import { SearchBox } from "./actions/SearchBox";

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
        <SearchBox />
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

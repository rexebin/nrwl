import {epicTitleHeight, MasterDetailTitleBar} from "./MasterDetailTitleBar";
import styled from "@emotion/styled";
import {DetailContainer} from "./DetailContainer";
import {TicketList} from "./List/TicketList";
import {TicketDetail} from "./detail/TicketDetail";

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
  padding: 20px 0 20px 0;
  height: 100%;
  //border-right: thin solid lightgray;
  overflow: auto;
`;

export function TicketMasterDetail() {
    return (
        <>
            <MasterDetailTitleBar title={"Tickets"}/>
            <MasterDetailContentContainer>
                <ListContainer>
                    <TicketList/>
                </ListContainer>
                <DetailContainer>
                    <TicketDetail/>
                </DetailContainer>
            </MasterDetailContentContainer>
        </>
    );
}

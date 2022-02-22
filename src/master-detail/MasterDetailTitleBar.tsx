import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { Typography } from "@mui/material";

export const epicTitleHeight = "60px";

const TicketsTitleBar = styled.div`
  height: ${epicTitleHeight};
  padding: 0 20px 0 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  border-bottom: solid thin #babfc7;
`;

const Spacer = styled.div`
  display: flex;
  flex-grow: 1;
`;

export function MasterDetailTitleBar({
  title,
  children,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <TicketsTitleBar>
      {title ? (
        <Typography variant={"h6"} data-testid={"header-title"}>
          {title}
        </Typography>
      ) : null}
      <Spacer />
      {children}
    </TicketsTitleBar>
  );
}

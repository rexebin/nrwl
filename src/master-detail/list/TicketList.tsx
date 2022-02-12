import { Grid } from "@mui/material";
import React, { useState } from "react";
import { TicketSkeletonList } from "./TicketSkeledonList";
import { ErrorMessage } from "../../components/ErrorMessage";
import { FilterBar, filters } from "./FilterBar";
import styled from "@emotion/styled";
import { useFilteredTickets } from "./hooks/UseFilteredTickets";
import { TicketListView } from "./TicketListView";

const StyledListContainer = styled(Grid)`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

const StyledGridContainer = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
`;

export function TicketList() {
  const [filter, setFilter] = useState(filters.all);
  const { tickets, error, isLoading } = useFilteredTickets({ filter });
  return (
    <StyledListContainer container>
      <Grid item xs={12}>
        <FilterBar filter={filter} setFilter={setFilter} />
      </Grid>
      <StyledGridContainer>
        {tickets ? (
          <TicketListView tickets={tickets} />
        ) : isLoading ? (
          <TicketSkeletonList />
        ) : (
          <ErrorMessage error={error as Error} />
        )}
      </StyledGridContainer>
    </StyledListContainer>
  );
}

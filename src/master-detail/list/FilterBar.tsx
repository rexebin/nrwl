import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem;
  height: 60px;
  border-bottom: solid thin lightgray;
`;

export const filters = {
  all: "all",
  completed: "completed",
  pending: "pending",
  assigned: "assigned",
  unassigned: "unassigned",
};

export function FilterBar({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) {
  const handleFilter = (
    event: React.MouseEvent<HTMLElement>,
    filter: string
  ) => {
    setFilter(filter);
  };
  return (
    <StyledContainer>
      <ToggleButtonGroup exclusive value={filter} onChange={handleFilter}>
        <ToggleButton value={filters.all}>All</ToggleButton>
        <ToggleButton value={filters.completed}>Completed</ToggleButton>
        <ToggleButton value={filters.pending}>Pending</ToggleButton>
        <ToggleButton value={filters.assigned}>Assigned</ToggleButton>
        <ToggleButton value={filters.unassigned}>Unassigned</ToggleButton>
      </ToggleButtonGroup>
    </StyledContainer>
  );
}

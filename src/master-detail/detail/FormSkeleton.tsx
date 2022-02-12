import { Container, List, ListItem, Skeleton } from "@mui/material";
import React from "react";

export function FormSkeleton() {
  return (
    <Container>
      <List>
        <ListItem>
          <Skeleton width={"100%"} height={"300px"} />
        </ListItem>
        <ListItem>
          <Skeleton width={"100%"} height={"60px"} />
        </ListItem>
        <ListItem>
          <Skeleton width={"100px"} height={"60px"} />
        </ListItem>
      </List>
    </Container>
  );
}

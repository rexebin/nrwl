import { Container, Grid, Skeleton } from "@mui/material";
import React from "react";

export function FormSkeleton() {
  return (
    <form>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={100} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={40} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width={"100px"} height={40} />
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}

import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";

export function TicketSkeletonList() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={12} key={i}>
          <Card>
            <CardContent>
              <Typography variant="h2">
                <Skeleton />
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Skeleton variant="rectangular" width={80} height={30} />
                </Grid>
                <Grid item>
                  <Skeleton variant="rectangular" width={80} height={30} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

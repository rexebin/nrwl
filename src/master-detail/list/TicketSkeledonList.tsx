import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

export function TicketSkeletonList() {
  return (
    <List sx={{ width: "100%" }}>
      {[1, 2, 3].map((i) => (
        <ListItem key={i}>
          <Card sx={{ width: "100%" }}>
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
        </ListItem>
      ))}
    </List>
  );
}

import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "./styles";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function Loading() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" className={classes.media} />

      <Skeleton className={classes.details} animation="wave" variant="rect" />
      <Skeleton
        className={classes.title}
        animation="wave"
        variant="text"
        component="h1"
      />
      <CardContent>
        <Skeleton animation="wave" variant="rect" component="h2" />
      </CardContent>
    </Card>
  );
}

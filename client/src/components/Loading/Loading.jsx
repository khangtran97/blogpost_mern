import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './styles';
import { Card, CardContent, Typography } from '@material-ui/core';

export default function Loading() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Skeleton variant="rect" className={classes.media} />

      <Skeleton className={classes.details} variant="rect" />
      <Skeleton className={classes.title} variant="text" component="h1" />
      <CardContent>
        <Skeleton variant="rect" component="h2" />
      </CardContent>
    </Card>
  );
}

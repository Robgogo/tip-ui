import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAPI } from './api';

const numIncidentsUrl = 'http://localhost:8005/api/kpi/num_incident/2018/01/';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const Low = ({ className, ...rest }) => {
  const classes = useStyles();
  const { loading, incidents } = useAPI(numIncidentsUrl);
  // console.log(incidents);
  let low = '';
  if (loading === false) {
    low = incidents.low;
  } else {
    low = <CircularProgress />;
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Low Priority Raised
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {low}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Low.propTypes = {
  className: PropTypes.string
};

export default Low;

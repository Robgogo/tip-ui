/* eslint-disable react/jsx-indent */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoneyIcon from '@material-ui/icons/Money';
import CircularProgress from '@material-ui/core/CircularProgress';

import { round } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  positiveDifference: {
    color: colors.green[10000],
    marginRight: theme.spacing(1)
  },
  negativeDifference: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const IncidentNumber = ({ className, ...rest }) => {
  const classes = useStyles();
  // const { loading, incidents } = useAPI(numIncidentsUrl);
  const { loading } = rest;
  // const keys = Object.keys(incidents);
  let title = '';
  if (rest.priority === 'backlog') {
    title = `INCIDENTS in ${rest.priority.toUpperCase()}`;
  } else {
    title = `Severity ${rest.priority.toUpperCase()}`;
  }

  let incident = '';
  let difference = 0;
  if (loading === 'false') {
    // if (keys.includes(rest.priority)) {
    incident = rest.incident.incident;
    difference = rest.incident.difference;
    // }
  } else {
    incident = <CircularProgress />;
  }

  let differenceIndicator = null;
  if (Math.sign(difference) === -1) {
    differenceIndicator = (
      <Box mt={2} display="flex" alignItems="center">
        <ArrowDownwardIcon className={classes.positiveDifference} />
        <Typography className={classes.positiveDifference} variant="body2">
          { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
          {round(Math.abs(difference), 2)}%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box>
    );
  } else {
    differenceIndicator = (
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.negativeDifference} />
          <Typography className={classes.negativeDifference} variant="body2">
            { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
            {round(difference, 2)}%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
    );
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              { title }
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {incident}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        {differenceIndicator}
      </CardContent>
    </Card>
  );
};

IncidentNumber.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.string
};

export default IncidentNumber;

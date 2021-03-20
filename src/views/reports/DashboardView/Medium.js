import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAPI } from './api';

const num_incidents_url = 'http://localhost:8005/api/kpi/num_incident/2018/01/';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const Medium = ({ className, ...rest }) => {
  const classes = useStyles();
  const { loading, incidents } = useAPI(num_incidents_url);
  // console.log(incidents);
  let medium = '';
  if(loading===false){
    medium  = incidents.medium;
  }
  else{
    medium = <CircularProgress color="primary" />;
  }
 

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Medium Priority Raised
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {medium}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={75.5} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

Medium.propTypes = {
  className: PropTypes.string
};

export default Medium;

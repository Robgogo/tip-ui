/* eslint-disable max-len */
import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import TabletIcon from '@material-ui/icons/Tablet';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAPI } from './api';

const slaUrl = 'http://localhost:8005/api/kpi/sla/2018/01/';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { loading, incidents } = useAPI(slaUrl);
  // console.log(incidents);
  const keys = Object.keys(incidents);
  // const inSla = keys.map(key => {
  //   return incidents[key].in_sla;
  // });

  // const outSla = keys.map(key => {
  //   return incidents[key].out_sla;
  // });

  const percentages = keys.map((key) => {
    let inPercentage = (incidents[key].in_sla / (incidents[key].in_sla + incidents[key].out_sla)) * 100;
    inPercentage = Number(inPercentage).toFixed(2);
    let outPercentage = 100 - inPercentage;
    outPercentage = Number(outPercentage).toFixed(2);
    return [inPercentage, outPercentage];
  });
  const percentagesCritical = percentages[3];
  const percentagesHigh = percentages[2];
  const percentagesMedium = percentages[1];
  const percentagesLow = percentages[0];

  const dataCritical = {
    datasets: [
      {
        data: percentagesCritical,
        backgroundColor: [colors.indigo[500], colors.red[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Inside SLA', 'Outside SLA']
  };

  const dataHigh = {
    datasets: [
      {
        data: percentagesHigh,
        backgroundColor: [colors.indigo[500], colors.red[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Inside SLA', 'Outside SLA']
  };

  const dataMedium = {
    datasets: [
      {
        data: percentagesMedium,
        backgroundColor: [colors.indigo[500], colors.red[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Inside SLA', 'Outside SLA']
  };

  const dataLow = {
    datasets: [
      {
        data: percentagesLow,
        backgroundColor: [colors.indigo[500], colors.red[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Inside SLA', 'Outside SLA']
  };
  let data = [];
  const titlePie = `SLA ${rest.priority.toUpperCase()}`;
  if (rest.priority === 'critical') {
    data = dataCritical;
  } else if (rest.priority === 'high') {
    data = dataHigh;
  } else if (rest.priority === 'medium') {
    data = dataMedium;
  } else if (rest.priority === 'low') {
    data = dataLow;
  }

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Inside SLA',
      value: data.datasets[0].data ? data.datasets[0].data[0] : 0,
      icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Outside SLA',
      value: data.datasets[0].data ? data.datasets[0].data[1] : 0,
      icon: TabletIcon,
      color: colors.red[600]
    }
  ];

  let pie = null;
  if (loading) {
    pie = <CircularProgress />;
  } else {
    pie = (
      <>
        <CardContent>
          <Box height={300} position="relative">
            <Doughnut data={data} options={options} />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            { /* eslint-disable-next-line object-curly-newline */ }
            {devices.map(({ color, icon: Icon, title, value }) => (
              <Box key={title} p={1} textAlign="center">
                <Icon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="h2">
                  { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
                  {value}%
                </Typography>
                {/* <Typography style={{ color }} variant="h2">
                    {month}
                  </Typography> */}
              </Box>
            ))}
          </Box>
        </CardContent>
      </>
    );
  }

  return (
    // <div>
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={titlePie} />
      <Divider />
      { pie }
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;

import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAPI } from './api';
import { dev, prod } from '../../../Endpoints';

let availabilityUrl = '';
if (process.env.NODE_ENV === 'development') {
  availabilityUrl = `${dev.baseURL}${dev.availability}2018/`;
} else if (process.env.NODE_ENV === 'production') {
  availabilityUrl = `${prod.baseURL}${prod.availability}2018/`;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const Sales = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { loading, incidents } = useAPI(`${availabilityUrl}${rest.month}/`);
  // console.log(incidents);
  const keys = Object.keys(incidents);
  const availability = keys.map((key) => {
    return incidents[key].availability;
  });
  const unavailability = keys.map((key) => {
    return incidents[key].total_unavailable_time / 3600;
  });

  const data = {
    datasets: [
      {
        type: 'bar',
        backgroundColor: colors.indigo[500],
        data: availability,
        label: 'Availability(%)'
      },
      {
        type: 'line',
        // backgroundColor: colors.red[100],
        borderColor: colors.red[500],
        fill: false,
        pointBorderColor: 'white',
        pointBackgroundColor: 'black',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointRadius: 4,
        data: unavailability,
        label: 'Unavailable Time(hrs)'
      }
    ],
    labels: keys
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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
  let chart = null;
  if (loading) {
    chart = <CircularProgress />;
  } else {
    chart = (
      <>
        <CardContent>
          <Box height={400} position="relative">
            <Bar data={data} options={options} />
          </Box>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Overview
          </Button>
        </Box>
      </>
    );
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={(
          <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
            Last 7 days
          </Button>
        )}
        title="Latest Sales"
      />
      <Divider />
      {chart}
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;

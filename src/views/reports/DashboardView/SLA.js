/* eslint-disable no-unused-vars */
import React from 'react';
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

import { useAPI } from './api';

const slaUrl = 'http://localhost:8005/api/kpi/sla/2018/01/';

const useStyles = makeStyles(() => ({
  root: {}
}));

const SLA = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { loading, incidents } = useAPI(slaUrl);
  console.log(incidents);
  const keys = Object.keys(incidents);
  const inSla = keys.map((key) => {
    return incidents[key].in_sla;
  });

  const outSla = keys.map((key) => {
    return incidents[key].out_sla;
  });

  const percentages = keys.map((key) => {
    const inPercentage = (incidents[key].in_sla
        / (incidents[key].in_sla + incidents[key].out_sla))
      * 100;
    const outPercentage = 100 - inPercentage;
    return inPercentage;
  });

  const data = {
    datasets: [
      {
        fill: false,
        borderColor: colors.blue[500],
        pointRadius: 4,
        data: [percentages[0], 100, 100, 100],
        pointBorderColor: 'white',
        pointBackgroundColor: 'black',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        label: 'This month'
      },
      {
        fill: false,
        borderColor: colors.green[500],
        pointRadius: 4,
        data: [percentages[1], 100, 100, 100],
        pointBorderColor: 'white',
        pointBackgroundColor: 'black',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        label: 'This month'
      },
      {
        fill: false,
        borderColor: colors.yellow[500],
        pointRadius: 4,
        data: [percentages[2], 100, 100, 100],
        pointBorderColor: 'white',
        pointBackgroundColor: 'black',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        label: 'This month'
      },
      {
        fill: false,
        borderColor: colors.red[500],
        pointRadius: 4,
        data: [percentages[3], 100, 100, 100],
        pointBorderColor: 'white',
        pointBackgroundColor: 'black',
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        label: 'This month'
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr']
  };

  const options = {
    type: 'line',
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
    </Card>
  );
};

SLA.propTypes = {
  className: PropTypes.string
};

export default SLA;

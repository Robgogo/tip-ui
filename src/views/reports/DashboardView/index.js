import React, { useState } from 'react';
import {
  Container,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  Box,
  Button,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import * as Yup from 'yup';
import { Formik } from 'formik';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
// import SLA from './SLA';
import SLAPIE from './SLAPIE';
import IncidentNumber from './IncidentNumbers';
import NotFoundView from '../../errors/NotFoundView';
import { useAPI } from '../../../layouts/DashboardLayout/NavBar/UserAPI';
import { useAPI as useAPIIncident } from './api';
import YearMonthPicker from './MonthPicker';

const infoUrl = 'http://localhost:8005/api/admin/user/myinfo/';
const numIncidentsUrl = 'http://localhost:8005/api/kpi/num_incident/2018/';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  select: {
    minWidth: 120
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { user } = useAPI(infoUrl);
  const [month, setMonth] = useState(1);

  const handleMonthChange = (e) => {
    console.log("Target", e.target.value);
    setMonth(e.target.value);
  };
  console.log(`${numIncidentsUrl}${month}/`);
  const { loading, incidents } = useAPIIncident(`${numIncidentsUrl}${month}/`);
  const loggedIN = sessionStorage.getItem('Token');
  const hasPermission = user.role !== 3;
  const dasboard = !loggedIN || !hasPermission ? <NotFoundView /> : (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={3}
            sm={4}
            xl={3}
            xs={12}
          >
            <InputLabel id="month">Month</InputLabel>
            <Select
              className={classes.select}
              id="month"
              labelId="month"
              name="month"
              value={month}
              onChange={handleMonthChange}
            >
              <MenuItem value={1}>Jan</MenuItem>
              <MenuItem value={2}>Feb</MenuItem>
              <MenuItem value={3}>March</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={3}
            sm={4}
            xl={3}
            xs={12}
          >
            <IncidentNumber priority="critical" loading={loading} incident={incidents.critical} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={4}
            xl={3}
            xs={12}
          >
            <IncidentNumber priority="high" loading={loading} incident={incidents.high} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={4}
            xl={3}
            xs={12}
          >
            <IncidentNumber priority="medium" loading={loading} incident={incidents.medium} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={4}
            xl={3}
            xs={12}
          >
            <IncidentNumber priority="low" loading={loading} incident={incidents.low} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={4}
            xl={3}
            xs={12}
          >
            <IncidentNumber priority="backlog" loading={loading} incident={incidents.backlog} />
          </Grid>
          <Grid
            item
            lg={12}
            md={6}
            xl={3}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <SLAPIE priority="critical" />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <SLAPIE priority="high" />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <SLAPIE priority="medium" />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <SLAPIE priority="low" />
          </Grid>
          {/* <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );

  return (
    <>
      {dasboard}
    </>
  );
};

export default Dashboard;

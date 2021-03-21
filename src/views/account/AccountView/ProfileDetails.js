import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useAPI } from '../../../layouts/DashboardLayout/NavBar/UserAPI';
import { dev, prod } from '../../../Endpoints';

let infoUrl = '';
if (process.env.NODE_ENV === 'development') {
  infoUrl = `${dev.baseURL}${dev.userInfo}`;
} else if (process.env.NODE_ENV === 'production') {
  infoUrl = `${prod.baseURL}${prod.userInfo}`;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const { user } = useAPI(infoUrl);
  let role = '';
  if (user.role === 1) {
    role = 'Super User';
  } else if (user.role === 2) {
    role = 'Manager';
  } else {
    role = 'Employee';
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can not be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                // label="First name"
                name="first_name"
                required
                value={user.first_name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                // label="Last name"
                name="last_name"
                required
                value={user.last_name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                // label="Role"
                name="email"
                required
                value={user.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                // label="Email Address"
                name="email"
                required
                value={role}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;

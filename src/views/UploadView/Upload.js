import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles
} from '@material-ui/core';
import { dev, prod } from '../../Endpoints';

let incidentsUrl = '';
let criticalUrl = '';
if (process.env.NODE_ENV === 'development') {
  incidentsUrl = `${dev.baseURL}${dev.insertIncidents}`;
  criticalUrl = `${dev.baseURL}${dev.insertCritical}`;
} else if (process.env.NODE_ENV === 'production') {
  incidentsUrl = `${prod.baseURL}${prod.insertIncidents}`;
  criticalUrl = `${prod.baseURL}${prod.insertCritical}`;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const UploadView = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={{
          file: ''
        }}
        validationSchema={Yup.object().shape({
          file: Yup.mixed().required()
        })}
        onSubmit={async (values) => {
          console.log(values.file);
          const d = new FormData();
          d.append('file', values.file);
          console.log(d);
          const response = await fetch(incidentsUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              Authorization: `Token ${sessionStorage.getItem('Token')}`,
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: d
          });
          if (response.ok) {
            const res = response.json();
            console.log(res);
          }
        }}
      >
        {({
          handleBlur,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Card>
              <CardHeader
                subheader="Upload Monthly Incidents File"
                title="Upload File"
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
                    <input
                      type="file"
                      name="file"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        setFieldValue('file', event.currentTarget.files[0]);
                      }}
                    //   value={values.file}
                    />
                  </Grid>
                </Grid>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </form>
        )}
      </Formik>
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Formik
        initialValues={{
          file: ''
        }}
        validationSchema={Yup.object().shape({
          file: Yup.mixed().required()
        })}
        onSubmit={async (values) => {
          console.log(values);
          const d = new FormData();
          d.append('file', values.file);
          const response = await fetch(criticalUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              Authorization: `Token ${sessionStorage.getItem('Token')}`,
              'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: d
          });
          if (response.ok) {
            const res = response.json();
            console.log(res);
          }
        }}
      >
        {({
          handleBlur,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Card>
              <CardHeader
                subheader="Upload Critical Incidents File(critical incidents vs apps.ods)"
                title="Upload File"
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
                    <input
                      type="file"
                      name="file"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        setFieldValue('file', event.currentTarget.files[0]);
                      }}
                    //   value={values.file}
                    />
                  </Grid>
                </Grid>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </CardContent>
              <Divider />
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

UploadView.propTypes = {
  className: PropTypes.string
};

export default UploadView;

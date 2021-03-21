/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import Page from 'src/components/Page';
import { dev, prod } from '../../Endpoints';

let registerUrl = '';
if (process.env.NODE_ENV === 'development') {
  registerUrl = `${dev.baseURL}${dev.register}`;
} else if (process.env.NODE_ENV === 'production') {
  registerUrl = `${prod.baseURL}${prod.register}`;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  select: {
    minWidth: 120
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              username: '',
              first_name: '',
              last_name: '',
              password1: '',
              password2: '',
              role: ''
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                first_name: Yup.string().max(255).required('First name is required'),
                last_name: Yup.string().max(255).required('Last name is required'),
                username: Yup.string().max(255).required('Username is required'),
                password1: Yup.string().max(255).required('password is required'),
                password2: Yup.string().max(255).required('password is required'),
                role: Yup.string().required('Role is required')
              })
            }
            onSubmit={async (values, errors) => {
              const response = await fetch(registerUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
              });
              if (response.ok) {
                navigate('/app/dashboard');
              } else {
                const res = await response.json();
                console.log('Error while Registering', res);
                errors.setFieldError('email', res.email[0]);
                errors.setFieldError('password1', res.password1[0]);
                errors.setFieldError('email', res.password2[0]);
                navigate('/register', { replace: true });
              }
              // navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Add New User
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use the user's email to create new account, remember the password and give to the user!
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.first_name && errors.first_name)}
                  fullWidth
                  helperText={touched.first_name && errors.first_name}
                  label="First name"
                  margin="normal"
                  name="first_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.last_name && errors.last_name)}
                  fullWidth
                  helperText={touched.last_name && errors.last_name}
                  label="Last name"
                  margin="normal"
                  name="last_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address (@faculty.ie.edu)"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password1 && errors.password1)}
                  fullWidth
                  helperText={touched.password1 && errors.password1}
                  label="Password"
                  margin="normal"
                  name="password1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password1}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password2 && errors.password2)}
                  fullWidth
                  helperText={touched.password2 && errors.password2}
                  label="Repeat Password"
                  margin="normal"
                  name="password2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password2}
                  variant="outlined"
                />
                <InputLabel id="userRole">Role</InputLabel>
                <Select
                  className={classes.select}
                  id="role"
                  labelId="userRole"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={1}>Super User</MenuItem>
                  <MenuItem value={2}>Manager</MenuItem>
                  <MenuItem value={3}>Employee</MenuItem>
                </Select>
                {errors.color
                && touched.color
                && (
                <div className="input-feedback">
                  {errors.color}
                </div>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;

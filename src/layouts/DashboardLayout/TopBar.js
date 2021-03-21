import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  colors
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import Cookies from 'js-cookie';

import { dev, prod } from '../../Endpoints';

let logoutURL = '';
if (process.env.NODE_ENV === 'development') {
  logoutURL = `${dev.baseURL}${dev.logout}`;
} else if (process.env.NODE_ENV === 'production') {
  logoutURL = `${prod.baseURL}${prod.logout}`;
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: colors.red[1000]
  },
  avatar: {
    width: 60,
    height: 60
  },
  iberia: {
    backgroundColor: '#e80028'
  },
  login: {
    color: '#FFF'
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  let login = null;
  if (!sessionStorage.getItem('Token')) {
    login = (
      <RouterLink to="/login">
        <IconButton className={classes.login}>
          Login
        </IconButton>
      </RouterLink>
    );
  }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.iberia}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          {login}
          <IconButton
            onClick={async () => {
              const token = sessionStorage.getItem('Token');
              const csrf = Cookies.get('csrftoken');
              console.log(csrf);
              const response = await fetch(`${logoutURL}${token}/`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrf,
                },
                body: JSON.stringify({ key: token })
              });
              console.log('Got here');
              if (response.ok) {
                // const res = response.json();
                console.log('Removing');
                Cookies.remove('csrftoken');
                sessionStorage.removeItem('Token');
                navigate('/login');
              } else {
                console.log('Failed');
              }
            }}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;

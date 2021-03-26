import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Users as UsersIcon,
  User as UserIcon,
  FilePlus as FilePlusIcon
} from 'react-feather';
import NavItem from './NavItem';
import { dev, prod } from '../../../Endpoints';

import { useAPI } from './UserAPI';

let infoUrl = '';
let numIncidentsUrl = '';
if (process.env.NODE_ENV === 'development') {
  infoUrl = `${dev.baseURL}${dev.userInfo}`;
} else if (process.env.NODE_ENV === 'production') {
  infoUrl = `${prod.baseURL}${prod.userInfo}`;
}

const adminItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/register',
    icon: UsersIcon,
    title: 'Add User'
  },
  {
    href: '/app/upload',
    icon: FilePlusIcon,
    title: 'Upload Report'
  }
];

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  nav: {
    backgroundColor: '#ec918f'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  const { user } = useAPI(infoUrl);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  let content = null;
  if (user.role === 1) {
    content = (
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box p={2}>
          <List>
            {adminItems.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
        <Box flexGrow={1} />

      </Box>
    );
  } else {
    content = (
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Box p={2}>
          <List>
            {items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
        <Box flexGrow={1} />

      </Box>
    );
  }

  return (
    <>
      <Hidden lgUp>
        <Drawer
          className={classes.nav}
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          className={classes.nav}
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
          backgroundColor="#ec918f"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;

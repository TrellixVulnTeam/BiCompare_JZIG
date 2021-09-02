import {useEffect, useState} from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Amplify, { Auth } from 'aws-amplify';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import {createApiClient} from "../api";

const user = {
  avatar: '/static/images/avatars/neta.jpg',
  jobTitle: '',
  name: 'Neta Sharon'
};

// let items = [
//   {
//     href: '/app/dashboard',
//     icon: BarChartIcon,
//     title: 'Dashboard'
//   },
//   {
//     href: '/app/monthlySummary',
//     icon: UsersIcon,
//     title: 'Monthly summary'
//   },
//   // {
//   //   href: '/app/upload',
//   //   icon: ShoppingBagIcon,
//   //   title: 'Upload CSV'
//   // },
// ];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [items, setItems] = useState([
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: '/app/monthlySummary',
      icon: UsersIcon,
      title: 'Monthly summary'
    },
    // {
    //   href: '/app/upload',
    //   icon: ShoppingBagIcon,
    //   title: 'Upload CSV'
    // },
  ])

  const [isAdmin, setIsAdmin] = useState(false)


  const setUserPermissions = async (id)  =>{
    let apiClient = createApiClient();
    // let res = await apiClient.getUserData(id)
    const res = await Auth.currentUserInfo()
    console.log(res)
    // let res = 'ADMIN'
    console.log(res)
    if(res === 'ADMIN'){
      setIsAdmin(true)
      setItems([
        {
          href: '/app/dashboard',
          icon: BarChartIcon,
          title: 'Dashboard'
        },
        {
          href: '/app/monthlySummary',
          icon: UsersIcon,
          title: 'Monthly summary'
        },
        {
          href: '/app/upload',
          icon: ShoppingBagIcon,
          title: 'Upload CSV'
        },
      ])
    }
  }


  useEffect(async () => {
    await setUserPermissions('userId69')
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
      >
        <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              p: 2
            }}
        >
          <Avatar
              component={RouterLink}
              src={user.avatar}
              sx={{
                cursor: 'pointer',
                width: 64,
                height: 64
              }}
              to="/app/account"
          />
          <Typography
              color="textPrimary"
              variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
              color="textSecondary"
              variant="body2"
          >
            {user.jobTitle}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <List>
            {items.map((item) => (
                <NavItem
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    onClick
                />
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
  );

  return (
      <>
        <Hidden lgUp>
          <Drawer
              anchor="left"
              onClose={onMobileClose}
              open={openMobile}
              variant="temporary"
              PaperProps={{
                sx: {
                  width: 256
                }
              }}
          >
            {content}
          </Drawer>
        </Hidden>
        <Hidden lgDown>
          <Drawer
              anchor="left"
              open
              variant="persistent"
              PaperProps={{
                sx: {
                  width: 256,
                  top: 64,
                  height: 'calc(100% - 64px)'
                }
              }}
          >
            {content}
          </Drawer>
        </Hidden>
      </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;

/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
  Home,
  Favorite,
  Group, AccountCircle,
} from '@material-ui/icons';
import AddCardIcon from '@mui/icons-material/AddCard';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import RecentActors from '@material-ui/icons/RecentActors';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import parkeasy  from '../../assets/parkeasy.jpeg'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const style = {
  background: '#bdbdbd',
};

export default function NavigationBar(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });

  useEffect(async () => {

}, []);

 
  const onLogout = () => {
    navigate("/");
  };


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const owner = [
    {
      listIcon: <Home />,
      listText: 'Dashboard',
      listPath: '/owner/home',
    },
    {
      listIcon: <AddCardIcon />,
      listText: 'Parking Lot',
      listPath: '/owner/add-parkinglot',
    }
  ];

  const general = [
    {
      listIcon: <AccountCircle />,
      listText: 'Login',
      listPath: '/login',
    },
    {
      listIcon: <AccountCircle />,
      listText: 'Sign Up',
      listPath: '/user/register',
    },
  ];

  const user = [
    {
      listIcon: <Home />,
      listText: 'Dashboard',
      listPath: '/user/home',
    },
    {
      listIcon: <FormatListBulletedIcon />,
      listText: 'Bookings',
      listPath: '/user/bookings',
    }
  ];
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {props.type === 'owner' && owner.map((listItem, key) => (
          <ListItem button key={key} component={Link} to={listItem.listPath}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText className={classes.listItem} primary={listItem.listText} />
          </ListItem>
        ))}
        {props.type === 'user' && user.map((listItem, key) => (
          <ListItem button key={key} component={Link} to={listItem.listPath}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText className={classes.listItem} primary={listItem.listText} />
          </ListItem>
        ))}
        {props.type === 'signup' && general.map((listItem, key) => (
          <ListItem button key={key} component={Link} to={listItem.listPath}>
            <ListItemIcon className={classes.listItem}>{listItem.listIcon}</ListItemIcon>
            <ListItemText className={classes.listItem} primary={listItem.listText} />
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <>
      <div className={classes.root}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={style} position="static">
            <Toolbar style={{ display: 'flex', width: '100%' }}>
              <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="default" aria-label="menu">
                <MenuIcon />
              </IconButton>

              <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
                {list('left')}
              </Drawer>

              <Typography variant="h6" className={classes.title}>
                <img src={parkeasy} width="120" height="80" alt="" />
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton onClick={() => { onLogout(); }} aria-label="Log out">
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
     </div>
   </>
  );
}

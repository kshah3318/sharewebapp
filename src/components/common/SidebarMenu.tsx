import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';

const drawerWidth = 240;
const DrawerList = (
    <Box sx={{ width: drawerWidth }} role="presentation">
     <List>
        {[
          { text: 'Settings', icon: <SettingsIcon />, link: '/settings' },
          { text: 'Transactions', icon: <AccountBalanceIcon />, link: '/transactions' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
);

const SidebarMenu = () => {
    return(
         <Drawer
          variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
    >
      {DrawerList}
    </Drawer>
    );
};

export default SidebarMenu;

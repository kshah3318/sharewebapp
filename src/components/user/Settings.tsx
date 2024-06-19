import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import SidebarMenu from '../../components/common/SidebarMenu'// Adjust the path as needed
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

const Settings = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SidebarMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Your main content goes here */}
          <h1>Settings</h1>
        </Box>
      </Box>
      );
};    

export default Settings;
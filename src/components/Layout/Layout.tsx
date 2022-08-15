import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from 'components/Sidebar';
import menuItems from './menuItems';

const Layout = () => (
    <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar menuItems={menuItems} />
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                background: (theme) => theme.palette.background.secondary,
            }}
        >
            <Outlet />
        </Box>
    </Box>
);

export default Layout;

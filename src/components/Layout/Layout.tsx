import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from 'components/Navbar';
import menuItems from './menuItems';

const Layout = () => (
    <Box
        sx={(theme) => ({
            display: 'flex',
            flex: 1,
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        })}
    >
        <Navbar menuItems={menuItems} />
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

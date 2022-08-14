import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import NotFound from 'components/NotFound';
import Sidebar from 'components/Sidebar';
import Community from 'pages/Community';
import Devices from 'pages/Devices';
import Home from 'pages/Home';
import menuItems from './menuItems';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flex: 1 }}>
            <Sidebar menuItems={menuItems} />
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    background: (theme) => theme.palette.background.secondary,
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="devices" element={<Devices />} />
                    <Route path="community" element={<Community />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default Layout;

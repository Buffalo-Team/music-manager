import { Box } from '@mui/material';
import Sidebar from 'components/Sidebar';
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
            />
        </Box>
    );
};

export default Layout;

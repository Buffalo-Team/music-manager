import { Box } from '@mui/material';
import DevicesList from 'pages/Devices/components/DevicesList';
import AddDevice from './components/AddDevice';

const Devices = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                padding: (theme) => theme.spacing(2),
            }}
        >
            <AddDevice />
            <DevicesList />
        </Box>
    );
};

export default Devices;

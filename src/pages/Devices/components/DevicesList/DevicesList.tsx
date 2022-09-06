import { Box } from '@mui/material';
import DeviceCard from 'pages/Devices/components/DevicesList/DeviceCard';
import { Device } from 'types';

interface Props {
    devices: Device[];
    activeDevice: Device | null;
    onDeviceClick: (device: Device) => void;
}

const sort = (d1: Device, d2: Device): number =>
    new Date(d2?.updatedAt || 0).getTime() -
    new Date(d1?.updatedAt || 0).getTime();

const DevicesList = ({ devices, activeDevice, onDeviceClick }: Props) => (
    <Box
        component="ul"
        sx={(theme) => ({
            padding: 0,
            margin: 0,
            marginTop: 2,
            display: 'grid',
            gridAutoRows: '1fr',
            [theme.breakpoints.down('md')]: {
                gridTemplateColumns: '1fr',
            },
            [theme.breakpoints.up('md')]: {
                gridTemplateColumns: '1fr 1fr',
            },
            [theme.breakpoints.up('lg')]: {
                gridTemplateColumns: '1fr 1fr 1fr',
            },
            gap: 2,
        })}
    >
        {[...devices].sort(sort).map((device) => (
            <Box key={device.id} component="li" sx={{ listStyleType: 'none' }}>
                <DeviceCard
                    device={device}
                    onClick={onDeviceClick}
                    active={device.id === activeDevice?.id}
                />
            </Box>
        ))}
    </Box>
);

export default DevicesList;

import { Box, Typography } from '@mui/material';
import deviceIcons from 'pages/Devices/components/DeviceIcons';
import { DeviceType } from 'types';

interface Props {
    type: DeviceType;
    name: string;
}

const DeviceHeader = ({ type, name }: Props) => {
    const IconComponent = deviceIcons[type] || deviceIcons.unknown;
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <IconComponent
                sx={{
                    color: (theme) => theme.palette.grey[50],
                    width: (theme) => theme.spacing(4.5),
                    height: (theme) => theme.spacing(4.5),
                }}
            />
            <Typography sx={{ marginX: 2 }} variant="large">
                {name}
            </Typography>
        </Box>
    );
};

export default DeviceHeader;

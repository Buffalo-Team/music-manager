import { Box, Paper } from '@mui/material';
import DeviceCapacity from 'pages/Devices/components/DeviceCapacity';
import DeviceHeader from 'pages/Devices/components/DeviceHeader';
import MissingFilesWarning from 'pages/Devices/components/MissingFilesWarning';
import { Device } from 'types';

interface Props {
    device: Device;
    onClick: (device: Device) => void;
    active: boolean;
}

const DeviceCard = ({ device, onClick, active }: Props) => {
    const { type, name, allocatedMegabytes, capacityMegabytes, missingFiles } =
        device;
    return (
        <Paper
            elevation={0}
            sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingY: 1.8,
                paddingX: 2,
                height: '100%',
                boxSizing: 'border-box',
                cursor: 'pointer',
                '&:hover': {
                    border: `1px solid ${theme.palette.primary.main}`,
                },
                ...(active
                    ? {
                          border: `1px solid ${theme.palette.primary.main}`,
                      }
                    : {}),
            })}
            onClick={() => onClick(device)}
        >
            <Box>
                <DeviceHeader type={type} name={name} />
                <MissingFilesWarning missingFiles={missingFiles} />
            </Box>
            <DeviceCapacity
                allocatedMegabytes={allocatedMegabytes}
                capacityMegabytes={capacityMegabytes}
            />
        </Paper>
    );
};

export default DeviceCard;

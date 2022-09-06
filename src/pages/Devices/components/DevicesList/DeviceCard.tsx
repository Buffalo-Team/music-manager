import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography } from '@mui/material';
import deviceIcons from 'pages/Devices/components/DeviceIcons';
import DeviceCapacity from 'pages/Devices/components/DevicesList/DeviceCapacity';
import { Device } from 'types';

interface Props {
    device: Device;
}

const DeviceCard = ({
    device: { type, name, allocatedMegabytes, capacityMegabytes, missingFiles },
}: Props) => {
    const { t } = useTranslation();
    const IconComponent = deviceIcons[type] || deviceIcons.unknown;
    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingY: 1.8,
                paddingX: 2,
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IconComponent
                        sx={{
                            color: (theme) => theme.palette.text.secondary,
                            width: (theme) => theme.spacing(4),
                            height: (theme) => theme.spacing(4),
                        }}
                    />
                    <Typography sx={{ marginLeft: 2 }} variant="large">
                        {name}
                    </Typography>
                </Box>
                {!!missingFiles?.length && (
                    <Typography
                        sx={{
                            margin: 0,
                            marginTop: 1,
                            color: (theme) => theme.palette.warning.main,
                        }}
                        variant="regular"
                        component="p"
                    >
                        {t('NewFilesToDownload', {
                            count: missingFiles.length,
                        })}
                    </Typography>
                )}
            </Box>
            <DeviceCapacity
                allocatedMegabytes={allocatedMegabytes}
                capacityMegabytes={capacityMegabytes}
            />
        </Paper>
    );
};

export default DeviceCard;

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { useDeleteDeviceMutation } from 'app/api/devicesApiSlice';
import Loader from 'components/Loader';
import DeviceCapacity from 'pages/Devices/components/DeviceCapacity';
import DeviceHeader from 'pages/Devices/components/DeviceHeader';
import MissingFilesWarning from 'pages/Devices/components/MissingFilesWarning';
import { Device } from 'types';

interface Props {
    device: Device;
    onClose: () => void;
    onDelete: () => void;
    onDownload: () => void;
}

const ActionPanelContent = ({
    device: {
        id,
        type,
        name,
        allocatedMegabytes,
        capacityMegabytes,
        missingFiles,
    },
    onClose,
    onDelete,
    onDownload,
}: Props) => {
    const { t } = useTranslation();
    const [deleteDevice, { isLoading, isSuccess }] = useDeleteDeviceMutation();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            onDelete();
        }
    }, [isSuccess]);

    const handleDownloadMissingFiles = () => {
        console.log('Downloading files ....');
        onDownload();
    };

    const handleDeleteDevice = () => {
        deleteDevice({ id });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 2.5,
                }}
            >
                <DeviceHeader type={type} name={name} />
                <DeviceCapacity
                    allocatedMegabytes={allocatedMegabytes}
                    capacityMegabytes={capacityMegabytes}
                />
                <MissingFilesWarning missingFiles={missingFiles} />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleDownloadMissingFiles}
                    disabled={!missingFiles.length}
                    fullWidth
                >
                    {t('DownloadMissingFiles')}
                </Button>
            </Box>
            <Button
                color="warning"
                variant="contained"
                onClick={handleDeleteDevice}
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? <Loader /> : t('DeleteDevice')}
            </Button>
        </Box>
    );
};

export default ActionPanelContent;

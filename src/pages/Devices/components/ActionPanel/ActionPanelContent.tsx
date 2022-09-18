import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import {
    useDeleteDeviceMutation,
    useGetAllDevicesQuery,
} from 'app/api/devicesApiSlice';
import Loader from 'components/Loader';
import DeviceCapacity from 'pages/Devices/components/DeviceCapacity';
import DeviceHeader from 'pages/Devices/components/DeviceHeader';
import MissingFilesWarning from 'pages/Devices/components/MissingFilesWarning';
import { Device, ResponseStatus } from 'types';
import Styled from './ActionPanel.styled';
import useSnackbarMessages from './useSnackbarMessages';

interface Props {
    device: Device;
    onClose: () => void;
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
}: Props) => {
    const { t } = useTranslation();
    const [deleteDevice, { isLoading, isSuccess }] = useDeleteDeviceMutation();
    const { refetch: refetchDevices } = useGetAllDevicesQuery();
    const { showDeviceRemovalSuccessMessage, showDeviceRemovalErrorMessage } =
        useSnackbarMessages();

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    const handleDownloadMissingFiles = () => {
        console.log('Downloading files ....');
        refetchDevices();
    };

    const handleDeleteDevice = async () => {
        try {
            const response = await deleteDevice({ id }).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showDeviceRemovalSuccessMessage();
                refetchDevices();
            } else {
                showDeviceRemovalErrorMessage();
            }
        } catch (error) {
            showDeviceRemovalErrorMessage();
        }
    };

    return (
        <Styled.ActionPanelContentContainer>
            <Styled.ActionPanelContentTopWrapper>
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
                    {t('devices.downloadMissingFiles')}
                </Button>
            </Styled.ActionPanelContentTopWrapper>
            <Button
                color="error"
                variant="contained"
                onClick={handleDeleteDevice}
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? <Loader /> : t('devices.deleteDevice')}
            </Button>
        </Styled.ActionPanelContentContainer>
    );
};

export default ActionPanelContent;

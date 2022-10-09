import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { useDeleteDeviceMutation } from 'app/api/devicesApiSlice';
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

const getDownloadLink = (deviceId: string) =>
    `${process.env.REACT_APP_BASE_API_URL}/devices/${deviceId}/downloadMissingFiles`;

const ActionPanelContent = ({
    device: {
        id,
        type,
        name,
        allocatedMegabytes,
        capacityMegabytes,
        missingFilesCount,
    },
    onClose,
}: Props) => {
    const { t } = useTranslation();
    const [deleteDevice, { isLoading, isSuccess }] = useDeleteDeviceMutation();
    const { showDeviceRemovalSuccessMessage, showDeviceRemovalErrorMessage } =
        useSnackbarMessages();

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    const handleDeleteDevice = async () => {
        try {
            const response = await deleteDevice({ id }).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showDeviceRemovalSuccessMessage();
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
                {!!missingFilesCount && (
                    <MissingFilesWarning filesCount={missingFilesCount} />
                )}
                <Button
                    color="primary"
                    variant="contained"
                    disabled={!missingFilesCount}
                    fullWidth
                    href={getDownloadLink(id)}
                    download
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

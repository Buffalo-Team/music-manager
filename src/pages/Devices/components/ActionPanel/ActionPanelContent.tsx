import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import {
    useDeleteDeviceMutation,
    useMarkAsUpToDateMutation,
} from 'app/api/devicesApiSlice';
import Loader from 'components/Loader';
import useConfirmationModal from 'hooks/useConfirmationModal';
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
    const [
        markDeviceAsUpToDate,
        { isLoading: isMarkingUpToDate, isSuccess: isMarkingSuccess },
    ] = useMarkAsUpToDateMutation();
    const {
        showDeviceRemovalSuccessMessage,
        showDeviceRemovalErrorMessage,
        showDeviceMarkingUpToDateSuccessMessage,
        showDeviceMarkingUpToDateErrorMessage,
    } = useSnackbarMessages();
    const { openModal, closeModal } = useConfirmationModal();

    useEffect(() => {
        if (isSuccess || isMarkingSuccess) {
            onClose();
        }
    }, [isSuccess, isMarkingSuccess]);

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

    const handleMarkDeviceAsUpToDate = async () => {
        try {
            const response = await markDeviceAsUpToDate({ id }).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showDeviceMarkingUpToDateSuccessMessage();
                closeModal();
            } else {
                showDeviceMarkingUpToDateErrorMessage();
            }
        } catch (error) {
            showDeviceMarkingUpToDateErrorMessage();
        }
    };

    const handleUpToDateConfirmation = () => {
        openModal({
            message: t('devices.isYourDeviceUpToDate'),
            onConfirm: () => handleMarkDeviceAsUpToDate(),
        });
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
                    onClick={handleUpToDateConfirmation}
                >
                    {t('devices.downloadMissingFiles')}
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleMarkDeviceAsUpToDate}
                    fullWidth
                    disabled={!missingFilesCount || isMarkingUpToDate}
                >
                    {isMarkingUpToDate ? (
                        <Loader />
                    ) : (
                        t('devices.markAsUpToDate')
                    )}
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

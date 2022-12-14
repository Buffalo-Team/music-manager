import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import {
    useDeleteDeviceMutation,
    useMarkAsUpToDateMutation,
} from 'app/api/devicesApiSlice';
import { useDownloadMissingFilesMutation } from 'app/api/filesApiSlice';
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
    onEdit: () => void;
}

const ActionPanelContent = ({
    device: {
        id,
        type,
        name,
        allocatedMegabytes,
        capacityMegabytes,
        missingFilesCount,
        isSynchronizationNeeded,
    },
    onClose,
    onEdit,
}: Props) => {
    const { t } = useTranslation();
    const [deleteDevice, { isLoading, isSuccess }] = useDeleteDeviceMutation();
    const [
        markDeviceAsUpToDate,
        { isLoading: isMarkingUpToDate, isSuccess: isMarkingSuccess },
    ] = useMarkAsUpToDateMutation();
    const [downloadMissingFiles, { isLoading: isDownloading }] =
        useDownloadMissingFilesMutation();
    const {
        showDeviceRemovalSuccessMessage,
        showDeviceRemovalErrorMessage,
        showDeviceMarkingUpToDateSuccessMessage,
        showDeviceMarkingUpToDateErrorMessage,
        showDownloadErrorMessage,
    } = useSnackbarMessages();
    const { openModal, closeModal } = useConfirmationModal();
    const hasMissingFiles = !!missingFilesCount || isSynchronizationNeeded;

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

    const handleDownloadMissingFiles = async () => {
        try {
            const response = await downloadMissingFiles({
                deviceId: id,
            }).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                handleUpToDateConfirmation();
            } else {
                showDownloadErrorMessage();
            }
        } catch (error) {
            showDownloadErrorMessage();
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
                {hasMissingFiles && (
                    <MissingFilesWarning
                        filesCount={missingFilesCount}
                        fullSyncNeeded={isSynchronizationNeeded}
                    />
                )}
                <Button
                    color="primary"
                    variant="contained"
                    disabled={!hasMissingFiles || isDownloading}
                    fullWidth
                    onClick={handleDownloadMissingFiles}
                >
                    {isDownloading ? (
                        <Loader />
                    ) : (
                        t('devices.downloadMissingFiles')
                    )}
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleMarkDeviceAsUpToDate}
                    fullWidth
                    disabled={!hasMissingFiles}
                >
                    {isMarkingUpToDate ? (
                        <Loader />
                    ) : (
                        t('devices.markAsUpToDate')
                    )}
                </Button>
            </Styled.ActionPanelContentTopWrapper>
            <Styled.ActionPanelContentBottomActionsWrapper>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={onEdit}
                    fullWidth
                    disabled={isLoading}
                >
                    {t('devices.editDevice')}
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={handleDeleteDevice}
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : t('devices.deleteDevice')}
                </Button>
            </Styled.ActionPanelContentBottomActionsWrapper>
        </Styled.ActionPanelContentContainer>
    );
};

export default ActionPanelContent;

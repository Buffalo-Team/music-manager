import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditDeviceMutation } from 'app/api/devicesApiSlice';
import DeviceModalForm from 'pages/Devices/components/DeviceModalForm';
import { Device, DeviceRequestData, DeviceType, ResponseStatus } from 'types';
import useSnackbarMessages from './useSnackbarMessages';

interface Props {
    open: boolean;
    device?: Device;
    onClose: () => void;
}

const EditDeviceModal = ({ open, device, onClose }: Props) => {
    const { t } = useTranslation();
    const [requestEditDevice, { isLoading, isSuccess }] =
        useEditDeviceMutation();
    const { showEditDeviceSuccessMessage, showEditDeviceErrorMessage } =
        useSnackbarMessages();

    const handleSubmit = async (values: DeviceRequestData) => {
        try {
            const data = {
                ...values,
                id: device?.id || '',
            };
            const response = await requestEditDevice(data).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showEditDeviceSuccessMessage();
            } else {
                showEditDeviceErrorMessage();
            }
        } catch (error) {
            showEditDeviceErrorMessage();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    return (
        <DeviceModalForm
            title={t('devices.editDevice')}
            submitButtonLabel={t('devices.edit')}
            open={open}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            formProps={{
                initialValues: {
                    name: device?.name || '',
                    type: device?.type || DeviceType.CAR,
                    capacityMegabytes: String(device?.capacityMegabytes || ''),
                },
                validateOnMount: true,
            }}
        />
    );
};

export default EditDeviceModal;

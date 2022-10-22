import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';
import { useAddDeviceMutation } from 'app/api/devicesApiSlice';
import AddDeviceModal from 'pages/Devices/components/AddDevice/AddDeviceModal';
import { ResponseStatus, AddDeviceRequestData } from 'types';
import useSnackbarMessages from './useSnackbarMessages';

const AddDevice = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const [requestAddDevice, { isLoading, isSuccess }] = useAddDeviceMutation();
    const { showAddDeviceSuccessMessage, showAddDeviceErrorMessage } =
        useSnackbarMessages();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const handleSubmit = async (values: AddDeviceRequestData) => {
        const data = {
            ...values,
            capacityMegabytes: Number(values.capacityGigabytes) * 1024,
        };
        try {
            const response = await requestAddDevice(data).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                showAddDeviceSuccessMessage();
            } else {
                showAddDeviceErrorMessage();
            }
        } catch (error) {
            showAddDeviceErrorMessage();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleCloseModal();
        }
    }, [isSuccess]);

    return (
        <Box>
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpenModal}
            >
                {t('devices.addDevice')}
            </Button>
            <AddDeviceModal
                open={open}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default AddDevice;

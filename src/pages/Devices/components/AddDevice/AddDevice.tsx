import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';
import { useAddDeviceMutation } from 'app/api/devicesApiSlice';
import AddDeviceModal from 'pages/Devices/components/AddDevice/AddDeviceModal';
import { ResponseStatus, AddDeviceRequestData } from 'types';

interface Props {
    onAdd: () => void;
    onError: () => void;
}

const AddDevice = ({ onAdd, onError }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const [requestAddDevice, { isLoading, isSuccess }] = useAddDeviceMutation();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const handleSubmit = async (values: AddDeviceRequestData) => {
        try {
            const response = await requestAddDevice(values).unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                onAdd();
            } else {
                onError();
            }
        } catch (error) {
            onError();
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

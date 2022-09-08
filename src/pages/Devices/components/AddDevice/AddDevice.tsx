import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';
import { useAddDeviceMutation } from 'app/api/devicesApiSlice';
import AddDeviceModal from 'pages/Devices/components/AddDevice/AddDeviceModal';
import { ResponseStatus } from 'types';
import Values from './Values';

interface Props {
    onAdd: () => void;
}

const AddDevice = ({ onAdd }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const [requestAddDevice, { isLoading, isSuccess }] = useAddDeviceMutation();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const handleSubmit = async (values: Values) => {
        const response = await requestAddDevice(values).unwrap();
        if (response?.status === ResponseStatus.SUCCESS) {
            onAdd();
        }
        //TODO: show error snackbar
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

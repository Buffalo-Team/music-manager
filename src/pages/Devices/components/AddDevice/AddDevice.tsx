import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';
import { useAddDeviceMutation } from 'app/api/devicesApiSlice';
import { useAppDispatch } from 'app/store';
import { addDevice } from 'app/User/userSlice';
import AddDeviceModal from 'pages/Devices/components/AddDevice/AddDeviceModal';
import { ResponseStatus } from 'types';
import Values from './Values';

const AddDevice = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const [requestAddDevice, { isLoading, isSuccess }] = useAddDeviceMutation();

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const handleSubmit = async (values: Values) => {
        const response = await requestAddDevice(values).unwrap();
        if (response?.status === ResponseStatus.SUCCESS) {
            dispatch(addDevice(response.device));
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
                {t('AddDevice')}
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

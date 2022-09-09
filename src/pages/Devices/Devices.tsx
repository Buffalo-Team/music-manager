import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useGetAllDevicesQuery } from 'app/api/devicesApiSlice';
import { openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import ActionPanel from 'pages/Devices/components/ActionPanel';
import DevicesList from 'pages/Devices/components/DevicesList';
import { Device, ResponseStatus } from 'types';
import AddDevice from './components/AddDevice';
import { setDevices } from './store/devicesSlice';

const Devices = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const devices = useAppSelector(({ devices }) => devices);
    const [activeDevice, setActiveDevice] = useState<Device | null>(null);
    const {
        data: devicesResponse,
        isFetching,
        isLoading,
        isSuccess,
        refetch,
    } = useGetAllDevicesQuery();

    useEffect(() => {
        if (
            isSuccess &&
            !isFetching &&
            devicesResponse?.status === ResponseStatus.SUCCESS
        ) {
            dispatch(setDevices(devicesResponse?.devices || []));
        }
    }, [devicesResponse, isFetching, isSuccess]);

    const handleAdd = () => {
        dispatch(openSnackbar({ content: t('devices.newDeviceAdded') }));
        refetch();
    };

    const handleAddError = () => {
        dispatch(
            openSnackbar({
                content: t('devices.addingDeviceFailed'),
                severity: 'error',
            })
        );
    };

    const handleDelete = () => {
        dispatch(openSnackbar({ content: t('devices.deviceDeleted') }));
        refetch();
    };

    const handleRefetch = () => {
        refetch();
    };

    const handleActionPanelClose = () => {
        setActiveDevice(null);
    };

    const handleDeviceClick = (device: Device) => {
        setActiveDevice(device);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                padding: (theme) => theme.spacing(2),
            }}
        >
            <AddDevice onAdd={handleAdd} onError={handleAddError} />
            {isLoading && <Loader />}
            {!!devices.length && (
                <DevicesList
                    devices={devices}
                    activeDevice={activeDevice}
                    onDeviceClick={handleDeviceClick}
                />
            )}
            <ActionPanel
                device={activeDevice}
                onClose={handleActionPanelClose}
                onDelete={handleDelete}
                onDownload={handleRefetch}
            />
        </Box>
    );
};

export default Devices;

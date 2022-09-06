import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useGetAllDevicesQuery } from 'app/api/devicesApiSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import ActionPanel from 'pages/Devices/components/ActionPanel';
import DevicesList from 'pages/Devices/components/DevicesList';
import { Device, ResponseStatus } from 'types';
import AddDevice from './components/AddDevice';
import { setDevices } from './store/devicesSlice';

const Devices = () => {
    const dispatch = useAppDispatch();
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
            <AddDevice onAdd={handleRefetch} />
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
                onDelete={handleRefetch}
                onDownload={handleRefetch}
            />
        </Box>
    );
};

export default Devices;

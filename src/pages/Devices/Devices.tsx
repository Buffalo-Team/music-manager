import { useEffect, useState } from 'react';
import { useGetAllDevicesQuery } from 'app/api/devicesApiSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import ActionPanel from 'pages/Devices/components/ActionPanel';
import DevicesList from 'pages/Devices/components/DevicesList';
import { Device, ResponseStatus } from 'types';
import AddDevice from './components/AddDevice';
import Styled from './Devices.styled';
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

    const handleActionPanelClose = () => {
        setActiveDevice(null);
    };

    const handleDeviceClick = (device: Device) => {
        setActiveDevice(device);
    };

    return (
        <Styled.Container>
            <AddDevice />
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
            />
        </Styled.Container>
    );
};

export default Devices;

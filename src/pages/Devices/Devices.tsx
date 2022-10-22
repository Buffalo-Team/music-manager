import { useEffect, useState } from 'react';
import { useGetAllDevicesQuery } from 'app/api/devicesApiSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import ActionPanel from 'pages/Devices/components/ActionPanel';
import DevicesList from 'pages/Devices/components/DevicesList';
import EditDeviceModal from 'pages/Devices/components/EditDeviceModal/EditDeviceModal';
import { Device, ResponseStatus } from 'types';
import AddDevice from './components/AddDevice';
import Styled from './Devices.styled';
import { setDevices } from './store/devicesSlice';

const Devices = () => {
    const dispatch = useAppDispatch();
    const devices = useAppSelector(({ devices }) => devices);
    const [actionPanelOpen, setActionPanelOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [activeDevice, setActiveDevice] = useState<Device | undefined>();
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
        setActionPanelOpen(false);
        setActiveDevice(undefined);
    };

    const handleDeviceClick = (device: Device) => {
        setActiveDevice(device);
        setActionPanelOpen(true);
    };

    const openEditModal = () => {
        setActionPanelOpen(false);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setEditModalOpen(false);
        setActiveDevice(undefined);
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
                open={actionPanelOpen}
                device={activeDevice}
                onClose={handleActionPanelClose}
                onEdit={openEditModal}
            />
            <EditDeviceModal
                open={editModalOpen}
                device={activeDevice}
                onClose={closeEditModal}
            />
        </Styled.Container>
    );
};

export default Devices;

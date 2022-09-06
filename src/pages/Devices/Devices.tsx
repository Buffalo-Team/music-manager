import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useGetAllDevicesQuery } from 'app/api/devicesApiSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import DevicesList from 'pages/Devices/components/DevicesList';
import { ResponseStatus } from 'types';
import AddDevice from './components/AddDevice';
import { setDevices } from './store/devicesSlice';

const Devices = () => {
    const dispatch = useAppDispatch();
    const devices = useAppSelector(({ devices }) => devices);
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
        refetch();
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
            <AddDevice onAdd={handleAdd} />
            {isLoading && <Loader />}
            {!!devices.length && <DevicesList devices={devices} />}
        </Box>
    );
};

export default Devices;

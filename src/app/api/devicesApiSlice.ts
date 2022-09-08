import { Response, Device } from 'types';
import { emptySplitApi } from './emptySplitApi';

export const devicesApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        addDevice: builder.mutation<
            { device: Device } & Response,
            { name: string; type: string; capacityMegabytes: string }
        >({
            query: ({ name, type, capacityMegabytes }) => ({
                url: '/devices',
                method: 'POST',
                body: {
                    name,
                    type,
                    capacityMegabytes,
                },
            }),
        }),
        getAllDevices: builder.query<{ devices: Device[] } & Response, void>({
            query: () => '/devices',
        }),
        deleteDevice: builder.mutation<Response, { id: string }>({
            query: ({ id }) => ({
                url: `/devices/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useAddDeviceMutation,
    useGetAllDevicesQuery,
    useDeleteDeviceMutation,
} = devicesApiSlice;

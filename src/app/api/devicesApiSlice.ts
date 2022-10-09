import { Response, Device, AddDeviceRequestData } from 'types';
import { emptySplitApi } from './emptySplitApi';

export const devicesApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        addDevice: builder.mutation<
            { device: Device } & Response,
            AddDeviceRequestData
        >({
            query: (body) => ({
                url: '/devices',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['devices'],
        }),
        getAllDevices: builder.query<{ devices: Device[] } & Response, void>({
            query: () => '/devices',
            providesTags: ['devices'],
        }),
        deleteDevice: builder.mutation<Response, { id: string }>({
            query: ({ id }) => ({
                url: `/devices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['devices'],
        }),
    }),
});

export const {
    useAddDeviceMutation,
    useGetAllDevicesQuery,
    useDeleteDeviceMutation,
} = devicesApiSlice;

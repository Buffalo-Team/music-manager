import { Response, Device, DeviceRequestData } from 'types';
import { emptySplitApi } from './emptySplitApi';

export const devicesApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        addDevice: builder.mutation<
            { device: Device } & Response,
            DeviceRequestData
        >({
            query: (body) => ({
                url: '/devices',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['devices'],
        }),
        editDevice: builder.mutation<
            { device: Device } & Response,
            { id: string } & DeviceRequestData
        >({
            query: ({ id, ...body }) => ({
                url: `/devices/${id}`,
                method: 'PATCH',
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
        markAsUpToDate: builder.mutation<Response, { id: string }>({
            query: ({ id }) => ({
                url: `/devices/${id}/markAsUpToDate`,
                method: 'PATCH',
            }),
            invalidatesTags: ['devices'],
        }),
    }),
});

export const {
    useAddDeviceMutation,
    useEditDeviceMutation,
    useGetAllDevicesQuery,
    useDeleteDeviceMutation,
    useMarkAsUpToDateMutation,
} = devicesApiSlice;

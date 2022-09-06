import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Response, Device } from 'types';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export const devicesApiSlice = createApi({
    reducerPath: 'devices-api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseUrl}/devices`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        addDevice: builder.mutation<
            { device: Device } & Response,
            { name: string; type: string; capacityMegabytes: string }
        >({
            query: ({ name, type, capacityMegabytes }) => ({
                url: '',
                method: 'POST',
                body: {
                    name,
                    type,
                    capacityMegabytes,
                },
            }),
        }),
    }),
});

export const { useAddDeviceMutation } = devicesApiSlice;

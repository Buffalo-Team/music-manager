import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, LoginResponse, Response } from 'types';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
    endpoints: (builder) => ({
        getCurrentUserData: builder.query<User, void>({
            query: () => '/users/me',
        }),
        login: builder.mutation<
            LoginResponse,
            { email: string; password: string }
        >({
            query: ({ email, password }) => ({
                url: '/users/login',
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }),
        }),
        logout: builder.mutation<Response, void>({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetCurrentUserDataQuery,
    useLoginMutation,
    useLogoutMutation,
} = apiSlice;

import { User, LoginResponse, Response, SignInData, SignUpData } from 'types';
import { emptySplitApi } from './emptySplitApi';

export const usersApiSlice = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserData: builder.query<
            { user: User | null } & Response,
            void
        >({
            query: () => '/users/me',
        }),
        login: builder.mutation<LoginResponse, SignInData>({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation<Response, void>({
            query: () => ({
                url: '/users/logout',
                method: 'POST',
            }),
        }),
        signUp: builder.mutation<LoginResponse, SignUpData>({
            query: (body) => ({
                url: '/users/signup',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetCurrentUserDataQuery,
    useLoginMutation,
    useLogoutMutation,
    useSignUpMutation,
} = usersApiSlice;

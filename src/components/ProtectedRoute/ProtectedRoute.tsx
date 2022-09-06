import React from 'react';
import { useGetCurrentUserDataQuery } from 'app/api/usersApiSlice';
import { useAppSelector } from 'app/store';
import Loader from 'components/Loader';
import Login from 'pages/Login';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const user = useAppSelector(({ user: { user } }) => user);
    const { isFetching } = useGetCurrentUserDataQuery();

    if (isFetching) {
        return <Loader />;
    }
    if (!user) {
        return <Login />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;

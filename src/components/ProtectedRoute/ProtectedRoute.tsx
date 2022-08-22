import React from 'react';
import { useAppSelector } from 'app/store';
import Login from 'pages/Login';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const user = useAppSelector(({ user: { user } }) => user);
    if (!user) {
        return <Login />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;

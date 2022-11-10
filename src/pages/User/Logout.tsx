import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import api from 'app/api';
import { useLogoutMutation } from 'app/api/usersApiSlice';
import { closeSnackbar, openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import { clearUser } from 'app/User/userSlice';
import Loader from 'components/Loader/Loader';
import { clearDevices } from 'pages/Devices/store/devicesSlice';
import { clearFiles } from 'pages/Home/store/filesSlice';
import { ResponseStatus } from 'types';

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const onLogoutError = () => {
        dispatch(
            openSnackbar({
                content: t('login.logoutFailed'),
                severity: 'error',
            })
        );
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await logout().unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                dispatch(clearUser());
                dispatch(clearDevices());
                dispatch(clearFiles());
                dispatch(closeSnackbar());
                navigate('/');
                dispatch(api.util.resetApiState());
            } else {
                onLogoutError();
            }
        } catch (error) {
            onLogoutError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="outlined" onClick={handleLogout} sx={{ flex: 1 }}>
            {loading ? <Loader /> : t('login.logOut').toUpperCase()}
        </Button>
    );
};

export default Logout;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import api from 'app/api';
import { useLogoutMutation } from 'app/api/usersApiSlice';
import { closeSnackbar, openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import { clearUser } from 'app/User/userSlice';
import { clearDevices } from 'pages/Devices/store/devicesSlice';
import { MenuItem, ResponseStatus } from 'types';
import SidebarView from './Sidebar.view';

interface Props {
    sx?: SxProps<Theme>;
    menuItems: MenuItem[];
}

const SidebarContainer = ({ sx, menuItems }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [activePage, setActivePage] = useState<string>(menuItems[0].name);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    useEffect(() => {
        const currentItem = menuItems.find(
            (i) =>
                (i.link === '/' && pathname === '/') ||
                (i.link !== '/' && pathname.startsWith(i.link))
        );
        if (currentItem) {
            setActivePage(currentItem.name);
        }
    }, []);

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
            const response = await logout().unwrap();
            if (response?.status === ResponseStatus.SUCCESS) {
                dispatch(clearUser());
                dispatch(clearDevices());
                dispatch(closeSnackbar());
                navigate('/');
                dispatch(api.util.resetApiState());
            } else {
                onLogoutError();
            }
        } catch (error) {
            onLogoutError();
        }
    };

    return (
        <SidebarView
            sx={sx}
            activePage={activePage}
            setActivePage={setActivePage}
            menuItems={menuItems}
            logout={handleLogout}
        />
    );
};

export default SidebarContainer;

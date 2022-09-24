import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import api from 'app/api';
import { useLogoutMutation } from 'app/api/usersApiSlice';
import { closeSnackbar, openSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch } from 'app/store';
import { clearUser } from 'app/User/userSlice';
import useIsMobile from 'hooks/useIsMobile';
import { clearDevices } from 'pages/Devices/store/devicesSlice';
import { clearFiles } from 'pages/Home/store/filesSlice';
import { MenuItem, ResponseStatus } from 'types';
import NavbarMobile from './Navbar.mobile';
import NavbarView from './Navbar.view';

interface Props {
    menuItems: MenuItem[];
}

const NavbarContainer = ({ menuItems }: Props) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [activePage, setActivePage] = useState<string>(menuItems[0].name);
    const mobile = useIsMobile();
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
                dispatch(clearFiles());
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

    const handlePageSelect = (name: string) => {
        setActivePage(name);
    };

    return mobile ? (
        <NavbarMobile
            activePage={activePage}
            onPageSelect={handlePageSelect}
            menuItems={menuItems}
            logout={handleLogout}
        />
    ) : (
        <NavbarView
            activePage={activePage}
            onPageSelect={handlePageSelect}
            menuItems={menuItems}
            logout={handleLogout}
        />
    );
};

export default NavbarContainer;
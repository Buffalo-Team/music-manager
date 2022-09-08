import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import api from 'app/api';
import { useLogoutMutation } from 'app/api/usersApiSlice';
import { useAppDispatch } from 'app/store';
import { clearUser } from 'app/User/userSlice';
import { MenuItem, ResponseStatus } from 'types';
import SidebarView from './Sidebar.view';
import { clearDevices } from "pages/Devices/store/devicesSlice";

interface Props {
    sx?: SxProps<Theme>;
    menuItems: MenuItem[];
}

const SidebarContainer = ({ sx, menuItems }: Props) => {
    const dispatch = useAppDispatch();
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

    const handleLogout = async () => {
        const response = await logout().unwrap();
        if (response?.status === ResponseStatus.SUCCESS) {
            dispatch(clearUser());
            dispatch(clearDevices());
            navigate('/');
            dispatch(api.util.resetApiState());
        }
        //TODO: show error snackbar when logout failed
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

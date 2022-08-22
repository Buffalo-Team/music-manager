import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useLogoutMutation } from 'app/api/apiSlice';
import { useAppDispatch } from 'app/store';
import { setUser } from 'app/User/userSlice';
import { MenuItem } from 'types';
import SidebarView from './Sidebar.view';

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
        if (response?.status === 'SUCCESS') {
            dispatch(setUser(null));
            navigate('/');
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

import React, { useState } from 'react';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { MenuItem } from 'types';
import SidebarView from './Sidebar.view';

interface Props {
    sx?: SxProps<Theme>;
    menuItems: MenuItem[];
}

const SidebarContainer = ({ sx, menuItems }: Props) => {
    const [activePage, setActivePage] = useState<string>(menuItems[0].name);
    return (
        <SidebarView
            sx={sx}
            activePage={activePage}
            setActivePage={setActivePage}
            menuItems={menuItems}
        />
    );
};

export default SidebarContainer;

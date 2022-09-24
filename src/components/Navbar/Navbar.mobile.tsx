import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer } from '@mui/material';
import IconButton from 'components/IconButton';
import Styled from './Navbar.styled';
import { MenuItem } from 'types';

interface Props {
    activePage: string;
    onPageSelect: (name: string) => void;
    menuItems: MenuItem[];
    logout: () => void;
}

const NavbarMobile = ({
    activePage,
    onPageSelect,
    menuItems,
    logout,
}: Props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handlePageSelect = (name: string) => {
        onPageSelect(name);
        handleClose();
    };

    return (
        <>
            <Box
                sx={(theme) => ({
                    paddingY: 1,
                    paddingX: 2,
                    borderBottom: `1px solid ${theme.palette.border.neutral}`,
                    display: 'flex',
                    justifyContent: 'flex-end',
                })}
            >
                <IconButton onClick={handleOpen}>
                    <MenuIcon />
                </IconButton>
            </Box>
            <Drawer anchor="right" open={open} onClose={handleClose}>
                <Styled.NavbarViewMobile
                    activePage={activePage}
                    onPageSelect={handlePageSelect}
                    menuItems={menuItems}
                    logout={logout}
                />
            </Drawer>
        </>
    );
};

export default NavbarMobile;

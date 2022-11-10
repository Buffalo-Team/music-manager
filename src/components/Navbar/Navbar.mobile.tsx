import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer } from '@mui/material';
import IconButton from 'components/IconButton';
import Styled from './Navbar.styled';
import NavbarProps from './NavbarProps';

const NavbarMobile = ({
    activePage,
    onPageSelect,
    menuItems,
    onToggleMusicPlayer,
    playerOpened,
    hasFile,
    isPlaying,
    onPlayerClose,
}: NavbarProps) => {
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
                    onToggleMusicPlayer={onToggleMusicPlayer}
                    playerOpened={playerOpened}
                    hasFile={hasFile}
                    isPlaying={isPlaying}
                    onPlayerClose={onPlayerClose}
                />
            </Drawer>
        </>
    );
};

export default NavbarMobile;

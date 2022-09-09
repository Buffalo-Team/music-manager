import React, { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import IconButton from 'components/IconButton';
import { MenuItem } from 'types';

interface Props {
    sx?: SxProps<Theme>;
    activePage: string;
    setActivePage: Dispatch<SetStateAction<string>>;
    menuItems: MenuItem[];
    logout: () => void;
}

const SidebarView = ({
    sx,
    activePage,
    setActivePage,
    menuItems,
    logout,
}: Props) => (
    <Box
        sx={[
            (theme) => ({
                background: theme.palette.background.primary,
                paddingY: theme.spacing(2),
                paddingX: theme.spacing(1.5),
                borderRight: `1px solid ${theme.palette.border?.neutral}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
    >
        <Box
            component="ul"
            sx={{ listStyleType: 'none', margin: 0, padding: 0 }}
        >
            {menuItems.map((i) => (
                <Box
                    component="li"
                    key={i.name}
                    sx={{ marginBottom: (theme) => theme.spacing(4) }}
                >
                    <NavLink to={i.link}>
                        <IconButton
                            active={i.name === activePage}
                            onClick={() => setActivePage(i.name)}
                        >
                            {i.IconComponent}
                        </IconButton>
                    </NavLink>
                </Box>
            ))}
        </Box>
        <IconButton onClick={logout}>
            <LogoutIcon />
        </IconButton>
    </Box>
);

export default SidebarView;

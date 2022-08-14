import React, { Dispatch, SetStateAction } from 'react';
import { Box, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import IconButton from 'components/IconButton';
import { MenuItem } from 'types';

interface Props {
    sx?: SxProps<Theme>;
    activePage: string;
    setActivePage: Dispatch<SetStateAction<string>>;
    menuItems: MenuItem[];
}

const SidebarView = ({ sx, activePage, setActivePage, menuItems }: Props) => (
    <Box
        sx={[
            (theme) => ({
                background: theme.palette.background.primary,
                paddingTop: theme.spacing(2),
                paddingLeft: theme.spacing(1.5),
                paddingRight: theme.spacing(1.5),
                borderRight: `1px solid ${theme.palette.border.neutral}`,
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
                    <IconButton
                        active={i.name === activePage}
                        onClick={() => setActivePage(i.name)}
                    >
                        {i.IconComponent}
                    </IconButton>
                </Box>
            ))}
        </Box>
    </Box>
);

export default SidebarView;

import React from 'react';
import { IconButton as IconButtonMUI, IconButtonProps } from '@mui/material';

interface Props extends IconButtonProps {
    active?: boolean;
}

const IconButton = ({ active, children, sx, ...rest }: Props) => (
    <IconButtonMUI
        sx={[
            (theme) => ({
                ...(active && {
                    background: theme.palette.primary.main,
                    '&:hover': {
                        background: theme.palette.primary.main,
                    },
                    color: theme.palette.primary.contrastText,
                }),
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
    >
        {children}
    </IconButtonMUI>
);

export default IconButton;

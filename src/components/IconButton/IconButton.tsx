import React from 'react';
import { IconButton as IconButtonMUI, IconButtonProps } from '@mui/material';

interface Props extends IconButtonProps {
    active?: boolean;
}

const IconButton = ({ active, children, sx, ...rest }: Props) => (
    <IconButtonMUI
        sx={[
            (theme) => ({
                ...(active
                    ? {
                          background: theme.palette.accent.main,
                          '&:hover': {
                              background: theme.palette.accent.main,
                          },
                          color: theme.palette.accent.contrastText,
                      }
                    : {}),
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
    >
        {children}
    </IconButtonMUI>
);

export default IconButton;

import React from 'react';
import { IconButton as IconButtonMUI, IconButtonProps } from '@mui/material';

interface Props extends IconButtonProps {
    variant?: 'simple' | 'standard';
    active?: boolean;
}

const IconButton = ({
    active,
    variant = 'standard',
    children,
    sx,
    ...rest
}: Props) => (
    <IconButtonMUI
        sx={[
            (theme) => ({
                ...(active && {
                    ...(variant === 'standard'
                        ? {
                              background: theme.palette.primary.main,
                              '&:hover': {
                                  background: theme.palette.primary.main,
                              },
                              color: theme.palette.primary.contrastText,
                          }
                        : {
                              color: theme.palette.primary.main,
                          }),
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

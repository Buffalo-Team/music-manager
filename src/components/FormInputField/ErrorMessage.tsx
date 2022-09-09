import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface Props {
    children?: ReactNode;
}

const ErrorMessage = ({ children }: Props) => (
    <Typography
        sx={{
            color: (theme) => theme.palette.error.main,
            marginBottom: (theme) => theme.spacing(0.5),
        }}
        variant="small"
    >
        {children}
    </Typography>
);

export default ErrorMessage;

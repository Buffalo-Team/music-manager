import { PropsWithChildren } from 'react';
import { Paper } from '@mui/material';

const Card = ({ children }: PropsWithChildren) => (
    <Paper
        elevation={0}
        sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(3),
            flex: 1
        })}
    >
        {children}
    </Paper>
);

export default Card;

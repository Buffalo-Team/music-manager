import { Theme } from '@mui/material';

const scrollbar = {
    '&::-webkit-scrollbar': {
        width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: (theme: Theme) => theme.palette.grey[100],
        borderRadius: '2px',
        '&:hover': {
            backgroundColor: (theme: Theme) => theme.palette.grey[200],
        },
    },
};

export default scrollbar;

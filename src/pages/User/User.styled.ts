import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width: '60vw',
    },
    [theme.breakpoints.up('lg')]: {
        width: '40vw',
    },
    minWidth: theme.spacing(30),
}));

const Styled = {
    Container,
};

export default Styled;

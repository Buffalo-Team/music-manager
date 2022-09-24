import { styled } from '@mui/material';

const ModalContentContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    gap: 2,
    height: 0,
    [theme.breakpoints.down('md')]: {
        minHeight: '60vh',
    },
    [theme.breakpoints.up('md')]: {
        minHeight: '40vh',
    },
    [theme.breakpoints.up('lg')]: {
        minHeight: '50vh',
    },
}));

const Styled = {
    ModalContentContainer,
};

export default Styled;

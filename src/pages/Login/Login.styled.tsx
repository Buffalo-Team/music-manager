import { styled, Paper } from '@mui/material';

const LoginContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.secondary,
}));

const PaperCard = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: `${theme.spacing(4)} ${theme.spacing(1.5)} ${theme.spacing(
            4
        )} ${theme.spacing(1.5)}`,
    },
    [theme.breakpoints.up('sm')]: {
        padding: `${theme.spacing(4)} ${theme.spacing(5)} ${theme.spacing(
            4
        )} ${theme.spacing(5)}`,
    },
    borderRadius: '5px',
    border: `1px solid ${theme.palette.border.neutral}`,
}));

const Styled = {
    LoginContainer,
    PaperCard,
};

export default Styled;

import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const Styled = {
    Container,
};

export default Styled;

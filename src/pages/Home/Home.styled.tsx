import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const ActionsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
}));

const Styled = {
    Container,
    ActionsContainer,
};

export default Styled;

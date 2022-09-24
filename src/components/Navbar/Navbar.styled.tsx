import { styled } from '@mui/material';
import NavbarView from './Navbar.view';

const Container = styled('div')(({ theme }) => ({
    background: theme.palette.background.primary,
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} ${theme.spacing(
        2
    )} ${theme.spacing(1.5)}`,
    borderRight: `1px solid ${theme.palette.border.neutral}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

const NavbarViewMobile = styled(NavbarView)(() => ({
    flex: 1,
}));

const Styled = {
    Container,
    NavbarViewMobile,
};

export default Styled;

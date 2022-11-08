import { NavLink as RouterNavLink } from 'react-router-dom';
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

const MusicBarsContainer = styled('div', {
    shouldForwardProp: (prop: string) => prop !== 'playing',
})<{ playing: boolean }>(({ theme, playing }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    width: '20px',
    height: '20px',
    ...(!playing && { transform: 'rotate(180deg)' }),
}));

const MusicBar = styled('span', {
    shouldForwardProp: (prop: string) => !['active', 'playing'].includes(prop),
})<{ active: boolean; playing: boolean }>(({ theme, active, playing }) => ({
    '@keyframes bounce': {
        '10%': {
            transform: 'scaleY(0.3)',
        },
        '30%': {
            transform: 'scaleY(1)',
        },
        '60%': {
            transform: 'scaleY(0.5)',
        },
        '80%': {
            transform: 'scaleY(0.75)',
        },
        '100%': {
            transform: 'scaleY(0.6)',
        },
    },

    width: '5px',
    height: '100%',
    backgroundColor: active
        ? theme.palette.background.primary
        : theme.palette.grey[200],
    borderRadius: '3px',
    transformOrigin: 'bottom',
    ...(playing && { animation: 'bounce 2.2s ease infinite alternate' }),
    content: "''",
    '&:nth-of-type(2)': {
        animationDelay: '-2.2s',
    },
    '&:nth-of-type(1)': {
        animationDelay: '-3.7s',
    },
    ...(!playing && {
        '&:nth-of-type(2)': {
            animationDelay: '-2.2s',
            height: '60%',
        },
        '&:nth-of-type(1)': {
            animationDelay: '-3.7s',
            height: '30%',
        },
    }),
}));

const NavLink = styled(RouterNavLink)(() => ({
    padding: '8px',
}));

const Styled = {
    Container,
    NavbarViewMobile,
    MusicBarsContainer,
    MusicBar,
    NavLink,
};

export default Styled;

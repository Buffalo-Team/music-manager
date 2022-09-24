import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import IconButton from 'components/IconButton';
import { MenuItem } from 'types';
import Styled from './Navbar.styled';

interface Props {
    activePage: string;
    onPageSelect: (name: string) => void;
    menuItems: MenuItem[];
    logout: () => void;
    className?: string;
}

const NavbarView = ({
    activePage,
    onPageSelect,
    menuItems,
    logout,
    className,
}: Props) => (
    <Styled.Container className={className}>
        <Box
            component="ul"
            sx={{ listStyleType: 'none', margin: 0, padding: 0 }}
        >
            {menuItems.map((i) => (
                <Box
                    component="li"
                    key={i.name}
                    sx={{ marginBottom: (theme) => theme.spacing(4) }}
                >
                    <NavLink to={i.link}>
                        <IconButton
                            active={i.name === activePage}
                            onClick={() => onPageSelect(i.name)}
                        >
                            {i.IconComponent}
                        </IconButton>
                    </NavLink>
                </Box>
            ))}
        </Box>
        <IconButton onClick={logout}>
            <LogoutIcon />
        </IconButton>
    </Styled.Container>
);

export default NavbarView;

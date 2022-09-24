import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import IconButton from 'components/IconButton';
import Styled from './Navbar.styled';
import NavbarProps from './NavbarProps';

const NavbarView = ({
    activePage,
    onPageSelect,
    menuItems,
    logout,
    className,
}: NavbarProps) => (
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

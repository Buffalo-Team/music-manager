import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/material';
import IconButton from 'components/IconButton';
import MusicPlayerButton from 'components/Navbar/MusicPlayerButton';
import Styled from './Navbar.styled';
import NavbarProps from './NavbarProps';

const NavbarView = ({
    activePage,
    onPageSelect,
    menuItems,
    className,
    onToggleMusicPlayer,
    playerOpened,
    hasFile,
    isPlaying,
    onPlayerClose,
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
                    sx={{
                        marginBottom: (theme) => theme.spacing(4),
                        '& a': {
                            display: 'flex',
                            '&:visited': {
                                color: (theme) => theme.palette.grey[100],
                                ...(i.name === activePage && {
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                }),
                                ...(i.disabled && {
                                    color: (theme) => theme.palette.grey[50],
                                }),
                            },
                        },
                    }}
                >
                    <IconButton
                        active={i.name === activePage}
                        onClick={() => onPageSelect(i.name)}
                        disabled={i.disabled}
                        sx={{
                            padding: 0,
                        }}
                    >
                        <Styled.NavLink to={i.link}>
                            {i.IconComponent}
                        </Styled.NavLink>
                    </IconButton>
                </Box>
            ))}
        </Box>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {hasFile && (
                <MusicPlayerButton
                    active={playerOpened}
                    playing={isPlaying}
                    onToggle={onToggleMusicPlayer}
                    onClose={onPlayerClose}
                />
            )}
            <NavLink to="/user">
                <IconButton
                    active={'user' === activePage}
                    onClick={() => onPageSelect('user')}
                >
                    <AccountCircleIcon />
                </IconButton>
            </NavLink>
        </Box>
    </Styled.Container>
);

export default NavbarView;

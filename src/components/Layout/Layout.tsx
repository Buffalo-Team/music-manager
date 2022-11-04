import React, {useRef} from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppSelector } from 'app/store';
import MusicPlayer from 'components/MusicPlayer';
import MusicPlaylist from 'components/MusicPlayer/MusicPlaylist';
import Navbar from 'components/Navbar';
import menuItems from './menuItems';

const Layout = () => {
    const { showPlaylist } = useAppSelector(({ musicPlayer }) => musicPlayer);
    const playerRef = useRef<HTMLAudioElement>(null);
    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                flex: 1,
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                },
            })}
        >
            <Navbar menuItems={menuItems} />
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                }}
            >
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        flex: 1,
                        background: theme.palette.background.secondary,
                        position: 'relative',
                        transition: theme.transitions.create('margin', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        ...(showPlaylist && {
                            marginRight: 35,
                            transition: theme.transitions.create('margin', {
                                easing: theme.transitions.easing.easeOut,
                                duration:
                                    theme.transitions.duration.enteringScreen,
                            }),
                        }),
                    })}
                >
                    <Outlet />
                    <MusicPlayer playerRef={playerRef} />
                </Box>
                <MusicPlaylist playerRef={playerRef} />
            </Box>
        </Box>
    );
};

export default Layout;

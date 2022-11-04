import { RefObject, useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, List, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store';
import IconButton from 'components/IconButton';
import MusicPlayerWidget from 'components/MusicPlayer/MusicPlayerWidget';
import PlaylistFile from 'components/MusicPlayer/PlaylistFile';
import { closePlaylist } from 'components/MusicPlayer/store/musicPlayerSlice';
import sortFiles from 'pages/Home/components/FilesList/sortFiles';
import Styled from './MusicPlaylist.styled';

interface Props {
    playerRef: RefObject<HTMLAudioElement>;
}

const MusicPlaylist = ({ playerRef }: Props) => {
    const dispatch = useAppDispatch();
    const { files, showPlaylist } = useAppSelector(
        ({ musicPlayer }) => musicPlayer
    );

    const handleClosePlaylist = () => {
        dispatch(closePlaylist());
    };

    const sortedFiles = useMemo(
        () => [...(files || [])].sort(sortFiles),
        [files]
    );

    return (
        <Drawer
            anchor="right"
            open={showPlaylist}
            hideBackdrop
            variant="persistent"
            sx={(theme) => ({
                '& .MuiDrawer-paper': {
                    width: theme.spacing(35),
                    padding: theme.spacing(3),
                    boxSizing: 'border-box',
                },
            })}
        >
            <IconButton
                sx={{
                    position: 'absolute',
                    right: (theme) => theme.spacing(2),
                    top: (theme) => theme.spacing(2),
                    cursor: 'pointer',
                }}
                onClick={handleClosePlaylist}
            >
                <CloseIcon />
            </IconButton>
            <Typography variant="largeBold" component="p">
                Listening to
            </Typography>
            <Styled.Divider />
            <MusicPlayerWidget
                playerRef={playerRef}
                embedded
                hidePlaylistToggle
                hideClose
            />
            <Styled.Divider />
            <List dense sx={{ padding: 0, overflow: 'auto' }}>
                {sortedFiles.map((file, i) => (
                    <PlaylistFile key={file.id} file={file} number={i + 1} />
                ))}
            </List>
        </Drawer>
    );
};

export default MusicPlaylist;

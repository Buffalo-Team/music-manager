import { ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store';
import { pause, play } from 'components/MusicPlayer/store/musicPlayerSlice';
import { File as ItemFile } from 'types';

interface Props {
    file: ItemFile;
    number: number;
}

const PlaylistFile = ({ file, number }: Props) => {
    const dispatch = useAppDispatch();
    const { playing, current } = useAppSelector(
        ({ musicPlayer }) => musicPlayer
    );
    const isActive = current?.id === file.id;
    const isPlaying = playing && isActive;

    const handleClick = () => {
        if (isPlaying) {
            dispatch(pause());
        } else {
            dispatch(play({ current: file }));
        }
    };

    return (
        <ListItem
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 2,
                cursor: 'pointer',
                ...(isActive && {
                    background: (theme) => theme.palette.background.accent,
                }),
                '&:hover': {
                    background: (theme) => theme.palette.border.neutral,
                },
            }}
            onClick={handleClick}
        >
            <ListItemText
                primary={`${number}. ${file.name}`}
                primaryTypographyProps={{
                    variant: 'regular',
                    component: 'div',
                    sx: { overflowWrap: 'anywhere' },
                }}
            />
        </ListItem>
    );
};

export default PlaylistFile;

import { FileWithPath } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import scrollbar from 'app/commonStyles/scrollbar';

interface Props {
    songs: FileWithPath[];
    onDelete: (song: FileWithPath) => void;
}

const SongsList = ({ songs, onDelete }: Props) => (
    <List
        dense
        sx={{
            width: '100%',
            overflow: 'auto',
            padding: 0,
            flex: 1,
            ...scrollbar,
        }}
    >
        {songs.map((song) => (
            <ListItem
                key={song.path}
                secondaryAction={
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => {
                            onDelete(song);
                            e.stopPropagation();
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemIcon>
                    <MusicNoteIcon />
                </ListItemIcon>
                <ListItemText
                    primary={song.name}
                    primaryTypographyProps={{
                        variant: 'regular',
                    }}
                />
            </ListItem>
        ))}
    </List>
);

export default SongsList;

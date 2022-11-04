import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import IconButton from 'components/IconButton';

interface Props {
    active: boolean;
    onClick: () => void;
}

const PlaylistButton = ({ active, onClick }: Props) => (
    <IconButton
        active={active}
        onClick={onClick}
        variant="simple"
        sx={{ position: 'absolute', right: 0 }}
    >
        <PlaylistPlayIcon sx={{ height: 24, width: 24 }} />
    </IconButton>
);

export default PlaylistButton;

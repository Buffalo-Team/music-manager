import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import IconButton from 'components/IconButton';

interface Props {
    active: boolean;
    onClick: () => void;
}

const MuteButton = ({ active, onClick }: Props) => (
    <IconButton
        active={active}
        onClick={onClick}
        variant="simple"
        sx={{ position: 'absolute', left: 0 }}
    >
        <VolumeOffIcon sx={{ height: 24, width: 24 }} />
    </IconButton>
);

export default MuteButton;

import Close from '@mui/icons-material/Close';
import { Badge } from '@mui/material';
import IconButton from 'components/IconButton';
import Styled from './Navbar.styled';

interface Props {
    active: boolean;
    playing: boolean;
    onToggle: () => void;
    onClose: () => void;
}

const MusicPlayerButton = ({ active, playing, onToggle, onClose }: Props) => (
    <Badge
        sx={{
            marginBottom: (theme) => theme.spacing(6),
            '& .MuiBadge-badge': {
                width: 20,
                height: 20,
                cursor: 'pointer',
            },
        }}
        badgeContent={<Close sx={{ width: 14, height: 14 }} />}
        color="error"
        componentsProps={{
            badge: {
                onClick: onClose,
            },
        }}
    >
        <IconButton active={active} onClick={onToggle}>
            <Styled.MusicBarsContainer playing={playing}>
                <Styled.MusicBar active={active} playing={playing} />
                <Styled.MusicBar active={active} playing={playing} />
                <Styled.MusicBar active={active} playing={playing} />
            </Styled.MusicBarsContainer>
        </IconButton>
    </Badge>
);

export default MusicPlayerButton;

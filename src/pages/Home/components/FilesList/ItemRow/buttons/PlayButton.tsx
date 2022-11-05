import { MouseEvent } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { IconButton } from '@mui/material';

interface Props {
    isHovering: boolean;
    isEditMode: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const PlayButton = ({ isHovering, isEditMode, onClick }: Props) => (
    <IconButton
        sx={{ marginX: 1 }}
        edge="end"
        aria-label="play"
        onClick={onClick}
    >
        <PlayCircleIcon
            sx={{
                height: (theme) => theme.spacing(1.6),
                width: (theme) => theme.spacing(1.6),
                ...(!isHovering && !isEditMode && { visibility: 'hidden' }),
            }}
        />
    </IconButton>
);

export default PlayButton;

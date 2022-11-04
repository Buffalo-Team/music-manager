import { MouseEvent } from 'react';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { IconButton } from '@mui/material';

interface Props {
    isHovering: boolean;
    isEditMode: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const PauseButton = ({ isHovering, isEditMode, onClick }: Props) => (
    <IconButton
        sx={{ marginX: 1 }}
        edge="end"
        aria-label="pause"
        onClick={onClick}
    >
        <PauseCircleIcon
            sx={{
                height: (theme) => theme.spacing(1.6),
                width: (theme) => theme.spacing(1.6),
                ...(!isHovering && !isEditMode && { visibility: 'hidden' }),
            }}
        />
    </IconButton>
);

export default PauseButton;

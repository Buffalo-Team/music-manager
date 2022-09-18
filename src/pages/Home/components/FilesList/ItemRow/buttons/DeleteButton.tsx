import { MouseEvent } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

interface Props {
    isHovering: boolean;
    isEditMode: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton = ({ isHovering, isEditMode, onClick }: Props) => (
    <IconButton
        sx={{ marginX: 1 }}
        edge="end"
        aria-label="delete"
        onClick={onClick}
    >
        <DeleteIcon
            sx={{
                height: (theme) => theme.spacing(1.6),
                width: (theme) => theme.spacing(1.6),
                ...(!isHovering && !isEditMode && { visibility: 'hidden' }),
            }}
        />
    </IconButton>
);

export default DeleteButton;

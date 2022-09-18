import React, { MouseEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

interface Props {
    isHovering: boolean;
    isEditMode: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const EditButton = ({ isHovering, isEditMode, onClick }: Props) => (
    <IconButton edge="end" aria-label="edit" onClick={onClick}>
        <EditIcon
            sx={{
                height: (theme) => theme.spacing(1.6),
                width: (theme) => theme.spacing(1.6),
                ...(!isHovering &&
                    !isEditMode && {
                        visibility: 'hidden',
                    }),
            }}
        />
    </IconButton>
);

export default EditButton;

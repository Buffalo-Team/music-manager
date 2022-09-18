import { MouseEvent } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';

interface Props {
    isLoading: boolean;
    isValid: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SaveButton = ({ isLoading, isValid, onClick }: Props) => (
    <IconButton
        type="submit"
        edge="end"
        aria-label="save"
        disabled={isLoading || !isValid}
        onClick={onClick}
    >
        <CheckCircleIcon
            sx={{
                height: (theme) => theme.spacing(1.6),
                width: (theme) => theme.spacing(1.6),
            }}
        />
    </IconButton>
);

export default SaveButton;

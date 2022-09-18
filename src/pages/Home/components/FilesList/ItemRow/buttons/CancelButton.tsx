import { MouseEvent } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

interface Props {
    isLoading: boolean;
    isValid: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CancelButton = ({ isLoading, isValid, onClick }: Props) => (
    <IconButton
        sx={{ marginLeft: 1 }}
        aria-label="cancel"
        edge="end"
        onClick={onClick}
        disabled={isLoading || !isValid}
    >
        <CancelIcon
            sx={{
                height: (theme) => theme.spacing(1.6),
                width: (theme) => theme.spacing(1.6),
            }}
        />
    </IconButton>
);

export default CancelButton;

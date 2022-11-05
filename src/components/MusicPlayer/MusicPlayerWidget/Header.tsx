import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import IconButton from 'components/IconButton';

interface Props {
    title?: string;
    onClose: () => void;
    hideClose?: boolean;
}

const getDisplayName = (name: string = '') => {
    const parts = `${name}`.split('.');
    parts.pop();
    return parts.join('.');
};

const Header = ({ title, onClose, hideClose }: Props) => {
    const displayName = getDisplayName(title);
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="regularBold" component="p">
                {displayName}
            </Typography>
            {!hideClose && (
                <IconButton
                    onClick={onClose}
                    sx={{ marginRight: (theme) => theme.spacing(-1) }}
                >
                    <CloseIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default Header;

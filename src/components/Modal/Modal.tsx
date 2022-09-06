import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal as MUIModal, Typography } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    closeOnBackdropClick?: boolean;
}

const Modal = ({
    open,
    onClose,
    title,
    children,
    closeOnBackdropClick,
}: Props) => (
    <MUIModal
        open={open}
        onClose={(event, reason) => {
            if (closeOnBackdropClick) {
                onClose();
                return;
            } else if (reason !== 'backdropClick') {
                onClose();
                return;
            }
        }}
    >
        <Box
            sx={(theme) => ({
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: theme.spacing(40),
                background: theme.palette.background.primary,
                padding: theme.spacing(3),
                alignItems: 'center',
                borderRadius: '5px',
            })}
        >
            <IconButton
                sx={{
                    position: 'absolute',
                    right: (theme) => theme.spacing(2),
                    top: (theme) => theme.spacing(2),
                    cursor: 'pointer',
                }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
            {title && (
                <Typography
                    variant="large"
                    sx={{
                        marginBottom: (theme) => theme.spacing(2),
                        textAlign: 'center',
                    }}
                    component="div"
                >
                    {title}
                </Typography>
            )}
            <Box sx={{ display: 'flex', flex: 1 }}>{children}</Box>
        </Box>
    </MUIModal>
);

export default Modal;

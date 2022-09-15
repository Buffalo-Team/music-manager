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
                background: theme.palette.background.primary,
                padding: theme.spacing(3),
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.down('md')]: {
                    minWidth: '70vw',
                    maxHeight: '90vh',
                },
                [theme.breakpoints.up('md')]: {
                    minWidth: '50vw',
                    maxHeight: '50vh',
                },
                [theme.breakpoints.up('lg')]: {
                    minWidth: '35vw',
                    maxHeight: '60vh',
                },
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
            {children}
        </Box>
    </MUIModal>
);

export default Modal;

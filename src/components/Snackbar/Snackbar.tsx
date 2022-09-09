import * as React from 'react';
import { AlertProps } from '@mui/material/Alert';
import MUISnackbar from '@mui/material/Snackbar';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';
import { closeSnackbar } from 'app/Snackbar/snackbarSlice';
import { useAppDispatch, useAppSelector } from 'app/store';
import Alert from './Alert';

const Snackbar = () => {
    const dispatch = useAppDispatch();
    const { open, onClose, severity, content } = useAppSelector(
        ({ snackbar }) => snackbar
    );

    const handleClose: AlertProps['onClose'] = (event) => {
        dispatch(closeSnackbar());
        if (onClose) {
            onClose(event);
        }
    };

    const handleSnackbarClose: SnackbarProps['onClose'] = (event, reason) => {
        dispatch(closeSnackbar());
    };

    return (
        <MUISnackbar
            open={open}
            autoHideDuration={5000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            onClose={handleSnackbarClose}
        >
            <Alert onClose={handleClose} severity={severity}>
                {content}
            </Alert>
        </MUISnackbar>
    );
};

export default Snackbar;

import { ReactNode } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertProps } from '@mui/material/Alert/Alert';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';

type SnackbarState = Pick<SnackbarProps, 'open'> &
    Pick<AlertProps, 'onClose' | 'severity'> & { content: ReactNode };

const initialState: SnackbarState = {
    open: false,
    onClose: undefined,
    severity: 'success',
    content: '',
};

const { actions, reducer } = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar: (
            state,
            action: PayloadAction<Partial<SnackbarState>>
        ) => ({
            ...initialState,
            ...action.payload,
            open: true,
        }),
        closeSnackbar: (state) => {
            state.open = false;
        },
    },
});

export const { openSnackbar, closeSnackbar } = actions;

export default reducer;

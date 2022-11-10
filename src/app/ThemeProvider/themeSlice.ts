import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

interface ThemeStateType {
    mode: PaletteMode;
    supportedModes: PaletteMode[];
}

const initialState: ThemeStateType = {
    mode: 'light',
    supportedModes: ['light', 'dark'],
};

const { actions, reducer } = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<PaletteMode>) => ({
            ...state,
            mode: action.payload,
        }),
    },
});

export const { setTheme } = actions;

export default reducer;

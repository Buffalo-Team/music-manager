import { createSlice } from '@reduxjs/toolkit';
import { Device } from 'types';

const initialState: Device[] = [];

const { actions, reducer } = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        clearDevices: () => initialState,
        setDevices: (state, action) => {
            return action.payload;
        },
        addDevice: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { clearDevices, setDevices, addDevice } = actions;

export default reducer;

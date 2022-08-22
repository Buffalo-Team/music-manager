import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types';

interface UserSliceType {
    user: User | null;
}

const initialState: UserSliceType = {
    user: null,
};

const { actions, reducer } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = actions;

export default reducer;

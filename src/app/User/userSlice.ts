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
        clearUser: () => initialState,
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { clearUser, setUser } = actions;

export default reducer;

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { usersApiSlice, devicesApiSlice } from 'app/api';
import themeReducer from 'app/ThemeProvider/themeSlice';
import userReducer from 'app/User/userSlice';
import devicesReducer from 'pages/Devices/store/devicesSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        devices: devicesReducer,
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
        [devicesApiSlice.reducerPath]: devicesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersApiSlice.middleware)
            .concat(devicesApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

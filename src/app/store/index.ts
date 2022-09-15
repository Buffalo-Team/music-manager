import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import api from 'app/api';
import snackbarReducer from 'app/Snackbar/snackbarSlice';
import themeReducer from 'app/ThemeProvider/themeSlice';
import userReducer from 'app/User/userSlice';
import devicesReducer from 'pages/Devices/store/devicesSlice';
import filesReducer from 'pages/Home/store/filesSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        snackbar: snackbarReducer,
        user: userReducer,
        devices: devicesReducer,
        files: filesReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
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

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store';
import { setTheme } from 'app/ThemeProvider/themeSlice';
import createTheme from './createTheme';

interface Props {
    children?: React.ReactNode;
}

const AppThemeProvider = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const themeMode = useAppSelector(({ theme }) => theme.mode);

    useEffect(() => {
        if (prefersDarkMode) {
            dispatch(setTheme('dark'));
        } else {
            dispatch(setTheme('light'));
        }
    }, []);

    const theme = useMemo(() => createTheme(themeMode), [themeMode]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

AppThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppThemeProvider;

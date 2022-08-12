import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import createTheme from './createTheme';

interface Props {
    children?: React.ReactNode;
}

const AppThemeProvider = ({ children }: Props) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () => createTheme(prefersDarkMode ? 'dark' : 'light'),
        [prefersDarkMode]
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

AppThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppThemeProvider;

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { store } from 'app/store';
import 'app/translations';

const theme = createTheme({
    spacing: 10,
    palette: {
        text: {
            primary: '#000000',
            secondary: '#adadad',
            disabled: '#e0e0e0',
        },
        background: {
            primary: '#FFFFFF',
            secondary: '#F9F9F9',
        },
        success: {
            main: '#59b371',
        },
        warning: {
            main: '#e98b58',
        },
        error: {
            main: '#E95858',
        },
        info: {
            main: '#5d88c9',
        },
        primary: {
            main: '#3B6064',
            contrastText: '#FFFFFF',
        },
        border: {
            neutral: '#E8E8E8',
        },
    },
});

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <p>Theme</p>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default App;

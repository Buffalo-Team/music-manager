import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ConfirmationModalProvider from 'app/ConfirmationModalProvider';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import CurrentUserManager from 'components/CurrentUserManager';
import Snackbar from 'components/Snackbar';
import Routes from 'pages/Routes';
import 'app/translations';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <ConfirmationModalProvider>
                    <CurrentUserManager />
                    <Snackbar />
                    <Routes />
                </ConfirmationModalProvider>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import CurrentUserManager from 'components/CurrentUserManager';
import Routes from 'pages/Routes';
import 'app/translations';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <CurrentUserManager />
                <Routes />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default App;

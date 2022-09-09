import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import 'app/translations';
import CurrentUserManager from 'components/CurrentUserManager';
import Snackbar from 'components/Snackbar';
import Routes from 'pages/Routes';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <CurrentUserManager />
            <Snackbar />
            <Routes />
        </Provider>
    </BrowserRouter>
);

export default App;

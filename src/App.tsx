import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import 'app/translations';
import Routes from 'pages/Routes';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <p>Only Routes no theme</p>
            <Routes />
        </Provider>
    </BrowserRouter>
);

export default App;

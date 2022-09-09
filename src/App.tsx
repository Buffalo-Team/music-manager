import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import 'app/translations';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <p>Basic app with router and store</p>
        </Provider>
    </BrowserRouter>
);

export default App;

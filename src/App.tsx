import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import 'app/translations';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <p>Without snackbar</p>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default App;

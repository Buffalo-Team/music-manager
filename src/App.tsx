import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import Snackbar from 'components/Snackbar';
import 'app/translations';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <Snackbar />
                <p>Without routes</p>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default App;

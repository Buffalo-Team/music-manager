import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import Layout from 'components/Layout';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <Layout />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default App;

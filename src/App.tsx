import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import Layout from 'components/Layout';

const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    </Provider>
);

export default App;

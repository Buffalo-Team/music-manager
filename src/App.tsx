import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import Community from 'pages/Community';
import Devices from 'pages/Devices';
import Home from 'pages/Home';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="devices" element={<Devices />} />
                        <Route path="community" element={<Community />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

export default App;

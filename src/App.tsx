import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from 'app/store';
import ThemeProvider from 'app/ThemeProvider';
import CurrentUserManager from 'components/CurrentUserManager';
import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import ProtectedRoute from 'components/ProtectedRoute';
import Community from 'pages/Community';
import Devices from 'pages/Devices';
import Home from 'pages/Home';
import 'app/translations';

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider>
                <CurrentUserManager />
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
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

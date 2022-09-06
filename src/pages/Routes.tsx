import React from 'react';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import Layout from 'components/Layout';
import NotFound from 'components/NotFound';
import ProtectedRoute from 'components/ProtectedRoute';
import Community from 'pages/Community';
import Devices from 'pages/Devices';
import Home from 'pages/Home';

const Routes = () => (
    <ReactRouterRoutes>
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
    </ReactRouterRoutes>
);

export default Routes;

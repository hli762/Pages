import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Toaster } from "./components/ui/toaster"

import  Layout  from './components/Layout';
import Navbar from "./components/Navbar";
import { useLocation } from 'react-router-dom';

export default function App() {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <Layout>
            <Toaster />
            {location.pathname === '/login' ? <></> : <Navbar />}
            
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, requireAuth, ...rest } = route;
                    return (
                        <Route
                            key={index}
                            {...rest}
                            element={element}
                        />
                    );
                })}
            </Routes>
        </Layout>
    );
}

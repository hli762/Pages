import React,{useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import  { Toaster } from 'react-hot-toast';
import  Layout  from './components/Layout';
import Navbar from "./components/Navbar";
import { useLocation,useNavigate } from 'react-router-dom';
import { getUserId } from './lib/getUserId';

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
  

    useEffect(()=>{
        if(!getUserId()){
            navigate('/login')
        }
    
    },[])
    
    return (
        <Layout>
            {location.pathname === '/login' ? <></> : <Navbar />}
            <Toaster />
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

import React,{useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import  { Toaster } from 'react-hot-toast';
import  Layout  from './components/Layout';
import Navbar from "./components/Navbar";
import { useLocation,useNavigate } from 'react-router-dom';
import { getUser } from './lib/getUser';

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const {userId} = getUser()

    useEffect(()=>{
        if(!userId){
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

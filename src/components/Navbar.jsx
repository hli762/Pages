import React from 'react';
import {Button} from "./ui/button";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={'h-[80px] w-100 bg-black flex items-center justify-around'}>
           <Link to={'/'} className={'text-white'}>
               Home
           </Link>
            <Link to={'/application'} className={'text-white'}>
                Application
            </Link>
            <Link to={'/course'} className={'text-white'}>
                Courses
            </Link>
            <Link to={'/markers'} className={'text-white'}>
                Markers
            </Link>
            <Link to={'/'} className={'text-white'}>
                Course-supervisor
            </Link>

            
        </div>
    );
};

export default Navbar;
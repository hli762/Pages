import React from 'react';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import UserMenu from './UserMenu';
import { getUser } from '../lib/getUser';
import { getHomeUrl } from '../lib/utils';

const Navbar = () => {
    const { userType } = getUser()
    return (
        <div className={'h-[80px] w-100 bg-black flex items-center justify-around'}>
            <Link to={getHomeUrl(userType)} className={'text-white'}>
                Home
            </Link>
            {
                userType === 'User' && <Link to={'/application'} className={'text-white'}>
                    Application
                </Link>}
            {
                userType === "MarkeCoordinator"
                &&
                <Link to={'/markers'} className={'text-white'}>
                    People
                </Link>

            }

            {/* <Link to={'/'} className={'text-white'}>
                Course-supervisor
            </Link> */}

            <UserMenu />

        </div>
    );
};

export default Navbar;
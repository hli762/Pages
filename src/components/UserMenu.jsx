import React from 'react'
import { getUser } from '../lib/getUser';
import useSwr from 'swr'
import fetcher from '../lib/fetcher';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';


import { FaSignOutAlt } from 'react-icons/fa'

import { AiFillEdit } from 'react-icons/ai'

export default function UserMenu() {
    const { userId, userType, userEmail, userName, userPicture } = getUser()
    const navigate = useNavigate()
    const { data: user } = useSwr(`/GetUserById/${userId}`, fetcher)
    console.log(user);

    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }

    console.log('userPicture', userPicture?.split('://'))

    return (
        <div className='flex items-center gap-2'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={userPicture} alt={userName} />
                </Avatar>

                    <p className=' text-white'>
                        {userName}
                    </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        (userType === "User")
                        &&
                        <DropdownMenuItem onClick={() => navigate('/beMarker')} className='flex items-center gap-2'>
                            <AiFillEdit />
                            Edit My Info
                        </DropdownMenuItem>
                    }

                    <DropdownMenuItem onClick={logout} className='flex items-center gap-2'>
                        <FaSignOutAlt />
                        Logout
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

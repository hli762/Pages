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


import {FaSignOutAlt} from 'react-icons/fa'

import {AiFillEdit} from 'react-icons/ai'

export default function UserMenu() {
    const {userId} = getUser()
    const navigate = useNavigate()
    const {data:user} = useSwr(`/GetUserById/${userId}`,fetcher)
    console.log(user);

    const logout = ()=>{
        localStorage.clear();
        navigate('/login')
    }
    
  return (
    <div className='flex items-center gap-2'>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9q_SCtij_FzgxOwM7qYqh63W9JwtNnE-lyw&usqp=CAU" alt="@shadcn" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>navigate('/beMarker')} className='flex items-center gap-2'>
                    <AiFillEdit/>
                    Edit My Info
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className='flex items-center gap-2'>
                    <FaSignOutAlt/>
                    Logout
                </DropdownMenuItem>
              
            </DropdownMenuContent>
        </DropdownMenu>
        
        <p className=' text-white'>
            {user?.email}
        </p>
    </div>
  )
}

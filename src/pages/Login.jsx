import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import Logo from '../images/logo.png';
import { useEffect } from 'react';
import request from '../lib/request';
import { useNavigate } from 'react-router-dom';


const Login = () => {


    const navigate = useNavigate()

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            navigate('/')
        }
        else{
               /* global google */
            google.accounts.id.initialize({
                client_id:"280146137420-cd3akf52jet1oh6i4ptivjeffosbmdr4.apps.googleusercontent.com",
                callback: handleCallbackResponse
            });

            google.accounts.id.renderButton(
                document.getElementById("signIn"),
                {theme: "outline", size:"large"}
            );
        }

    },[]);

    async function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
        const JWT_token = response.credential;
        try{
            const res = await request.post('/GoogleLogin', { code: JWT_token });
            const userData = res.data;
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify({
                userId:userData.id,
                userType:userData.type
            }));
          
            // localStorage.setItem('userType', JSON.stringify({userId:userData.id}));
            navigate('/')
        }catch(e){
            console.log(e.message);
        }
        
    }
    

    return (
        <div className='flex h-screen'>
            <div className={'basis-2/6 flex justify-center items-center flex-col gap-10'}>
                <div 
                        className='flex items-center gap-2'> 
                    <img src={Logo} alt='logo' className='w-16'/>
                    <span className=' text-3xl font-bold'>UOA Marking</span>
                </div>
                <div id="signIn"></div>
                {/* <div className='flex items-center gap-2 border-gray-500 border-[1px] px-5 py-2 rounded-md cursor-pointer text-neutral-600'>
                    <FcGoogle size={30} />
                    <span>Continue with Google</span>
                </div> */}
            </div>
            
            <div className={"basis-4/6 flex justify-center items-center bg-cover bg-[url('./images/bg.jpg')]"}>
                <p className='w-[500px] text-xl text-white opacity-70 bg-slate-600 p-3 rounded-md'>
                    Join us today and become a valuable part of the University of Auckland's marking team for the 2023 Semester 2! We're actively seeking dedicated markers to contribute to our academic community. Don't miss this opportunity to apply your skills and knowledge in a meaningful way. Apply now to embark on this rewarding journey with us!
                </p>
            </div>
        </div>
    );
};

export default Login;
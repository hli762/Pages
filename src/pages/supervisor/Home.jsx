import React from 'react';
import {Button} from "../../components/ui/button";
import {MdSettingsApplications} from 'react-icons/md'
import {SiCoursera,SiMakerbot} from 'react-icons/si'
import {Link} from 'react-router-dom'


function Home(props) {
    
    
    return (
        <div className={'h-screen flex flex-col gap-10 items-center justify-center'}>
            <Link to={'/supervisor/application'}>
                <Button className={'w-[600px] h-[80px] flex gap-6'}>
                    <MdSettingsApplications color={'white'} size={40}/>
                    <span>
                    Application
                    </span>
                </Button> 
            </Link>

            <Link to={'/supervisor/course'}>
                <Button  className={'w-[600px] h-[80px] flex gap-6'}>
                    <SiCoursera color={'white'} size={40}/>
                    Course
                </Button>
            </Link>

            <Link to={'/supervisor/application'}>
                <Button className={'w-[600px] h-[80px] flex gap-6'}>
                    <SiMakerbot color={'white'} size={40}/>
                    Pre-assignment Makers
                </Button>
            </Link>
          
        </div>
    );
}

export default Home;
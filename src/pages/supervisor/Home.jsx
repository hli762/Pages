import React, { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";
import { MdSettingsApplications } from 'react-icons/md'
import { SiCoursera, SiMakerbot } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { getUser } from '../../lib/getUser';
import { useNavigate } from 'react-router-dom';
import useSwr from "swr";
import fetcher from '../../lib/fetcher';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '../../components/ui/select';
import { getSemesterId } from '../../lib/utils';
import {Select} from 'antd'

function Home(props) {
    const navigate = useNavigate()
    const { userType } = getUser()
    const cacheSemesterId = getSemesterId();
    const { data: semesters, isLoading } = useSwr('/GetAllSemesters', fetcher)
    const [currentSemester, setCurrentSemester] = useState(cacheSemesterId && +cacheSemesterId)

    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  

    useEffect(() => {
        if (userType === 'User') {
            navigate('/')
        }
    }, [userType])

    useEffect(() => {
        localStorage.setItem('semesterId', currentSemester)
    }, [currentSemester])

    return (
        <div className={'h-screen flex flex-col gap-10 items-center justify-center'}>
            <span className='text-xl'>Please select semester</span>
            <Select 
                showSearch
                value={currentSemester}
                onChange={(value) => { setCurrentSemester(value) }}
                filterOption={filterOption}
                placeholder="Select a semester"
                options={semesters?.map(semester => {
                    return {
                        value: semester.id,
                        label: `${semester.semesterType}, ${semester.year}`
                    }
                })}
            />
            <div className={`flex flex-col gap-10 items-center justify-center ${!currentSemester && 'hidden'}`}>

                <Link to={'/supervisor/application'}>
                    <Button className={'w-[600px] h-[80px] flex gap-6'}>
                        <MdSettingsApplications color={'white'} size={40} />
                        <span>
                            Application
                        </span>
                    </Button>
                </Link>

                <Link to={'/supervisor/course'}>
                    <Button className={'w-[600px] h-[80px] flex gap-6'}>
                        <SiCoursera color={'white'} size={40} />
                        Course
                    </Button>
                </Link>

                {/* <Link to={'/supervisor/application'}>
                    <Button className={'w-[600px] h-[80px] flex gap-6'}>
                        <SiMakerbot color={'white'} size={40} />
                        Pre-assignment Makers
                    </Button>
                </Link> */}
            </div>

        </div>
    );
}

export default Home;
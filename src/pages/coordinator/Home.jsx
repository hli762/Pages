import React, { useEffect, useState } from 'react';
import { Button } from "../../components/ui/button";
import { MdSettingsApplications } from 'react-icons/md'
import { SiCoursera, SiMakerbot } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { getUser } from '../../lib/getUser';
import { useNavigate } from 'react-router-dom';
import useSwr from "swr";
import fetcher from '../../lib/fetcher';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '../../components/ui/select';
import { getSemesterId } from '../../lib/utils';

function Home(props) {
    const navigate = useNavigate()
    const { userType } = getUser()
    const cacheSemesterId = getSemesterId();
    const { data: semesters, isLoading } = useSwr('/GetAllSemesters', fetcher)
    const [currentSemester, setCurrentSemester] = useState(cacheSemesterId && +cacheSemesterId)

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
            <Select defaultValue={currentSemester} onValueChange={(value) => { setCurrentSemester(value) }}
            >
                <SelectTrigger className="w-[180px]">

                    <SelectValue className='text-black' placeholder="Select a semester" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup >
                        {
                            semesters?.map(semester => <SelectItem value={semester.id} key={semester.id} > {semester.semesterType}</SelectItem>)
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Link to={'/coordinator/application'}>
                <Button className={'w-[600px] h-[80px] flex gap-6'}>
                    <MdSettingsApplications color={'white'} size={40} />
                    <span>
                        Application
                    </span>
                </Button>
            </Link>

            <Link to={'/coordinator/course'}>
                <Button className={'w-[600px] h-[80px] flex gap-6'}>
                    <SiCoursera color={'white'} size={40} />
                    Course
                </Button>
            </Link>

            <Link to={'/coordinator/application'}>
                <Button className={'w-[600px] h-[80px] flex gap-6'}>
                    <SiMakerbot color={'white'} size={40} />
                    Pre-assignment Makers
                </Button>
            </Link>

        </div>
    );
}

export default Home;
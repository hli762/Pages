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
import Modal from '../../components/Modal';
import { Input } from '../../components/ui/input';
import request from '../../lib/request';
import toast from 'react-hot-toast';

function Home(props) {
    const navigate = useNavigate()
    const { userType } = getUser()
    const cacheSemesterId = getSemesterId();
    const { data: semesters, isLoading } = useSwr('/GetAllSemesters', fetcher)
    const [showAddNewSemester, setShowNewSemester] = useState(false);
    const [inputYear, setInputYear] = useState();
    const [inputSemester, setInputSemester] = useState();
    const [currentSemester, setCurrentSemester] = useState(cacheSemesterId && +cacheSemesterId)

    const onAddNewSemester = async () => {
        console.log(inputSemester)
        if(!inputYear || !inputSemester) {
            toast.error('Please finish the form')
            return;
        }
        try {
            await request.post('NewSemester',{
                "year": inputYear,
                "semesterType": inputSemester
            })
            toast.success("uploaded sucessfully! 🚀🚀🚀")
            setShowNewSemester(false)
            setInputSemester();
            setInputYear();
        } catch (e) {
            toast.error(e.message)
        }
    }

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
            <Button onClick={() => setShowNewSemester(true)}>Add New Semester</Button>
            <span className='text-xl'>Please select semester</span>
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
            <div className={`flex flex-col gap-10 items-center justify-center ${!currentSemester && 'hidden'}`}>

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

            <Modal
                isOpen={showAddNewSemester}
                title="Add New Semester"
                actionLabel='Save'
                onClose={() => {setShowNewSemester(false)}}
                onSubmit={onAddNewSemester}
                body={<div className='text-center'>
                    <Input 
                        type="number"
                        value={inputYear}
                        onChange={e => setInputYear(e.target.value)}
                        placeholder="Please input the semester year"
                        className="mb-4"
                    />
                    <Input 
                        value={inputSemester}
                        onChange={e => setInputSemester(e.target.value)}
                        placeholder="Please input the semester name"
                    />
                    <Button 
                    onClick={onAddNewSemester}
                        className="m-4 width-40"
                        >Submit</Button>
                </div>}
            />
        </div>
    );
}

export default Home;
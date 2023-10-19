import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdRadioButtonUnchecked } from 'react-icons/md'
import useSwr from "swr";
import fetcher from '../../lib/fetcher';
import { Button } from '../../components/ui/button';
import { getSemesterId } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../lib/fetcher';
import request from '../../lib/request';
import { Input, Radio } from 'antd';
import { getUser } from '../../lib/getUser'

function Application(props) {
    const semesterId = getSemesterId();
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(0);

    const [currentCourseId, setCurrentCourseId] = useState();
    const [currentCourse, setCurrentCourse] = useState();

    const [searchCourse, setSearchCourse] = useState('');
    const [searchApplication, setSearchApplication] = useState('');
    const [rank, setRank] = useState('4');
    const { userId } = getUser();


    const { data: courses, isLoading } = useSwr(['/GetCoursesByCourseSupervisor', userId, semesterId, refresh], ([url, userId]) => userId && fetcher(`${url}/${userId}/${semesterId}`).then(r => r.courses || []))

    const { data: applications } = useSwr(['/GetApplicationsByCourse', currentCourseId, refresh, rank], ([url, id]) => id && fetcher(`${url}/${id}/${rank}`))

    const setApplicationStatus = async (Applicationid, currentStatus) => {
        // status: in Progress || Accept || Declined
        await request.post(`/SetCurrentStatusOfApplication/${currentStatus}/${Applicationid}`);
        setRefresh(refresh + 1)
    }

    const setRecommend = async (Applicationid, isRecommanded) => {
        // status: in Progress || Accept || Declined
        await request.post(`/SetIsRecommandedOfApplication`, {
            Applicationid,
            isRecommanded,
        });
        setRefresh(refresh + 1)
    }

    useEffect(() => {
        setCurrentCourseId(courses?.[0]?.id)
        setCurrentCourse(courses?.[0])
    }, [courses?.[0]?.id]);

    useEffect(() => {
        if (!semesterId) {
            navigate('/coordinator')
        }
    }, [semesterId])

    return (
        <div className={'flex'}>
            <div className={'basis-1/6 border-r-[1px] border-black h-screen flex flex-col p-8 overflow-y-auto'}>
                <Input.Search
                    onSearch={v => setSearchCourse(v)}
                    className='mb-6'
                    placeholder='search course'
                />

                {
                    (courses || [])?.filter(course => `${course.courseName} ${course.courseNumber}`.toLowerCase()?.includes(searchCourse.toLowerCase())).map(i => <div
                        onClick={() => {
                            setCurrentCourseId(i.id);
                            setCurrentCourse(i)
                        }}
                        className={`mb-2 border-2 border-black text-center p-2 cursor-pointer rounded-sm ${i.id === currentCourseId ? 'bg-black' : 'bg-white'} ${i.id === currentCourseId ? 'text-white' : 'text-black'}`}
                    >
                        <div className='font-bold text-lg'>{i.courseName} {i.courseNumber}</div>
                        <div className='text-sm'>Applications: {i.applications?.length}</div>
                    </div>
                    )
                }
            </div>

            <div className={'basis-5/6'}>
                <div className='flex flex-col gap-3 p-4'>
                    <h4 className={'text-3xl'}>
                        Applications
                    </h4>
                    <div className='flex items-center'>
                        <div className='flex justify-center'>
                            <div className='mr-2'>Rank By</div>
                            <Radio.Group value={rank} onChange={e => setRank(e.target.value)}>
                                <Radio value="4">Recommanded</Radio>
                                <Radio value="1">Have Marked</Radio>
                                <Radio value="2">Previous Grade</Radio>
                                <Radio value="3">Enrolment Detail</Radio>
                            </Radio.Group>
                        </div>
                        <Input.Search
                            onSearch={v => setSearchApplication(v)}
                            className='mb-6 mt-6 w-80 ml-8'
                            placeholder='search application'
                        />
                    </div>
                    <div className={'flex w-full justify-between shadow-md p-4'}>
                        <p className={'text-lg'}>{currentCourse?.courseName} {currentCourse?.courseNumber}</p>
                        <p className={'text-lg'}>Markers {currentCourse?.enrolledStudents}/{currentCourse?.estimatedStudents}</p>
                        <p className={'text-lg'}>Number of Application: {applications?.length}</p>
                    </div>

                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Have Marked</TableHead>
                                    <TableHead>Overseas</TableHead>
                                    <TableHead>Stage</TableHead>
                                    <TableHead>Maximum number of hours</TableHead>
                                    <TableHead>recommend</TableHead>
                                    <TableHead>documents</TableHead>
                                    <TableHead>Operations</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications?.filter(application => `${application?.user?.name}`.toLowerCase()?.includes(searchApplication.toLowerCase()))?.map((application) => (
                                    <TableRow key={application.id}>
                                        <TableCell >{application.user?.name}</TableCell>
                                        <TableCell>{application.previousGrade}%</TableCell>
                                        <TableCell>{application.haveMarkedBefore ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                        <TableCell >{application.user?.isOverseas ? 'Yes' : 'No'}</TableCell>
                                        <TableCell >{application.user?.enrolmentDetail}</TableCell>
                                        <TableCell>{application.user?.remainHours}</TableCell>
                                        <TableCell>{application.isRecommanded ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                        <TableCell>
                                            <Button
                                                className="mb-2 mr-2"
                                                onClick={() => {
                                                    window.open(`${baseUrl}/${application.user?.id}/cv`)
                                                }}
                                            >CV</Button>
                                            <Button
                                                onClick={() => {
                                                    window.open(`${baseUrl}/${application.user?.id}/academic-record`)
                                                }}
                                            >Academic Record</Button>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                (application.currentStatus !== 'Accept' && application.currentStatus !== 'Declined') && <>
                                                    <Button
                                                        className="mb-2 mr-2"
                                                        onClick={() => {
                                                            setRecommend(application.id, !application.isRecommanded)
                                                        }}
                                                    >{application.isRecommanded ? 'Not Recommend' : 'Recommend'}</Button>
                                                    <Button
                                                        onClick={() => {
                                                            setApplicationStatus(application.id, 'Declined')
                                                        }}
                                                    >Not Qualified</Button>
                                                </>
                                            }
                                            {
                                                (application.currentStatus === 'Accept' || application.currentStatus === 'Declined') && application.currentStatus
                                            }
                                        </TableCell>
                                        {/* <TableCell>
                                            <AiFillCheckCircle size={20} />
                                        </TableCell>
                                        <TableCell>
                                            <MdRadioButtonUnchecked size={20} />
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Application;
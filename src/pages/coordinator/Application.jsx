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

function Application(props) {
    const semesterId = getSemesterId();
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(0);

    const [currentCourseId, setCurrentCourseId] = useState();
    const [currentCourse, setCurrentCourse] = useState();

    const { data: courses, isLoading } = useSwr(['/GetCoursesBySemster', semesterId], ([url, semesterId]) => semesterId && fetcher(`${url}/${semesterId}`))

    const { data: applications } = useSwr(['/GetApplicationsByCourse', currentCourseId, refresh], ([url, id]) => id && fetcher(`${url}/${id}`))

    const setApplicationStatus = async (Applicationid, currentStatus) => {
        // status: in Progress || Accept || Declined
        await request.post(`/SetCurrentStatusOfApplication/${currentStatus}/${Applicationid}`);
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

                {
                    (courses || []).map(i => <div
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
                    <div className={'flex w-full justify-between shadow-md p-4'}>
                        <p className={'text-lg'}>{currentCourse?.courseName} {currentCourse?.courseNumber}</p>
                        <p className={'text-lg'}>Marked {currentCourse?.enrolledStudents}/{currentCourse?.estimatedStudents}</p>
                        <p className={'text-lg'}>Number of Application: {currentCourse?.applications?.length}</p>
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
                                {applications?.map((application) => (
                                    <TableRow key={application.id}>
                                        <TableCell >{application.user?.name}</TableCell>
                                        <TableCell>{application.previousGrade}</TableCell>
                                        <TableCell>{application.haveMarkedBefore ? <MdRadioButtonUnchecked /> : <AiFillCheckCircle />}</TableCell>
                                        <TableCell >{application.user?.isOverseas ? 'Yes' : 'No'}</TableCell>
                                        <TableCell >{application.user?.enrolmentDetail}</TableCell>
                                        <TableCell>{application.user?.remainHours}</TableCell>
                                        <TableCell>{application.isRecommanded ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                        <TableCell>
                                            <Button
                                                className="mb-2"
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
                                                        className="mb-2"
                                                        onClick={() => {
                                                            setApplicationStatus(application.id, 'Accept')
                                                        }}
                                                    >Accept</Button>
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
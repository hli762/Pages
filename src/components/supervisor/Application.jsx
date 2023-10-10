import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdRadioButtonUnchecked } from 'react-icons/md'
import useSwr from "swr";
import fetcher from "../../lib/fetcher";
import Loading from '../Loading';

function Application(props) {
    const { data: applications, isLoading } = useSwr('/GetAllApplications', fetcher)
    console.log(applications)

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex flex-col gap-3 p-4'>
            <h4 className={'text-3xl'}>
                Applications
            </h4>
            <div className={'flex w-full justify-between shadow-md p-4'}>
                <p className={'text-lg'}>{currentCourse?.courseName} {currentCourse?.courseNumber}</p>
                <p className={'text-lg'}>Marked {currentCourse?.enrolledStudents}/{currentCourse?.estimatedStudents}</p>
                <p className={'text-lg'}>Number of Application: {applications?.length}</p>
            </div>

            <div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Have Marked</TableHead>
                            <TableHead>Overseas</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Maximum number of hours</TableHead>
                            <TableHead>recommend</TableHead>
                            <TableHead>Qulified</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications?.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell >{application.course.courseName}</TableCell>
                                <TableCell>{application.previousGrade}</TableCell>
                                <TableCell>{application.needsMarker ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                <TableCell >{"None"}</TableCell>
                                <TableCell>{application.isRecommanded ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                <TableCell>{"None"}</TableCell>
                                <TableCell>
                                    <AiFillCheckCircle size={20} />
                                </TableCell>
                                <TableCell>
                                    <MdRadioButtonUnchecked size={20} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Application;
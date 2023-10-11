import React, { useState } from 'react';
import { Progress } from "../../components/ui/progress";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import useSwr from 'swr'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "../../components/ui/menubar";


import Loading from '../../components/Loading';
import useApplyModal from "../../hooks/useApplyModal";
import ApplyModal from "../../components/modals/ApplyModal";
import fetcher from '../../lib/fetcher';
import { Card } from '../../components/ui/card';
import { getUser } from '../../lib/getUser';
import { Input } from 'antd';





function Application(props) {
    const applyModal = useApplyModal()
    const [refresh, setRefresh] = useState(0)
    const userId = getUser()?.userId
    const { data: courses, isLoading } = useSwr(`/GetAllCourses`, fetcher)
    const { data: applications, loading } = useSwr([`/GetApplicationsByUser/${userId}`, refresh], ([url]) => fetcher(url))
    const [courseId, setCourseId] = useState(null)
    const [searchValue, setSearchValue] = useState('');
    const [searchCourse, setSearchCourse] = useState('');

    console.log(courses);
    const colorMap = {
        ['on progress']: 'inherit',
        Accept: '#16a34a',
        Declined: '#dc2626',
    }
    const processMap = {
        ['on progress']: 66,
        Accept: 100,
        Declined: 0,
    }

    const handleApply = (id) => {
        setCourseId(id)
        applyModal.onOpen()
    }
    if (isLoading) {
        return <Loading />
    }

    const onApply = () => {
        setRefresh(refresh + 1);
    }

    return (
        <div className='flex justify-center relative'>
            <ApplyModal courseId={courseId} onApply={onApply} />
            <Card className="p-2 m-2">
                <div className='flex justify-center font-bold'>My Application</div>
                <Input.Search
                    // value={searchValue}
                    placeholder='search my application'
                    className='mt-4'
                    onSearch={(v) => {
                        setSearchValue(v)
                    }}
                />
                <div className={'hidden md:block p-6'}>
                    <div className='mb-10'>
                        {
                            applications?.filter(application => `${application.course?.courseName} ${application.course?.courseNumber}`.includes(searchValue))?.map(application => <div className='mb-8 border-b pb-4' key={application.id}>
                                <div className='font-bold'>{application.course?.courseName} {application.course?.courseNumber}</div>
                                <Progress value={processMap[application.currentStatus]} className='w-[200px] mb-2 ' />
                                <div className='w-[200px] top-20 left-10 items-center gap-2 flex'>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        style={{ color: colorMap[application.currentStatus] }}
                                    >
                                        {application.currentStatus}
                                    </label>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </Card>

            <Card className="p-2 m-2">
                <div className='flex justify-center font-bold'>Courses</div>
                <Input.Search
                    // value={searchValue}
                    placeholder='search my course'
                    className='mt-4 w-80'
                    onSearch={(v) => {
                        setSearchCourse(v)
                    }}
                />
                <div className={'p-6 w-[800px]'}>
                    <Table>
                        {/* <TableCaption>A list of your recent assignments.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Course Marker</TableHead>
                                <TableHead>Course Information</TableHead>
                                <TableHead>Apply Now</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses?.filter(course => `${course.courseName} ${course.courseNumber}`.includes(searchCourse))?.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell >{course.courseName} {course.courseNumber}</TableCell>
                                    <TableCell>{course.enrolledStudents}/{course.estimatedStudents}</TableCell>
                                    <TableCell>
                                        {
                                            course.assignments?.length ?
                                                <Menubar className='flex justify-center'>
                                                    <MenubarMenu>
                                                        <MenubarTrigger>View Assignment</MenubarTrigger>
                                                        <MenubarContent>
                                                            {
                                                                course.assignments?.map((assignment, index) => (
                                                                    <div key={assignment.id} >
                                                                        <MenubarSeparator />
                                                                        <MenubarItem inset> {assignment?.assignmentType}</MenubarItem>

                                                                    </div>

                                                                ))
                                                            }

                                                        </MenubarContent>
                                                    </MenubarMenu>
                                                </Menubar> : 'None'
                                        }
                                    </TableCell>
                                    <TableCell >
                                        <Button disabled={!course.needsMarker} onClick={() => { handleApply(course.id); onApply(); }}>
                                            {!course.needsMarker ? 'Full' : 'Apply'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}

export default Application;
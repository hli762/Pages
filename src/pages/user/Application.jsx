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





function Application(props) {
    const applyModal = useApplyModal()
    const { data: courses, isLoading } = useSwr('/GetAllCourses', fetcher)
    const [courseId, setCourseId] = useState(null)
    console.log(courses);
    const colorMap = {
        normal: 'inherit',
        success: '#16a34a',
        fail: '#dc2626',
    }
    const handleApply = (id) => {
        setCourseId(id)
        applyModal.onOpen()
    }
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex justify-center relative'>
            <ApplyModal courseId={courseId} />
            <Card className="p-2 m-2">
                <div className='flex justify-center font-bold'>My Application</div>
                <div className={'hidden md:block p-6'}>
                    <div className='mb-10'>
                        <div>TODO: Course Name + Course Number</div>
                        <Progress value={66} className='w-[200px] mb-2 ' />
                        <div className='w-[200px] top-20 left-10 items-center gap-2 flex'>
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                style={{ color: colorMap.normal }}
                            >
                                In Progress
                            </label>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-2 m-2">
                <div className='flex justify-center font-bold'>My Courses</div>
                <div className={'p-6 w-[800px]'}>
                    <Table>
                        <TableCaption>A list of your recent assignments.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Course Marker</TableHead>
                                <TableHead>Course Information</TableHead>
                                <TableHead>Apply Now</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses?.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell >{course.courseName}</TableCell>
                                    <TableCell>{course.enrolledStudents}/{course.estimatedStudents}</TableCell>
                                    <TableCell>
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
                                        </Menubar>
                                    </TableCell>
                                    <TableCell >
                                        <Button disabled={course.enrolledStudents >= course.estimatedStudents} onClick={() => handleApply(course.id)}>
                                            {course.enrolledStudents >= course.estimatedStudents ? 'Full' : 'Apply'}
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
import React, {useState,useEffect} from 'react';
import {Progress} from "../../components/ui/progress";
import {Checkbox} from "../../components/ui/checkbox";

import bg from '../../images/bg.jpg'
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"

import generateRandomColor from "../../lib/generateRandomColor";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import useSwr from "swr";
import fetcher from "../../lib/fetcher";
import useCreateCourseModal from '../../hooks/useCreateCourseModal';
import CreateCourseModal from '../../components/modals/CreateCourseModal';

function Course(props) {
    const [showCard,setShowCard] = useState(true)
    const {data:courses,isLoading} = useSwr('/GetAllCourses',fetcher)
    const navigate = useNavigate();
    const createCourseModal = useCreateCourseModal()

    return (
        <div className='flex w-100 p-4'>
            <CreateCourseModal/>
            <div className='basis-1/6 '>
                <div    onClick={()=>setShowCard(!showCard)}
                        className='flex justify-center underline cursor-pointer'>
                    All Course
                </div>

                <div    onClick={()=>{createCourseModal.onOpen()}} 
                        className='flex justify-center underline cursor-pointer mt-6'>
                    Add Course
                </div>
                
            </div>
            
            {
                showCard ?  <div className='basis-5/6'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-4">
                        {
                            courses?.map((course, index) =>(
                                <Card   onClick={()=>navigate(`${course.id}`)}
                                        className={'cursor-pointer'} key={course?.id}>
                                    <CardHeader className={'p-0'}>
                                        <div
                                                style={{ backgroundColor: generateRandomColor() }}
                                                className={`h-[200px]`}>
                                            
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        
                                        <p className={'text-xl font-bold'}> {course?.courseName} {course?.courseNumber}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <div>
                                            <p>{course?.overview?.substring(0,50)}</p>
                                            <div className={'flex gap-2'}>
                                                <p>{course?.semester.year}</p>
                                                <p>{course?.semester.semesterType}</p>
                                            </div>
                                        </div>
                                       
                                    </CardFooter>
                                </Card>
                            ))
                                
                        }
                       
                    </div>
                </div> 
                    : 
                <div className='basis-5/6 px-4'>
                    <Table>
                        <TableCaption>All the courses that you can choose.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Name</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead>Enroll</TableHead>
                                <TableHead className="text-right">Published</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses?.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.courseName}</TableCell>
                                    <TableCell>{course.id}</TableCell>
                                    <TableCell>{course.enrolledStudents}</TableCell>
                                    <TableCell className="text-right">
                                        {}
                                          
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            }
            
        </div>
    );
}

export default Course;
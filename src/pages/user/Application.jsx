import React, { useState } from 'react';
import {Progress} from "../../components/ui/progress";
import {Checkbox} from "../../components/ui/checkbox";
import {Button} from "../../components/ui/button";
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
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "../../components/ui/menubar";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select";


import useApplyModal from "../../hooks/useApplyModal";
import ApplyModal from "../../components/modals/ApplyModal";
import fetcher from '../../lib/fetcher';





function Application(props) {
    const applyModal = useApplyModal()
    const {data:courses,isLoading} = useSwr('/GetAllCourses',fetcher)
    const [courseId,setCourseId] = useState(null)
    console.log(courses);
    const handleApply = (id)=>{
        setCourseId(id)
        applyModal.onOpen()
    }
    if(isLoading){
        return <div className='text-lg'>
            Loading...
        </div>
    }
    
    return (
        <div className='flex justify-center relative'>
            <ApplyModal courseId={courseId}/>
            <div className={'hidden md:block'}>
                <Progress value={66} className='w-[200px] absolute top-14 left-10 '/>
                <div className='w-[200px] absolute top-20 left-10 items-center gap-2 flex'>
                    <Checkbox id="terms" disabled checked={true} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        In Progress
                    </label>
                </div>
            </div>
            
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
                                                    course.assignments?.map((assignment,index)=>(
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
                                    <Button onClick={() => handleApply(course.id)}>
                                        Apply
                                    </Button>
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
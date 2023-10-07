import React, { useEffect, useState } from 'react';
import useSwr from "swr";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"
import fetcher from "../lib/fetcher";
import { useParams } from 'react-router-dom'

function Course(props) {
    const [showCard, setShowCard] = useState(true)
    const [courseDetail, setCourseDetail] = useState(null);
    const { id } = useParams();
    const { data: course, isLoading } = useSwr(`/GetCourseById/${id}`, fetcher)
    console.log('cc', course)

    return (
        <div className='w-full'>
            <Tabs defaultValue="Overview" className="flex w-full mt-[80px]">
                <div className='basis-1/6'>
                    <TabsList className="flex flex-col gap-3">
                        <TabsTrigger value="Assignment">Assignment</TabsTrigger>
                        <TabsTrigger value="Overview">Overview</TabsTrigger>
                        <TabsTrigger value="People">People</TabsTrigger>
                        <TabsTrigger value="WorkingHours">Working Hours</TabsTrigger>
                    </TabsList>
                </div>

                <div className='basis-5/6'>
                    <TabsContent value="Assignment">
                        {course?.assignments}
                    </TabsContent>
                    <TabsContent value="Overview">
                        <div className='font-bold'>{course?.courseName} {course?.courseNumber}</div>
                        {course?.overview}
                    </TabsContent>
                    <TabsContent value="People">
                        {course?.markers}
                    </TabsContent>
                    <TabsContent value="WorkingHours">
                        {course?.remainHours}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default Course;
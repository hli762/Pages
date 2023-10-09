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
import { Card, CardTitle, CardContent } from '../components/ui/card';

function Course(props) {
    const [showCard, setShowCard] = useState(true)
    const [courseDetail, setCourseDetail] = useState(null);
    const { id } = useParams();
    const { data: course, isLoading } = useSwr(`/GetCourseById/${id}`, fetcher)
    const { data: assignments } = useSwr(`/GetAssignmentsByCourse/${id}`, fetcher)
    const { data: users } = useSwr(`/GetUserByCourse/${id}`, fetcher)
    const { data: courseSupervisor } = useSwr(`/GetCourseSupervisorByCourse/${id}`, fetcher)
    const { data: hours } = useSwr(`/GetMarkingHoursByCourse/${id}`, fetcher)
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
                        {
                            assignments?.map(assignment => <div key={assignment.id}>
                                <Card className="p-2 mb-2">
                                    <CardTitle>{assignment.assignmentType}</CardTitle>
                                    <CardContent>{assignment.description}</CardContent>
                                </Card>
                            </div>)
                        }
                    </TabsContent>
                    <TabsContent value="Overview">
                        <div className='font-bold'>{course?.courseName} {course?.courseNumber}</div>
                        {course?.overview}
                    </TabsContent>
                    <TabsContent value="People">
                        <Card className="p-2 mb-6">
                            <CardTitle>Course Supervisor</CardTitle>
                            <CardContent>
                                {courseSupervisor?.map(courseSupervisor => <div>
                                    <div className='mt-2'>
                                        <div className='font-bold'>{courseSupervisor.name}</div>
                                        <div>{courseSupervisor.email}</div>
                                    </div>
                                </div>)}
                            </CardContent>
                        </Card>
                        <Card className="p-2">
                            <CardTitle>Markers</CardTitle>
                            <CardContent>
                                {users?.map(user => <div>
                                    <div className='mt-2'>
                                        <div className='font-bold'>{user.name}</div>
                                        <div>{user.email}</div>
                                    </div>
                                </div>)}
                            </CardContent>
                        </Card>

                    </TabsContent>
                    <TabsContent value="WorkingHours">
                        {hours.map(hour => hour.remainHour)}
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default Course;
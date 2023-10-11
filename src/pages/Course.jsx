import React, { useEffect, useState } from 'react';
import useSwr from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"
import fetcher from "../lib/fetcher";
import { useParams } from 'react-router-dom'
import { Card, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Modal from '../components/Modal';
import { Form, FormField, FormItem, FormControl, FormLabel, FormDescription } from '../components/ui/form';
import { Input } from '../components/ui/input';
import request from '../lib/request';
import toast from 'react-hot-toast'
import { getUser } from '../lib/getUser';

function Course(props) {
    const [showAddMarker, setShowAddMarker] = useState(false);
    const [refreh, setRefresh] = useState(0);
    const [currentModal, setCurrentModal] = useState('marker'); // marker || supervisor
    const { id } = useParams();
    const userType = getUser()?.userType;
    const { data: course, isLoading } = useSwr(`/GetCourseById/${id}`, fetcher)
    const { data: assignments } = useSwr(`/GetAssignmentsByCourse/${id}`, fetcher)
    const { data: users } = useSwr([`/GetUserByCourse/${id}`, refreh], ([url]) => fetcher(url))
    const { data: courseSupervisor } = useSwr([`/GetCourseSupervisorByCourse/${id}`, refreh], ([url]) => fetcher(url))
    const { data: hours } = useSwr(`/GetMarkingHoursByCourse/${id}`, fetcher)

    const userFormSchema = z.object({
        email: z.string()
    })
    const form = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: {},
    })

    const onSubmit = async (data) => {
        try {
            const { email } = data;
            await request.post(currentModal === 'marker' ? `AddUserToCourseByEmail/${email}/${id}` : `AddCourseSupervisorToCourseByEmail/${email}/${id}`, {
                email,
                Courseid: id,
            })
            toast.success("submit sucessfully! 🚀🚀🚀")
            setShowAddMarker(false)
            setRefresh(refreh + 1)
        } catch (e) {
            toast.error(e.messege)
        }
    }

    const removeUser = async (userId) => {
        try {
            await request.post(`RemoveUserFromCourse/${userId}/${id}`, {
                Userid: userId,
                Courseid: id,
            })
            toast.success("submit sucessfully! 🚀🚀🚀")
            setRefresh(refreh + 1)
        } catch (e) {
            toast.error(e.messege)
        }
    }

    const removeSupervisor = async (userId) => {
        try {
            await request.post(`RemoveCourseSupervisorFromCourse/${userId}/${id}`, {
                Userid: userId,
                Courseid: id,
            })
            toast.success("submit sucessfully! 🚀🚀🚀")
            setRefresh(refreh + 1)
        } catch (e) {
            toast.error(e.messege)
        }
    }

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
                            <CardTitle>
                                Course Supervisor
                                {
                                    userType === 'MarkerCoordinator' &&
                                    <Button className="ml-6" onClick={() => {
                                        setCurrentModal('supervisor');
                                        setShowAddMarker(true);
                                    }}>Add Course Supervisor</Button>
                                }
                            </CardTitle>
                            <CardContent>
                                {courseSupervisor?.map(courseSupervisor => <div key={courseSupervisor.id}>
                                    <div className='mt-6 pb-4 border-b'>
                                        <div className='font-bold'>
                                            <div className='flex'>
                                                <div className='font-bold mr-4'>{courseSupervisor.name}</div>
                                                {
                                                    userType === 'MarkerCoordinator' &&
                                                    <Button size="small" onClick={() => removeSupervisor(courseSupervisor.id)}>Remove</Button>}
                                            </div>
                                        </div>
                                        <div>{courseSupervisor.email} {courseSupervisor.isDirector && <span className='bg-black text-white font-normal text-sm p-1 ml-2 rounded'>Director</span>}</div>
                                    </div>
                                </div>)}
                            </CardContent>
                        </Card>
                        <Card className="p-2">
                            <CardTitle>
                                Markers
                                {
                                    userType === 'MarkerCoordinator' && 
                                    <Button className="ml-6" onClick={() => {
                                    setCurrentModal('marker');
                                    setShowAddMarker(true)
                                }}>Add Marker</Button>}
                            </CardTitle>
                            <CardContent>
                                {users?.map(user => <div key={user.id}>
                                    <div className='mt-6 pb-4 border-b'>
                                        <div className='flex'>
                                            <div className='font-bold mr-4'>{user.name}</div>
                                            {
                                                userType === 'MarkerCoordinator' &&
                                                <Button size="small" onClick={() => removeUser(user.id)}>Remove</Button>}
                                        </div>
                                        <div>{user.email}</div>

                                    </div>
                                </div>)}
                            </CardContent>
                        </Card>

                    </TabsContent>
                    <TabsContent value="WorkingHours" className="">
                        <div className='font-bold mb-6 flex'>
                            <div className='mr-6'>Total Working Hours: {course?.totalMarkingHour}</div>
                            <div>Avarage Working Hours: {hours?.length ? (course?.totalMarkingHour / hours?.length).toFixed(2) : '-'}</div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-4'>
                        {hours?.map(hour => <Card className="pt-6 mb-6">
                            <CardContent>
                            <div className='font-bold'>name: {hour.user?.name}</div>
                            <div>email: {hour.user?.email}</div>
                            <div className='font-bold'>hours: {hour.remainHour}</div>
                            </CardContent>
                        </Card>)}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
            <Modal
                isOpen={showAddMarker}
                title={currentModal === 'marker' ? "Add Marker" : "Add Supervisor"}
                actionLabel='Save'
                onClose={() => setShowAddMarker(false)}
                onSubmit={onSubmit}
                body={
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="rounded-md border p-4">

                                        <div>
                                            <FormLabel className='text-white text-md pb-2 mb-2'>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" className="mt-2" />
                                            </FormControl>
                                            {/* <FormDescription className='text-white'>
                                                                    Were you a maker before
                                                                </FormDescription> */}
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className='flex justify-end w-full'>
                                <Button type="submit" variant="secondary">Submit</Button>
                            </div>
                        </form>
                    </Form>
                }
            />
        </div>
    );
}

export default Course;
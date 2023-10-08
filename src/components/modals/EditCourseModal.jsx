
import React, { useCallback, useEffect, useState } from 'react'

import { useToast } from "../ui/use-toast"

import Modal from '../Modal'
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import useEditCourseModal from '../../hooks/useEditCourseModal';
import useSwr from "swr";
import fetcher from '../../lib/fetcher';
import Loading from '../../components/Loading';
import request from '../../lib/request';
import { Checkbox } from '../ui/checkbox';
import { getSemesterId } from '../../lib/utils';

const formSchema = z.object({
    // username: z.string().min(2, {
    //   message: "Username must be at least 2 characters.",
    // }),
})


function EditCourseModal({ id }) {
    const { toast } = useToast()
    const editCourseModal = useEditCourseModal()

    const { data: course, isLoading } = useSwr(['/getCourseById', id], ([url, id]) => id && fetcher(url + '/' + id))


    const onSubmit = useCallback(async () => {
        try {
            const data = form.getValues();
            console.log(data)
            await request.post('UpdateCourse', {
                semesterID: getSemesterId(),
                ...data,
            })
            toast.success("submit sucessfully! 🚀🚀🚀")
            editCourseModal.onClose();
        } catch (e) {
            toast({
                title: "error",
                description: "Something went wrong ",
            })
        }
    }
    )


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...course,
        },
        values: {
            ...course,
        }
    })

    const bodyContent = (
        <div className='flex flex-col gap-4 h-[500px] overflow-scroll'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
                    <FormField
                        control={form.control}
                        name={`courseName`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>courseName</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`courseNumber`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>courseNumber</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`courseCoordinatorEmail`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>courseCoordinatorEmail</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`needsMarker`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>needs Marker(y/n)</FormLabel>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className=' bg-white checked:bg-white active:bg-white hover:bg-white'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`estimatedStudents`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>number of markers</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`enrolledStudents`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>enrolledStudents</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`totalMarkingHour`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>totalMarkingHour</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end w-full'>
                        <Button type="submit" variant="secondary">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )

    return (

        <Modal
            disabled={isLoading}
            isOpen={editCourseModal.isOpen}
            title="Edit the course"
            actionLabel='Save'
            onClose={editCourseModal.onClose}
            onSubmit={onSubmit}
            body={isLoading ? <Loading /> : bodyContent}
        />
    )
}

export default EditCourseModal
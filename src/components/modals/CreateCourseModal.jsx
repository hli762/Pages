
import React, { useCallback, useState } from 'react'
import Modal from '../Modal'
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import useCreateCourseModal from '../../hooks/useCreateCourseModal';
import request from '../../lib/request';
import { Checkbox } from '../ui/checkbox';
import { getSemesterId } from '../../lib/utils';
import toast from 'react-hot-toast';


const formSchema = z.object({
    // username: z.string().min(2, {
    //   message: "Username must be at least 2 characters.",
    // }),
})


function CreateCourseModal() {
    const [isLoading, setIsLoading] = useState(false)
    const createCourseModal = useCreateCourseModal()
    const onSubmit = useCallback(async () => {
        try {
            const data = form.getValues();
            await request.post('NewCourse', {
                semesterID: getSemesterId(),
                ...data,
            })
            toast.success("submit sucessfully! 🚀🚀🚀")
            createCourseModal.onClose();
        } catch (e) {
            toast.error('Something went wrong')
        }
    }
    )


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
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
                        name={`courseDirectorEmail`} // Use a unique name for each field
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={'text-white'}>courseDirectorEmail</FormLabel>
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
            isOpen={createCourseModal.isOpen}
            title="Create a new course"
            actionLabel='Save'
            onClose={createCourseModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default CreateCourseModal

import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

import { useToast } from "../ui/use-toast"

import Modal from '../Modal'
import {Input} from "../ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {modifyCourseDetails} from "../../constant/applicationForm";
import {Button} from "../ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod"
import useEditCourseModal from '../../hooks/useEditCourseModal';


const formSchema = z.object({
    // username: z.string().min(2, {
    //   message: "Username must be at least 2 characters.",
    // }),
})


function EditCourseModal() {
    const { toast } = useToast()
    const [isLoading,setIsLoading] = useState(false)
    const editCourseModal = useEditCourseModal()
    const onSubmit = useCallback(async()=> {
            try {

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

        },
    })

    const bodyContent = (
        <div className='flex flex-col gap-4 h-[500px]'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
                    {modifyCourseDetails.map((fieldName, index) => (
                        <FormField
                            key={index}
                            control={form.control}
                            name={`field_${index}`} // Use a unique name for each field
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={'text-white'}>{fieldName}</FormLabel>
                                    <FormControl>
                                        {/* <Input placeholder={fieldName} {...field} /> */}
                                        <Input />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <div className='flex justify-end w-full'>
                        <Button type="submit" variant="secondary">Next</Button>
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
            body={bodyContent}
        />
    )
}

export default EditCourseModal
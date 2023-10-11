
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

import { useToast } from "../ui/use-toast"

import Modal from '../Modal'
import { Input } from "../ui/input";
import useApplyModal from "../../hooks/useApplyModal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { Checkbox } from '../../components/ui/checkbox'
import { applyFormSchama } from '../../constant/applicationForm';
import toast from 'react-hot-toast'
import request from '../../lib/request';
import { getUser } from '../../lib/getUser';


function ApplyModal({ courseId, onApply }) {

    const [isLoading, setIsLoading] = useState(false)
    const applyModal = useApplyModal()
    const [haveDoneBefore, setHaveDoneBefore] = useState(false);
    const { userId } = getUser()
    console.log(courseId, userId);
    const onSubmit = async (data) => {
        try {
            await request.post('AddApplication', {
                currentStatus: "on progress",
                courseID: courseId,
                studentID: userId,
                ...data,
            })
            toast.success("uploaded sucessfully! 🚀🚀🚀")
            applyModal.onClose();
            onApply?.();
        } catch (e) {
            toast.error(e.message)
        }
    }



    const form = useForm({
        resolver: zodResolver(applyFormSchama),
        defaultValues: {
            haveMarkedBefore: false,
            isRecommanded: false,
            haveDoneBefore: false,
            previousGrade: 0,
            haveDoneReleventCourse: ""

        },
    })



    const bodyContent = (
        <div className='flex flex-col gap-4 h-[500px] overflow-scroll'>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
                    <FormField
                        control={form.control}
                        name="haveMarkedBefore"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className=' bg-white checked:bg-white active:bg-white hover:bg-white'
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className='text-white text-md'>
                                        Maker?
                                    </FormLabel>
                                    <FormDescription className='text-white'>
                                        Have marked this course before
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="isRecommanded"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className=' bg-white checked:bg-white active:bg-white hover:bg-white'
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className='text-white text-md'>
                                        Any recommender?
                                    </FormLabel>
                                    <FormDescription className='text-white'>
                                        Were you recommender by others?
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    /> */}
                    <FormField
                        control={form.control}
                        name="haveDoneBefore"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(e) => {
                                            field.onChange(e);
                                            setHaveDoneBefore(e);
                                        }}
                                        className=' bg-white checked:bg-white active:bg-white hover:bg-white'
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className='text-white text-md'>
                                        took this course?
                                    </FormLabel>
                                    <FormDescription className='text-white'>
                                        Have you done this course?
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="previousGrade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-white text-md'>Could you provide previous grade in percentage (%)?</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        disabled={haveDoneBefore}
                        control={form.control}
                        name="haveDoneReleventCourse"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-white text-md'>
                                    Have you done relevent course,if yes,Can you provide it?
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
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
            isOpen={applyModal.isOpen}
            title="Please finish the form"
            actionLabel='Save'
            onClose={applyModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default ApplyModal
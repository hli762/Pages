import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Checkbox } from '../../components/ui/checkbox'

import { userFormSchama } from '../../constant/applicationForm'

import { baseUrl } from '../../lib/fetcher';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import request from '../../lib/request'
import useSwr from 'swr'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import fetcher from '../../lib/fetcher'
import { Label } from "../../components/ui/label"
import { getUser } from '../../lib/getUser'
import { useParams } from 'react-router-dom'

const Home = () => {
    const { id } = useParams();
    const userId = id || getUser()?.userId
    const navigate = useNavigate()
    const { data: user } = useSwr(`/GetUserById/${userId}`, fetcher)

    useEffect(() => {
        // if (user?.cv) {
        //     navigate('/course')
        // }

    }, [user])

    const [cv, setCv] = useState(null);
    const [record, setRecord] = useState(null);

    const form = useForm({
        // resolver: zodResolver(userFormSchama),
        // defaultValues: {
        //     name: 'bob',
        //     upi: '',
        //     email: '@aucklanduni.ac.nz',
        //     auid: '',
        //     isOverseas: false,
        //     isCitizenOrPermanent: false,
        //     enrolmentDetail: 'master', // 设置 enrolmentDetail 字段的默认值
        //     underOrPost: 'under', // 设置 underOrPost 字段的默认值
        //     haveOtherContracts: false, // 设置 haveOtherContracts 字段的默认值为 true
        //     cv: '', // 设置 cv 字段的默认值为空字符串
        //     academicRecord: '', // 设置 academicRecord 字段的默认值为空字符串
        // },
        values: {
            ...user,
        }
    })

    const onSubmit = async (data) => {
        try {
            const {
                name,
                upi,
                email,
                auid,
                isOverseas,
                isCitizenOrPermanent,
                enrolmentDetail,
                underOrPost,
                haveOtherContracts,
            } = data || {};

            if(
                !name ||
                !upi ||
                !email ||
                !auid ||
                !isOverseas ||
                !isCitizenOrPermanent ||
                !enrolmentDetail ||
                !underOrPost ||
                !haveOtherContracts
            ) {
                toast.error('Please fill all form field')
                return;
            }
            const formData = new FormData();

            formData.append("Id", userId);
            formData.append("Name", name);
            formData.append("UPI", upi);
            formData.append("Email", email);
            formData.append("AUID", auid);
            formData.append("isOverseas", isOverseas);
            formData.append("isCitizenOrPermanent", isCitizenOrPermanent);
            formData.append("enrolmentDetail", enrolmentDetail);
            formData.append("UnderOrPost", underOrPost);
            formData.append("haveOtherContracts", haveOtherContracts);


            formData.append("CV", cv); // Assuming data.cv is a FileList
            formData.append("AcademicRecord", record); // Assuming data.academicRecord is a FileList


            await request.post("/UpdateUser", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            toast.success("Uploaded successfully 🚀🚀🚀");
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleCvChange = (e) => {
        setCv(e.target.files[0]);
    };
    const handleRecordChange = (e) => {
        setRecord(e.target.files[0]);

    };

    return (
        <div className='flex justify-center relative'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
                    <FormField
                        control={form.control}
                        name="name"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="upi"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UPI:</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>EMAIL:</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="auid"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your AUID:</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isOverseas"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Overseas?
                                    </FormLabel>
                                    <FormDescription>
                                        Currently overseas (y/n) – if yes, will come arrive back in NZ?
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isCitizenOrPermanent"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Citizen?
                                    </FormLabel>
                                    <FormDescription>
                                        Citizen or permanent resident (y/n) – if not, does applicant have a valid work visa?
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="enrolmentDetail"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enrolment details for the semester (degree / year - e.g. 2nd year BSc, 1st year PhD, etc.):</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="underOrPost"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Undergraduate or postgraduate student(under or post) (add note that “postgraduate” means that student has already completed a degree):</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="haveOtherContracts"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        have Other Contracts?
                                    </FormLabel>
                                    <FormDescription>
                                        Any other TA/GTA contracts for that semester (y/n – if yes, text field for description of contracts)
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cv"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Please upload your CV:</FormLabel>
                                <Label htmlFor="cv" className=" text-neutral-500"> {cv?.name}</Label>
                                <FormControl>
                                    <Input id="cv" type="file" {...field} value={cv} onChange={(e) => handleCvChange(e)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <a className={`text-sm cursor-pointer ${!user?.cv && 'hidden'}`}
                        onClick={() => {
                            window.open(`${baseUrl}/${user?.id}/cv`)
                        }}>My CV</a>

                    <FormField
                        control={form.control}
                        name="academicRecord"
                        disabled={!!id}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Please upload your academic record:</FormLabel>
                                <Label htmlFor="record" className=" text-neutral-500">{record?.name}</Label>
                                <FormControl>
                                    <Input id="record" type="file" {...field} value={record} onChange={(e) => handleRecordChange(e)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <a className={`text-sm cursor-pointer ${!user?.academicRecord && 'hidden'}`}
                        onClick={() => {
                            window.open(`${baseUrl}/${user?.id}/academic-record`)
                        }}>My Academic Record</a>

                    {!id && <div className='flex justify-end'>
                        <Button type="submit">Submit</Button>
                    </div>}
                </form>
            </Form>
        </div>

    );
};

export default Home;
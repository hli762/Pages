import React, { useEffect,useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {Button} from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Checkbox } from '../../components/ui/checkbox'

import { userFormSchama } from '../../constant/applicationForm'


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

const Home = () => {
    
    const {userId} = getUser()
    const navigate = useNavigate()
    const {data:user} = useSwr(`/GetUserById/${userId}`,fetcher)
   
    useEffect(()=>{
        if(user?.cv){
            navigate('/course')
        }
     
    },[user])

    const [cv, setCv] = useState(null);
    const [record, setRecord] = useState(null);

    const form = useForm({
        resolver: zodResolver(userFormSchama),
        defaultValues: {
            name: 'bob',
            upi: '', 
            email: '@aucklanduni.ac.nz', 
            auid: '', 
            isOverseas: false, 
            isCitizenOrPermanent: false, 
            enrolmentDetail: 'master', // 设置 enrolmentDetail 字段的默认值
            underOrPost: 'under', // 设置 underOrPost 字段的默认值
            haveOtherContracts: false, // 设置 haveOtherContracts 字段的默认值为 true
            cv: '', // 设置 cv 字段的默认值为空字符串
            academicRecord: '', // 设置 academicRecord 字段的默认值为空字符串
          },
      })

      const onSubmit = async (data) => {
        try {
            const formData = new FormData();
        
            formData.append("userID", userId);
            formData.append("name", data.name);
            formData.append("upi", data.upi);
            formData.append("email", data.email);
            formData.append("auid", data.auid);
            formData.append("isOverseas", data.isOverseas);
            formData.append("isCitizenOrPermanent", data.isCitizenOrPermanent);
            formData.append("enrolmentDetail", data.enrolmentDetail);
            formData.append("underOrPost", data.underOrPost);
            formData.append("haveOtherContracts", data.haveOtherContracts);
        
            
            formData.append("cv", cv); // Assuming data.cv is a FileList
            formData.append("academicRecord", record); // Assuming data.academicRecord is a FileList
                
        
            await request.post("/AddUser",formData,  {
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
            <div className={'hidden md:block'}>
                <Progress value={33} className='w-[200px] absolute top-14 left-10 '/>
                <div className='w-[200px] absolute top-20 left-10 items-center gap-2 flex'>
                    <Checkbox id="terms" disabled checked={true} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Submit
                    </label>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
                    <FormField
                        control={form.control}
                        name="name"
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
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>PREFERRED EMAIL:</FormLabel>
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
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Undergraduate or postgraduate student(u or p) (add note that “postgraduate” means that student has already completed a degree):</FormLabel>
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
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Please upload your CV:</FormLabel>
                            <Label htmlFor="cv" className=" text-neutral-500"> {cv?.name}</Label>
                            <FormControl>
                                <Input id="cv" type="file" {...field}  onChange={(e)=>handleCvChange(e)}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="academicRecord"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Please upload your academic record:</FormLabel>
                            <Label htmlFor="record" className=" text-neutral-500">{record?.name}</Label>
                            <FormControl>
                                <Input id="record"  type="file" {...field}  onChange={(e)=>handleRecordChange(e)}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className='flex justify-end'>
                        <Button type="submit">Next</Button>
                    </div>
                </form>
            </Form>
        </div>
        
      );
    };
    
    export default Home;
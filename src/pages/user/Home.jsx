import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {Button} from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Checkbox } from '../../components/ui/checkbox'

import { userForm } from '../../constant/applicationForm'


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


const transformedUserForm = userForm.reduce((result, item) => {
    result[item.desc] = item.restriction;
    return result;
  }, {});
  
console.log(transformedUserForm);

const Home = () => {
    const formSchema = z.object(transformedUserForm)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          
        },
      })

    function onSubmit(values) {
        console.log(values)
    }

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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6">
                {userForm.map((field, index) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={field.desc}
               
                        render={({ field }) => (
                        <div>
                            <FormItem>
                                <FormLabel>
                                    {field.name} 
                                </FormLabel>
                                <FormControl>
                                    {
                                    field.name === "Please upload your CV" || field.name === "Please upload your academicRecord" ? (
                                        <Input {...field} type='file' />
                                    ) : (
                                        <Input {...field} type='text'/>
                                    )
                                    }
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </div>
                        )}
                    />
                    ))}
                <div className='flex justify-end'>
                    <Button type="submit" >Next</Button>
                </div>
                </form>
            </Form>
        </div>
        
      );
    };
    
    export default Home;
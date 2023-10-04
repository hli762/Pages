import React, {useState} from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import {cn} from "../../lib/utils";
import SupervisorApplication from "../../components/supervisor/Application";
import SupervisorMarkers from "../../components/supervisor/Markers";
import SupervisorCourses from "../../components/supervisor/Courses";


function Application(props) {
    const [value,setValue] = useState("application")

    
 
    return (
        <div className={'flex'}>
            <div className={'basis-1/6 border-r-[1px] border-black h-screen flex justify-center pt-8'}>
                <Select  defaultValue={value} onValueChange={(value)=>{setValue(value)}}
                         className={cn('w-75')}
                >
                    
                       
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Applications" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup >
                            <SelectLabel>Applications</SelectLabel>
                            <SelectItem value="courses" > Courses</SelectItem>
                            <SelectItem value="markers" > Makers</SelectItem>
                            <SelectItem value="applications" > Applications</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            
            <div className={'basis-5/6'}>
                {
                    value === 'courses' ?
                        <SupervisorCourses/> :
                        value === "markers" ?
                        <SupervisorMarkers/> :
                            <SupervisorApplication />
                }
                
            </div>
        </div>
    );
}

export default Application;
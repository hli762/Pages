import React, {useState} from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"

function Course(props) {
    const [showCard,setShowCard] = useState(true)
    return (
        <div className='w-full'>
            <Tabs defaultValue="account" className="flex w-full mt-[80px]">
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
                        Assignment
                    </TabsContent>
                    <TabsContent value="Overview">
                        Overview
                    </TabsContent>
                    <TabsContent value="People">
                        People
                    </TabsContent>
                    <TabsContent value="WorkingHours">
                        Working Hours
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

export default Course;
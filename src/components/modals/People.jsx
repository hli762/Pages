import React, { useState } from "react";
import useSwr from "swr";
import fetcher, { baseUrl } from '../../lib/fetcher';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdRadioButtonUnchecked } from 'react-icons/md'
import { getSemesterId } from '../../lib/utils';
import { Button } from "../../components/ui/button";
import Modal from "../Modal";
import { Card, CardTitle } from "../ui/card";

  function numberNname(n, num){
    return n + String(num);
}
function displayGrade(e) {
    if(e >= 90){
        return "A+";
    }else if(e >= 85)
    {
        return "A";
    }else if(e >= 80)
    {
        return "A-";
    }else if(e >= 75)
    {
        return "B+";
    }else if(e >= 70)
    {
        return "B";
    }else if(e >= 65)
    {
        return "B-";
    }else if(e >= 60)
    {
        return "C+";
    }else if(e >= 55)
    {
        return "C";
    }
    else
    {
        return "C-";
    }
                    
  }
const People = ({ userId }) => {
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const { data: user = {} } = useSwr(['/GetUserById', userId, refresh], ([url, userId]) => refresh && fetcher(`${url}/${userId}`))

    if (!user) {
        <div className="p-8">
            <Button
                className="mb-2"
                onClick={() => {
                    setShow(true);
                    setRefresh(refresh + 1)
                }}
            >More Detail</Button>
        </div>
    }

    return <div className="p-8">
        <Button
            className="mb-2"
            onClick={() => {
                setShow(true);
                setRefresh(refresh + 1)
            }}
        >More Detail</Button>

        <Modal
            // disabled={isLoading}
            isOpen={show}
            title="User and Applications"
            actionLabel='Save'
            onClose={() => setShow(false)}
            // onSubmit={onSubmit}
            body={
                // <div className={'p-6 w-[800px]'}>
                <div className={'p-6 h-[600px] overflow-scroll bg-white'}>
                    <Card className="mb-6 p-2">
                        <CardTitle>User Info</CardTitle>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Enrolment Detail</TableHead>
                                    <TableHead>Overseas</TableHead>
                                    <TableHead>Citizen Or Permanent</TableHead>
                                    <TableHead>Under Or Post</TableHead>
                                    <TableHead>UPI</TableHead>
                                    <TableHead>Description Of Contracts</TableHead>
                                    <TableHead>Have Other Contracts</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* {applications?.map((application) => ( */}
                                <TableRow key={user.id}>
                                    <TableCell >{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.enrolmentDetail}</TableCell>
                                    <TableCell >{user.isOverseas ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                    <TableCell>{user.isCitizenOrPermanent ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                    <TableCell >{user.underOrPost}</TableCell>
                                    <TableCell >{user.upi}</TableCell>
                                    <TableCell>{user.descriptionOfContracts}</TableCell>
                                    <TableCell>{user.haveOtherContracts ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                </TableRow>
                                {/* ))} */}
                            </TableBody>
                        </Table>

                    </Card>
                    <Card className="mb-6 p-2">
                        <CardTitle>Application</CardTitle>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Grade</TableHead>
                                    <TableHead>Have Marked</TableHead>
                                    <TableHead>recommend</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user?.applications?.map((application) => (
                                    <TableRow key={application.id}>
                                        <TableCell >{numberNname(application.course?.courseName, application.course?.courseNumber)}</TableCell>
                                        <TableCell>{displayGrade(application.previousGrade)}</TableCell>
                                        <TableCell>{application.haveMarkedBefore ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                        <TableCell>{application.isRecommanded ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            }
        />
    </div>
}

export default People;

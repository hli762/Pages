import React from "react";
import useSwr from "swr";
import fetcher, {baseUrl} from '../../lib/fetcher';
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

const People = () => {
    const semesterId = getSemesterId();
    const { data: applications, isLoading } = useSwr(['/GetAllUsers', semesterId], ([url, semesterId]) => semesterId && fetcher(`${url}`))

    return <div className="p-8">
        <Button
            className="mb-2"
            onClick={() => {
                window.open(`${baseUrl}/download`)
            }}
        >download all user to excel</Button>
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
                {applications?.map((application) => (
                    <TableRow key={application.id}>
                        <TableCell >{application.name}</TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{application.enrolmentDetail}</TableCell>
                        <TableCell >{application.isOverseas ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                        <TableCell>{application.isCitizenOrPermanent ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                        <TableCell >{application.underOrPost}</TableCell>
                        <TableCell >{application.upi}</TableCell>
                        <TableCell>{application.descriptionOfContracts}</TableCell>
                        <TableCell>{application.haveOtherContracts ? <AiFillCheckCircle /> : <MdRadioButtonUnchecked />}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
}

export default People;
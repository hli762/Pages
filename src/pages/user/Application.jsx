import React from 'react';
import {Progress} from "../../components/ui/progress";
import {Checkbox} from "../../components/ui/checkbox";
import {Button} from "../../components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";


import useApplyModal from "../../hooks/useApplyModal";
import ApplyModal from "../../components/modals/ApplyModal";



const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]


function Application(props) {
    const applyModal = useApplyModal()
    const handleApply = ()=>{
        applyModal.onOpen()
    }
    
    return (
        <div className='flex justify-center relative'>
            <ApplyModal/>
            <div className={'hidden md:block'}>
                <Progress value={66} className='w-[200px] absolute top-14 left-10 '/>
                <div className='w-[200px] absolute top-20 left-10 items-center gap-2 flex'>
                    <Checkbox id="terms" disabled checked={true} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        In Progress
                    </label>
                </div>
            </div>
            
            <div className={'p-6 w-[700px]'}>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Course Marker</TableHead>
                            <TableHead>Course Information</TableHead>
                            <TableHead className="text-right">Apply Now</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={handleApply}>
                                        Apply
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}

export default Application;
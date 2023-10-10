import React, { useEffect, useState } from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import useSwr from "swr";
import fetcher from '../../lib/fetcher';
import Loading from '../../components/Loading';
import { Button } from '../../components/ui/button';
import useEditCourseModal from '../../hooks/useEditCourseModal';
import EditCourseModal from '../../components/modals/EditCourseModal';
import useCreateCourseModal from '../../hooks/useCreateCourseModal';
import CreateCourseModal from '../../components/modals/CreateCourseModal';
import Modal from '../../components/Modal';
import { Link } from 'react-router-dom';
import request from '../../lib/request';
import { useToast } from "../../components/ui/use-toast"
import { getSemesterId } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';


function Courses(props) {
    const semesterId = getSemesterId();
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(0);
    const { data: courses, isLoading } = useSwr(['/GetCoursesBySemster', semesterId, refresh], ([url, semesterId]) => semesterId && fetcher(`${url}/${semesterId}`))
    const [editId, setEditId] = useState()
    const [toDeleteId, setToDeleteId] = useState();
    const [showDeleteTips, setShowDeleteTips] = useState(false);
    const editCourseModal = useEditCourseModal()
    const createCourseModal = useCreateCourseModal()
    const { toast } = useToast()

    const onDelete = async () => {
        await request.post('deleteCourseById', {
            id: toDeleteId
        })
        toast.success("delete sucessfully! 🚀🚀🚀")
        setShowDeleteTips(false);
    }

    const onSuccess = () => {
        setRefresh(refresh + 1);
    }

    useEffect(() => {
        if(!semesterId) {
            navigate('/coordinator')
        }
    }, [semesterId])

    if(!semesterId) {
        return null;
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='p-6'>
            <EditCourseModal id={editId} onSuccess={onSuccess}/>
            <CreateCourseModal />
            <Button className="mt-6" onClick={() => { createCourseModal.onOpen() }}>
                Add Course
            </Button>
            <Table className="mt-6">
                <TableHeader>
                    <TableRow>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Course Marker</TableHead>
                        <TableHead>Course Coordinator</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course.id}>
                            <TableCell className="font-medium">
                                {course.courseName} {course.courseNumber}
                            </TableCell>
                            <TableCell>{`${course.enrolledStudents}/${course.estimatedStudents}`}</TableCell>
                            <TableCell>{course.courseSupervisors?.map(i => i.name)?.join(', ')}</TableCell>
                            <TableCell className="text-right">
                                <Link to={`/course/${course.id}`}>
                                    <Button className="mr-2">View</Button>
                                </Link>
                                <Button
                                    className="mr-2"
                                    onClick={() => { setEditId(course.id); editCourseModal.onOpen() }}
                                >
                                    Modify
                                </Button>
                                {/* <Button onClick={() => {
                                    setShowDeleteTips(true);
                                    setToDeleteId(course.id)
                                }}>
                                    Delete
                                </Button> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                isOpen={showDeleteTips}
                onClose={() => setShowDeleteTips(false)}
                body={
                    <div>
                        <div className='text-white text-center text-lg'>
                            Are you sure you want to delete this course?
                        </div>
                        <div className='flex justify-center mt-6 mb-10'>
                            <Button className="mr-4" onClick={() => setShowDeleteTips(false)}>Cancel</Button>
                            <Button onClick={() => onDelete()}>Sure</Button>
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default Courses;
import {create} from 'zustand'


const useCreateCourseModal = create(
    (set) => ({
            isOpen:false,
            onOpen:()=>set({isOpen:true}),
            onClose:()=>set({isOpen:false})}
    ))

export default useCreateCourseModal
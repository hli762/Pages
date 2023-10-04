import {create} from 'zustand'


const useEditCourseModal = create(
    (set) => ({
            isOpen:false,
            onOpen:()=>set({isOpen:true}),
            onClose:()=>set({isOpen:false})}
    ))

export default useEditCourseModal
import {create} from 'zustand'


const useApplyModal = create(
    (set) => ({
            isOpen:false,
            onOpen:()=>set({isOpen:true}),
            onClose:()=>set({isOpen:false})}
    ))

export default useApplyModal
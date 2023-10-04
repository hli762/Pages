import {create} from 'zustand'
const useUser = create((set) => ({
    user: {
      id: null,
      type: '',
      name: '',
      upi: '',
      email: '',
      auid: 0,
      isOverseas: false,
      isCitizenOrPermanent: false,
      enrolmentDetail: '',
      underOrPost: '',
      haveOtherContracts: false,
      descriptionOfContracts: null,
      applications: [],
      remainHours: [],
      courses: [],
    },
    setUser: (newUser) => set(() => ({ user: newUser })),
  }));
  
  export default useUser;
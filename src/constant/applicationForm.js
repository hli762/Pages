import * as z from "zod"

export const userFormSchama = z.object({

  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  
  upi: z.string().min(6,{
    message:"UPI must be at least 6 characters"
  }),

  email: z.string().refine((value) => {
    const regex = /@aucklanduni\.ac\.nz$/;
    return regex.test(value);
  }, {
    message: 'Email must end with @aucklanduni.ac.nz',
  }),

  auid: z.string().min(9,{
    message:"AUID must be at least 9 characters"
  }),

  isOverseas:z.boolean().default(false).optional(),

  isCitizenOrPermanent:z.boolean().default(false).optional(),

  enrolmentDetail:z.string().max(10,{
    message: "please using the format current_stage/stage, No more than 10 characters"
  }),

  underOrPost:z.string().refine(value=> value === 'under' || value === 'post',{
    message:"Input must be either u or p"
  }),

  haveOtherContracts:z.boolean().default(false).optional(),
  
  cv:z.string(),
  academicRecord:z.string()
})



// export const userForm = [
//     {
//       "name": "name:",
//       "desc": "NAME:",
//       "restriction":z.string().min(2, {
//         message: "Username must be at least 2 characters.",
//       })
//     },
//     {
//       "name": "upi",
//       "desc": "UPI:",
//       "restriction":z.string().min(6,{
//         message:"UPI must be at least 6 characters"
//       })
//     },
//     {
//       "name": "email",
//       "desc": "PREFERRED EMAIL:",
//       "restriction":z.string().refine((value) => {
//         const regex = /@aucklanduni\.ac\.nz$/;
//         return regex.test(value);
//       }, {
//         message: 'Email must end with @aucklanduni.ac.nz',
//       })
//     },
//     {
//       "name": "auid",
//       "desc": "Your auid",
//       "restriction":z.string().min(9,{
//         message:"UPI must be at least 9 characters"
//       })
//     },
//     {
//       "name": "isOverseas",
//       "desc": "Currently overseas (y/n) – if yes, will come arrive back in NZ?",
//       "restriction":z.string().refine((value) => value == 'y', (value )=> value == 'n', {
//         message: "Input must be either 'y' or 'n'",
//       })
//     },
//     {
//       "name": "isCitizenOrPermanent",
//       "desc": "Citizen or permanent resident (y/n) – if not, does applicant have a valid work visa?",
//       "restriction":z.string().refine(value=> value === 'y' || value === 'n',{
//         message:"Input must be either y or n"
//       })
//     },
//     {
//       "name": "enrolmentDetail",
//       "desc": "Enrolment details for the semester (degree / year - e.g. 2nd year BSc, 1st year PhD, etc.)",
//       "restriction":z.string().max(10,{
//         message: "please using the format current_stage/stage, No more than 10 characters"
//       })
//     },
//     {
//       "name": "underOrPost",
//       "desc": "Undergraduate or postgraduate student(u or p) (add note that “postgraduate” means that student has already completed a degree)",
//       "restriction":z.string().refine(value=> value === 'u' || value === 'p',{
//         message:"Input must be either u or p"
//       })
//     },
//     {
//       "name": "haveOtherContracts",
//       "desc": "Any other TA/GTA contracts for that semester (y/n – if yes, text field for description of contracts)",
//       "restriction":z.string().refine(value=> value === 'y' || value === 'n',{
//         message:"Input must be either y or n"
//       })
//     },
//     {
//       "name":"cv",
//       "desc":"Please upload your CV",
//       "restriction":z.string().refine((value) => {
//         return value.toLowerCase().endsWith(".pdf");
//       }, {
//         message: 'File must be in PDF format',
//       })
//     },
//     {
//       "name":"academicRecord",
//       "desc":"Please upload your academicRecord",
//       "restriction":z.string().refine((value) => {
//         return value.toLowerCase().endsWith(".pdf");
//       }, {
//         message: 'File must be in PDF format',
//       })
//     }
// ]
  

export const applyToMaker = [
    "Were you a maker before?",
    "Were yuu recommender by others?",
    "Could you provide previous grade?",
    "Did you take relevant course before?"
]

export const createCourseDetails = [
    "Course Name:",
    "Course Number:",
    "Course Director",
    "Course Supervisor",
    "Needs Marker (y/n):",
    "Number of Markers:",
    "Currently enrolled students:",
    "Total marking hours:"
]

export const modifyCourseDetails = [
    "Course Name:",
    "Course Number:",
    "Course Director",
    "Course Supervisor",
    "Needs Marker (y/n):",
    "Number of Markers:",
    "Currently enrolled students:",
    "Total marking hours:"
]








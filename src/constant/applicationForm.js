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

  auid: z.string().min(8,{
    message:"AUID must be at least 8 characters"
  }).max(10,{
    message:"AUID must be no more than 10 characters"
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



export const applyFormSchama  = z.object({
  haveMarkedBefore:z.boolean().default(false).optional(),
  isRecommanded:z.boolean().default(false).optional(),
  haveDoneBefore:z.boolean().default(false).optional(),
  previousGrade:z.string(),
  haveDoneReleventCourse:z.string()
})

export const courseFormSchama = z.object({

})






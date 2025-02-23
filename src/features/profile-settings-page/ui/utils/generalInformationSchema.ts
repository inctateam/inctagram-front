import { GeneralInformationSchemaType } from '@/features/profile-settings-page/ui/general-information'
import { z } from 'zod'

export const GeneralInformationSchema = ({ ...scheme }: GeneralInformationSchemaType) =>
  z.object({
    aboutMe: z.string().max(200, { message: scheme.aboutMeMaxLength }).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.date().optional(),
    firstName: z.string().min(2, { message: scheme.requiredField }),
    lastName: z.string().min(2, { message: scheme.requiredField }),
    region: z.string().optional(),
    userName: z.string().min(2, { message: scheme.requiredField }),
  })

export type GeneralInformationFormValues = z.infer<ReturnType<typeof GeneralInformationSchema>>

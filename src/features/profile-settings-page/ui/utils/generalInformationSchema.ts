import { GeneralInformationSchemaType } from '@/features/profile-settings-page/ui/general-information'
import { z } from 'zod'

export const GeneralInformationSchema = ({ ...scheme }: GeneralInformationSchemaType) =>
  z.object({
    aboutMe: z.string().max(200, { message: scheme.aboutMeMaxLength }).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z.date().optional(),
    firstName: z
      .string()
      .min(1, { message: scheme.requiredField })
      .max(50, { message: scheme.minMaxFirstName }),
    lastName: z
      .string()
      .min(1, { message: scheme.requiredField })
      .max(50, { message: scheme.minMaxLastName }),
    region: z.string().optional(),
    userName: z
      .string()
      .min(6, { message: scheme.requiredField })
      .max(30, { message: scheme.minMaxUserName }),
  })

export type GeneralInformationFormValues = z.infer<ReturnType<typeof GeneralInformationSchema>>

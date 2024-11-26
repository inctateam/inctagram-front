import { z } from 'zod'

import { SignUpPageProps } from '../sign-up/sign-up-page'

type SchemaProps = {
  tErrors: SignUpPageProps['translatedForm']['errors']
} & Pick<SignUpPageProps, 'translatedForm'>
export const signUpSchema = ({ tErrors }: SchemaProps) =>
  z
    .object({
      agreesToTerms: z.boolean().refine(value => value === true, {
        message: tErrors.agreesToTerms,
        path: ['agreesToTerms'],
      }),
      email: z
        .string()
        .min(1, tErrors.requiredField)
        .email({ message: tErrors.email })
        .refine(value => value.trim() !== '', tErrors.requiredField),
      password: z
        .string()
        .min(1, tErrors.requiredField)
        .min(6, tErrors.passwordMinLength)
        .max(20, tErrors.passwordMaxLength)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])/,
          { message: tErrors.password }
          //'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
        )
        .refine(value => value.trim() !== '', tErrors.requiredField),
      passwordConfirmation: z
        .string()
        .min(1, tErrors.requiredField)
        .refine(value => value.trim() !== '', tErrors.requiredField),
      username: z
        .string()
        .min(1, tErrors.requiredField)
        .min(6, tErrors.usernameMinLength)
        .max(30, tErrors.usernameMaxLength),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: tErrors.passwordConfirmation,
      path: ['passwordConfirmation'],
    })

export type SignUpFields = z.infer<ReturnType<typeof signUpSchema>>

import { z } from 'zod'

export const createLoginSchema = (messages: Record<string, string>) => {
  return z.object({
    loginOrEmail: z
      .string()
      .min(1, messages.requiredField)
      // .email(messages.invalidEmail)
      .refine(value => !/[а-яА-ЯёЁ]/.test(value), messages.cyrillicNotAllowed)
      .refine(value => value.trim() !== '', messages.requiredField),
    password: z
      .string()
      .min(1, messages.requiredField)
      .min(6, messages.minPassword)
      .max(20, messages.maxPassword)
      .refine(value => !/[а-яА-ЯёЁ]/.test(value), messages.cyrillicNotAllowed)
      .refine(password => /[a-z]/.test(password), messages.lowercasePassword)
      .refine(password => /[A-Z]/.test(password), messages.uppercasePassword)
      .refine(password => /[0-9]/.test(password), messages.numberPassword)
      .refine(
        password => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password),
        messages.characterPassword
      )
      .refine(value => value.trim() !== '', messages.requiredField),
  })
}
export type LoginFields = z.infer<ReturnType<typeof createLoginSchema>>

/*
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must not exceed 20 characters')
    .refine(password => /[a-z]/.test(password), 'Password must include a lowercase letter')
    .refine(password => /[A-Z]/.test(password), 'Password must include an uppercase letter')
    .refine(password => /[0-9]/.test(password), 'Password must include a number')
    .refine(
      password => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password),
      'Password must include a special character'
    ),
  username: z
    .string()
    .min(6, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 10 characters'),
})

export type LoginFields = z.infer<typeof loginSchema>
*/

import { z } from 'zod'

export const projectTypes = [
  'Brand identity',
  'Logo design',
  'Social media design',
  'Packaging',
  'Editorial / print',
  'Illustration or motion',
  'Something else',
] as const

export const budgets = [
  'Under $500',
  '$500 - $1,500',
  '$1,500 - $5,000',
  '$5,000+',
  "Not sure yet",
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(120),
  projectType: z.enum(projectTypes, { errorMap: () => ({ message: 'Choose a project type.' }) }),
  budget: z.enum(budgets, { errorMap: () => ({ message: 'Choose a budget range.' }) }),
  message: z
    .string()
    .trim()
    .min(20, 'Tell me a little more (at least 20 characters).')
    .max(3000, 'Message is too long (3000 characters max).'),
  // Honeypot: real users never see or fill this field.
  website: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

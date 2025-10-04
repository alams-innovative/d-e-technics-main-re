// lib/zod-schemas.ts
import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

// Auth schemas
// Support EITHER { username, password } OR { identifier, password } where identifier can be username OR email
export const loginSchema = z.union([
  z.object({
    username: z.string().min(1, 'Username is required').max(50),
    password: z.string().min(1, 'Password is required'),
  }),
  z.object({
    identifier: z.string().min(1, 'Identifier is required').max(255),
    password: z.string().min(1, 'Password is required'),
  }),
])

export const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.string().default('sales')
})

// Quote schemas
export const quoteSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  email: z.string().trim().email('Invalid email address'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .refine((val) => isValidPhoneNumber(val), { message: 'Invalid phone number' }),
  // Country dial code like +92
  country_code: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, 'Invalid country dial code')
    .optional(),
  company: z.string().trim().max(255).optional(),
  quantity: z.string().trim().max(100).optional(),
  product: z.string().trim().max(500).optional(),
  message: z.string().trim().max(5000).optional(),
  status: z.enum(['pending', 'in_review', 'sent', 'won', 'lost', 'archived']).default('pending'),
  estimated_value: z.coerce.number().min(0).default(0),
  owner_id: z.number().optional()
})

export const quoteUpdateSchema = quoteSchema.partial().extend({
  id: z.number()
})

// Contact schemas
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .trim()
    .max(50)
    .optional()
    .refine((v) => !v || isValidPhoneNumber(v), { message: 'Invalid phone number' }),
  // Country dial code like +92
  country_code: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}$/, 'Invalid country dial code')
    .optional(),
  company: z.string().trim().max(255).optional(),
  quantity: z.string().trim().max(100).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().max(5000),
  status: z.string().default('new')
})

// Role and permission schemas
export const roleSchema = z.object({
  name: z.string().min(1, 'Role name is required').max(50),
  description: z.string().max(500).optional(),
  permissionIds: z.array(z.number()).default([])
})

export const permissionSchema = z.object({
  module: z.string().min(1),
  action: z.string().min(1),
  scope: z.enum(['ALL', 'OWN']).default('ALL')
})

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(25),
  cursor: z.string().optional()
})

export const quotesQuerySchema = paginationSchema.extend({
  status: z.enum(['pending', 'in_review', 'sent', 'won', 'lost', 'archived']).optional(),
  owner_id: z.coerce.number().optional(),
  country_code: z.string().max(10).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  search: z.string().optional()
})

export const contactsQuerySchema = paginationSchema.extend({
  status: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  search: z.string().optional()
})

// Export types
export type LoginInput = z.infer<typeof loginSchema>
export type UserInput = z.infer<typeof userSchema>
export type QuoteInput = z.infer<typeof quoteSchema>
export type QuoteUpdateInput = z.infer<typeof quoteUpdateSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type RoleInput = z.infer<typeof roleSchema>
export type PermissionInput = z.infer<typeof permissionSchema>
export type QuotesQuery = z.infer<typeof quotesQuerySchema>
export type ContactsQuery = z.infer<typeof contactsQuerySchema>

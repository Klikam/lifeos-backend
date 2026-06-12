import { z } from 'zod';

export const UserBaseSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().nullable().optional(),
  email: z.email('Invalid email address'),
  image: z.url('Invalid image URL').nullable().optional(),
  emailVerified: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required').optional(),
  email: z.email('Invalid email address'),
  image: z.url('Invalid image URL').optional().nullable(),
  emailVerified: z.boolean().default(false),
});

export const UserUpdateSchema = z.object({
  name: z.string().min(1, 'Name must not be empty').optional(),
  email: z.email('Invalid email address').optional(),
  image: z.url('Invalid image URL').optional().nullable(),
  emailVerified: z.boolean().optional(),
});

export const UserSchema = UserBaseSchema;

export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

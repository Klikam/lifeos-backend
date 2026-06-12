import * as z from 'zod';

export const FrequencySchema = z.enum(['DAILY', 'WEEKLY', 'N_PER_WEEK']);
export type FrequencyType = z.infer<typeof FrequencySchema>;

export const HabitBaseSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Habit name is required'),
  frequency: FrequencySchema,
  startDate: z.string().date('Invalid date format (YYYY-MM-DD)'),
  endDate: z
    .string()
    .date('Invalid date format (YYYY-MM-DD)')
    .nullable()
    .optional(),
  frequencyPerWeek: z
    .number()
    .int()
    .positive('Frequency must be positive')
    .nullable()
    .optional(),
  ownerId: z.string().min(1, 'Owner ID is required'),
});

export const HabitCreateSchema = z
  .object({
    id: z.string().min(1, 'ID is required'),
    name: z.string().min(1, 'Habit name is required').max(255, 'Name too long'),
    frequency: FrequencySchema,
    startDate: z.string().date('Invalid start date (YYYY-MM-DD)'),
    endDate: z
      .string()
      .date('Invalid end date (YYYY-MM-DD)')
      .nullable()
      .optional(),
    frequencyPerWeek: z
      .number()
      .int()
      .positive('Must be a positive integer')
      .nullable()
      .optional(),
    ownerId: z.string().min(1, 'Owner ID is required'),
  })
  .refine(
    data => {
      if (data.frequency === 'N_PER_WEEK' && !data.frequencyPerWeek) {
        return false;
      }
      return true;
    },
    {
      message: 'frequencyPerWeek is required when frequency is N_PER_WEEK',
      path: ['frequencyPerWeek'],
    },
  )
  .refine(
    data => {
      if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
        return false;
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    },
  );

export const HabitUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name must not be empty')
      .max(255, 'Name too long')
      .optional(),
    frequency: FrequencySchema.optional(),
    startDate: z.string().date('Invalid date format (YYYY-MM-DD)').optional(),
    endDate: z
      .string()
      .date('Invalid date format (YYYY-MM-DD)')
      .nullable()
      .optional(),
    frequencyPerWeek: z
      .number()
      .int()
      .positive('Must be positive')
      .nullable()
      .optional(),
  })
  .refine(
    data => {
      if (data.frequency === 'N_PER_WEEK' && !data.frequencyPerWeek) {
        return false;
      }
      return true;
    },
    {
      message: 'frequencyPerWeek is required when frequency is N_PER_WEEK',
      path: ['frequencyPerWeek'],
    },
  )
  .refine(
    data => {
      if (
        data.startDate &&
        data.endDate &&
        new Date(data.endDate) < new Date(data.startDate)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    },
  );

export const HabitSchema = HabitBaseSchema;

export type Habit = z.infer<typeof HabitSchema>;
export type HabitCreate = z.infer<typeof HabitCreateSchema>;
export type HabitUpdate = z.infer<typeof HabitUpdateSchema>;

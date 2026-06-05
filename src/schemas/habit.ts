import * as z from "zod"
import {BaseIdSchema} from "./baseId";

export const HabitSchema = z.object({
    id: BaseIdSchema,
    name: z.string().max(30),
    frequency: z.enum(["DAILY", "WEEKLY", "N_PER_WEEK"]),
    frequencyPerWeek: z.number().int().positive().min(1).max(7).nullable(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    ownerId: z.coerce.number()
})

export type Habit = z.infer<typeof HabitSchema>

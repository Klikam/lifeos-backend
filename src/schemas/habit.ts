import * as z from "zod"



export const HabitSchema = z.object({
    id: z.coerce.number(),
    name: z.string().max(30),
    frequency: z.enum(["DAILY", "WEEKLY", "N_PER_WEEK"]),
    frequencyPerWeek: z.number().int().positive().min(1).max(7).nullable(),
    startDate: z.string(),
    endDate: z.string().nullable()
})

export type Habit = z.infer<typeof HabitSchema>

// in-memory habits for testing purpose
export let habits: Habit[] = [
    {
        id: 0,
        name: "testHabit",
        frequency: "DAILY",
        startDate: Date.now().toLocaleString(),
        endDate: null,
        frequencyPerWeek: null
    }
]
import * as z from "zod";
import {HabitSchema} from "./habit";

export const UserSchema = z.object({
    id: z.coerce.number(),
    name: z.string().max(30).nullable(),
    email: z.email(),
    habits: z.array(HabitSchema)
})

export type User = z.infer<typeof UserSchema>
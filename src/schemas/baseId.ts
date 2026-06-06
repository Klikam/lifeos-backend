import * as z from "zod";

export const BaseIdSchema = z.uuidv4()

export type BaseId = z.infer<typeof BaseIdSchema>
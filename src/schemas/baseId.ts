import * as z from "zod";

export const BaseIdSchema = z.coerce.number().int().positive()

export type BaseId = z.infer<typeof BaseIdSchema>
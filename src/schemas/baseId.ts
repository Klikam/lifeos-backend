import * as z from 'zod';

export const BaseIdSchema = z.string();

export type BaseId = z.infer<typeof BaseIdSchema>;

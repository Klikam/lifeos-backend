import type {Request, Response, NextFunction} from "express";
import {HabitSchema} from "../schemas/habit.js"
import * as z from "zod"
import {BaseIdSchema} from "../schemas/baseId";

export const habitsValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = HabitSchema.omit({id: true}).safeParse(req.body)

    if (!result.success) {
        res.status(400).json({
            message: "Validation error",
            details: z.treeifyError(result.error)
        })
        return;
    }

    req.body = result.data
    next()
}

export const idValidator = (req: Request, res: Response, next: NextFunction) => {
    const result = BaseIdSchema.safeParse(req.params.id)

    if (!result.success) {
        res.status(400).json({
            message: "Validation error",
            details: z.treeifyError(result.error)
        })
        return;
    }

    res.locals.id = result.data
    next()
}
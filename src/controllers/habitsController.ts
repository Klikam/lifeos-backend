import type {Request, Response, NextFunction} from "express";
import type {Habit} from "../schemas/habit.js";
import {habitsService} from "../services/habitsService.js";


export const findMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const habits: Habit[] | null = await habitsService.findMany()
        res.json(habits)
    } catch (err) {
        next(err)
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = res.locals.id
        const habit: Habit | null = await habitsService.findById(parseInt(id, 10))
        if (!habit) {
            res.status(404).json({message: `Cannot find habit with id ${id}`})
            return
        }
        res.json(habit)
    } catch (err) {
        next(err)
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const habit: Habit = req.body;
        const createdHabit: Habit = await habitsService.create(habit)
        res.status(201).json(createdHabit)
    } catch (err) {
        next(err)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = res.locals.id
        const habit: Habit = req.body;

        const updatedHabit: Habit | null = await habitsService.update(id, habit)

        res.status(200).json(updatedHabit)
    } catch (err) {
        next(err)
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = res.locals.id
        await habitsService.delete(id)
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
}
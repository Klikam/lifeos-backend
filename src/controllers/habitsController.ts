import type {Request, Response, NextFunction} from "express";
import {type Habit, habits} from "../schemas/habit";
import {usersService} from "../services/habitsService";
import {prisma} from "../lib/prisma";

// for testing purposes
// TODO delete after moving to DB
export let nextId = 1

export const findMany = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const habits: Habit[] | null = await prisma.habit.findMany()
        res.json(habits)
    } catch (err) {
        next(err)
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = res.locals
        const habit: Habit | null = await usersService.findById(parseInt(id, 10))
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
        const {name, frequency, startDate, endDate, frequencyPerWeek} = req.body;
        const habit: Habit = await prisma.habit.create({
            data: {
                name,
                frequency,
                startDate,
                endDate,
                frequencyPerWeek
            }
        })
        res.status(201).json(habit)
    } catch (err) {
        next(err)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = res.locals
        const {name, frequency, startDate, endDate, frequencyPerWeek} = req.body;


        const habitIdToModify = habits.findIndex(hab => hab.id === parseInt(id, 10))
        if (habitIdToModify === -1) {
            res.status(404).json({message: "Item not found"})
            return;
        }

        habits[habitIdToModify] = {
            id: habitIdToModify,
            name,
            frequency,
            startDate,
            endDate,
            frequencyPerWeek
        }
        res.json(habits[habitIdToModify])
    } catch (err) {
        next(err)
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = res.locals

        const habitIndex = habits.findIndex(hab => hab.id === parseInt(id, 10));
        if (habitIndex === -1) {
            res.status(404).json({message: "Habits not found"})
            return;
        }

        const deletedHabit = habits[habitIndex]
        habits.splice(habitIndex, 1)
        res.status(200).json(deletedHabit)
    } catch (err) {
        next(err)
    }
}
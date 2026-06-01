import type {Request, Response, NextFunction} from "express";
import {type Habit, habits} from "../schemas/habit";
import {usersService} from "../services/habitsService";

// for testing purposes
export let nextId = 1

export const findMany = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(habits)
    } catch (err) {
        next(err)
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        if(!id){
            res.status(404).json({message: "Habit id is missing"})
            return
        }
        if (typeof id !== "string") {
            res.status(400).json({message: `Id ${id} doesn't represent a number`})
            return;
        }
        const habit = await usersService.findById(parseInt(id, 10))
        if (!habit) {
            res.status(404).json({message: `Cannot find habit with id ${id}`})
            return
        }
        res.json(habit)
    } catch (err) {
        next(err)
    }
}

export const create = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, frequency, startDate, endDate, frequencyPerWeek} = req.body;
        const newHabit: Habit = {
            id: nextId++,
            name,
            frequency,
            startDate,
            endDate,
            frequencyPerWeek
        }
        habits.push(newHabit);
        res.status(201).json(newHabit)
    } catch (err) {
        next(err)
    }
}

export const update = (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO get id from res.locale
        const {id} = req.params
        const {name, frequency, startDate, endDate, frequencyPerWeek} = req.body;
        if (typeof id !== "string") {
            res.status(400).json({message: `Id ${id} doesn't represent a number`})
            return;
        }

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

export const remove = (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    if (typeof id !== "string") {
        res.status(400).json({message: "Id must represent a number"})
        return;
    }

    const habitIndex = habits.findIndex(hab => hab.id === parseInt(id, 10));
    if (habitIndex === -1) {
        res.status(404).json({message: "Habits not found"})
        return;
    }

    const deletedHabit = habits[habitIndex]
    habits.splice(habitIndex, 1)
    res.status(200).json(deletedHabit)
}
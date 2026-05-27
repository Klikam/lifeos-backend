import type {Request, Response, NextFunction} from "express";
import {type Habit, habits} from "../models/habit.js";

const getHabits = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(habits)
    } catch (err) {
        next(err)
    }
}
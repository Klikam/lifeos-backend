import type {Habit} from "../schemas/habit";
import {prisma} from "../lib/prisma";


export const usersService = {
    async create(user: Habit) {

    },

    async findById(id: number) {
        const habit = prisma.habit.findUnique({
            where: { id }
        })

        if(!habit){
            throw new Error(`The habit with id: ${id} does not exist`)
        }
        return habit
    }
}
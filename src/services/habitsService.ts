import type {Habit} from "../schemas/habit";
import {prisma} from "../lib/prisma";

const findByName = async (name: string) => {
    const habit: Habit | null = await prisma.habit.findFirst({
        where: {
            name
        }
    })
    return habit
}


export const habitsService = {
    async create(data: Habit) {
        const exitingHabit: Habit | null = await findByName(data.name)
        if(exitingHabit){
            throw new Error(`Habit with name ${data.name} already exists`)
        }

        const createdHabit: Habit = await prisma.habit.create({
            data
        })
        return createdHabit
    },

    async findById(id: number) {
        const habit: Habit | null = await prisma.habit.findUnique({
            where: { id }
        })
        return habit
    },

    async findMany() {
        const habits: Habit[] = await prisma.habit.findMany();
        return habits
    },

    async update(id: number, data: Habit) {
        const existingHabit: Habit | null = await prisma.habit.findUnique({
            where: { id }
        })

        if(!existingHabit) {
            throw new Error(`Habit with id ${id} does not exist.`)
        }

        const newHabit: Habit = await prisma.habit.update({
            where: { id },
            data
        })
        return newHabit
    },

    async delete(id: number) {
        const habit: Habit | null = await this.findById(id)
        if(!habit){
            throw new Error(`Habit with id ${id} does not exist.`)
        }

        await prisma.habit.delete({
            where: {id}
        })
    }
}
import type { Habit, HabitCreate, HabitUpdate } from '../schemas/habit.js';
import { prisma } from '../lib/prisma.js';
import { omitUndefined } from '../lib/utils.js';

export const habitsService = {
  async findByName(name: string) {
    const habit: Habit | null = await prisma.habit.findFirst({
      where: {
        name,
      },
    });
    return habit;
  },

  async create(data: HabitCreate) {
    const exitingHabit: Habit | null = await this.findByName(data.name);
    if (exitingHabit) {
      throw new Error(`Habit with name ${data.name} already exists`);
    }

    const createdHabit: Habit = await prisma.habit.create({
      data: omitUndefined(data),
    });
    return createdHabit;
  },

  async findById(id: string) {
    const habit: Habit | null = await prisma.habit.findUnique({
      where: { id },
    });
    return habit;
  },

  async findMany() {
    const habits: Habit[] = await prisma.habit.findMany({
      include: {
        owner: true,
      },
    });
    return habits;
  },

  async update(id: string, data: HabitUpdate) {
    const existingHabit: Habit | null = await prisma.habit.findUnique({
      where: { id },
    });

    if (!existingHabit) {
      throw new Error(`Habit with id ${id} does not exist.`);
    }

    const newHabit: Habit = await prisma.habit.update({
      where: { id },
      data: omitUndefined(data),
    });
    return newHabit;
  },

  async delete(id: string) {
    const habit: Habit | null = await this.findById(id);
    if (!habit) {
      throw new Error(`Habit with id ${id} does not exist.`);
    }

    await prisma.habit.delete({
      where: { id },
    });
  },
};

import { prisma } from '../lib/prisma';
import type { User, UserCreate, UserUpdate } from '../schemas/user';
import { omitUndefined } from '../lib/utils';

export const usersService = {
  async findByEmail(email: string) {
    const user: User | null = await prisma.user.findFirst({
      where: { email },
      include: { habits: true },
    });
    return user;
  },

  async findById(id: string) {
    const user: User | null = await prisma.user.findUnique({
      where: { id },
      include: { habits: true },
    });
    return user;
  },

  async create(data: UserCreate) {
    const existingUser: User | null = await this.findByEmail(data.email);
    if (existingUser) {
      throw new Error(`User with email ${data.email} already exists`);
    }

    const createdUser: User = await prisma.user.create({
      data: omitUndefined(data),
      include: { habits: true },
    });
    return createdUser;
  },

  async update(id: string, data: UserUpdate) {
    const user: User | null = await this.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }

    const updatedUser: User = await prisma.user.update({
      where: { id },
      data: omitUndefined(data),
      include: { habits: true },
    });
    return updatedUser;
  },

  async delete(id: string) {
    const user: User | null = await this.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }

    await prisma.user.delete({
      where: { id },
    });
  },
};

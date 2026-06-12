import { usersService } from '../services/usersService';
import type { Request, Response, NextFunction } from 'express';
import type { User, UserCreate, UserUpdate } from '../schemas/user';

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = res.locals.id;
    console.log(`ID is ${id}`);
    const user: User | null = await usersService.findById(id);
    if (!user) {
      res.status(404).json({ message: `User with id ${id} does not exist` });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: UserCreate = req.body;
    const createdUser: User = await usersService.create(user);
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = res.locals.id;
    const newUser: UserUpdate = req.body;
    const updatedUser: User = await usersService.update(id, newUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = res.locals.id;
    await usersService.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

import { describe, it, expect, beforeEach } from 'vitest';
import { prismaMock, resetPrismaMock } from '../mocks/prisma.js';
import { habitsService } from '../../src/services/habitsService.js';
import type { HabitCreate, HabitUpdate } from '../../src/schemas/habit.js';

const habit = {
  id: 'habit-1',
  name: 'Run',
  frequency: 'DAILY' as const,
  startDate: '2026-01-01',
  endDate: null as string | null,
  frequencyPerWeek: null as number | null,
  ownerId: 'user-1',
};

beforeEach(() => {
  resetPrismaMock();
});

describe('habitsService.findByName', () => {
  it('returns the habit when found', async () => {
    prismaMock.habit.findFirst.mockResolvedValue(habit);

    const result = await habitsService.findByName('Run');

    expect(result).toEqual(habit);
    expect(prismaMock.habit.findFirst).toHaveBeenCalledWith({
      where: { name: 'Run' },
    });
  });

  it('returns null when not found', async () => {
    prismaMock.habit.findFirst.mockResolvedValue(null);

    const result = await habitsService.findByName('Missing');

    expect(result).toBeNull();
  });
});

describe('habitsService.create', () => {
  const createData: HabitCreate = {
    id: 'habit-1',
    name: 'Run',
    frequency: 'DAILY',
    startDate: '2026-01-01',
    ownerId: 'user-1',
  };

  it('throws if a habit with the same name already exists', async () => {
    prismaMock.habit.findFirst.mockResolvedValue(habit);

    await expect(habitsService.create(createData)).rejects.toThrow(
      `Habit with name ${createData.name} already exists`,
    );
    expect(prismaMock.habit.create).not.toHaveBeenCalled();
  });

  it('creates the habit with undefined fields stripped', async () => {
    prismaMock.habit.findFirst.mockResolvedValue(null);
    prismaMock.habit.create.mockResolvedValue(habit);

    const result = await habitsService.create(createData);

    expect(result).toEqual(habit);
    expect(prismaMock.habit.create).toHaveBeenCalledWith({
      data: createData,
    });
  });
});

describe('habitsService.findById', () => {
  it('returns the habit when found', async () => {
    prismaMock.habit.findUnique.mockResolvedValue(habit);

    const result = await habitsService.findById('habit-1');

    expect(result).toEqual(habit);
    expect(prismaMock.habit.findUnique).toHaveBeenCalledWith({
      where: { id: 'habit-1' },
    });
  });

  it('returns null when not found', async () => {
    prismaMock.habit.findUnique.mockResolvedValue(null);

    const result = await habitsService.findById('missing');

    expect(result).toBeNull();
  });
});

describe('habitsService.findMany', () => {
  it('includes the owner relation', async () => {
    prismaMock.habit.findMany.mockResolvedValue([habit] as never);

    const result = await habitsService.findMany();

    expect(result).toEqual([habit]);
    expect(prismaMock.habit.findMany).toHaveBeenCalledWith({
      include: { owner: true },
    });
  });
});

describe('habitsService.update', () => {
  const updateData: HabitUpdate = { name: 'Swim' };

  it('throws if the habit does not exist', async () => {
    prismaMock.habit.findUnique.mockResolvedValue(null);

    await expect(habitsService.update('missing', updateData)).rejects.toThrow(
      'Habit with id missing does not exist.',
    );
    expect(prismaMock.habit.update).not.toHaveBeenCalled();
  });

  it('updates the habit with undefined fields stripped', async () => {
    prismaMock.habit.findUnique.mockResolvedValue(habit);
    const updatedHabit = { ...habit, name: 'Swim' };
    prismaMock.habit.update.mockResolvedValue(updatedHabit);

    const result = await habitsService.update('habit-1', updateData);

    expect(result).toEqual(updatedHabit);
    expect(prismaMock.habit.update).toHaveBeenCalledWith({
      where: { id: 'habit-1' },
      data: updateData,
    });
  });
});

describe('habitsService.delete', () => {
  it('throws if the habit does not exist', async () => {
    prismaMock.habit.findUnique.mockResolvedValue(null);

    await expect(habitsService.delete('missing')).rejects.toThrow(
      'Habit with id missing does not exist.',
    );
    expect(prismaMock.habit.delete).not.toHaveBeenCalled();
  });

  it('deletes the habit when it exists', async () => {
    prismaMock.habit.findUnique.mockResolvedValue(habit);
    prismaMock.habit.delete.mockResolvedValue(habit);

    await habitsService.delete('habit-1');

    expect(prismaMock.habit.delete).toHaveBeenCalledWith({
      where: { id: 'habit-1' },
    });
  });
});

import { describe, it, expect } from 'vitest';
import {
  HabitCreateSchema,
  HabitUpdateSchema,
} from '../../src/schemas/habit.js';

const validHabit = {
  id: 'habit-1',
  name: 'Run',
  frequency: 'DAILY' as const,
  startDate: '2026-01-01',
  ownerId: 'user-1',
};

describe('HabitCreateSchema', () => {
  it('accepts a valid habit', () => {
    const result = HabitCreateSchema.safeParse(validHabit);
    expect(result.success).toBe(true);
  });

  it.each(['id', 'name', 'frequency', 'startDate', 'ownerId'])(
    'rejects when %s is missing',
    field => {
      const { [field]: _omitted, ...rest } = validHabit as Record<
        string,
        unknown
      >;
      const result = HabitCreateSchema.safeParse(rest);
      expect(result.success).toBe(false);
    },
  );

  it('rejects N_PER_WEEK frequency without frequencyPerWeek', () => {
    const result = HabitCreateSchema.safeParse({
      ...validHabit,
      frequency: 'N_PER_WEEK',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['frequencyPerWeek']);
    }
  });

  it('accepts N_PER_WEEK frequency with frequencyPerWeek', () => {
    const result = HabitCreateSchema.safeParse({
      ...validHabit,
      frequency: 'N_PER_WEEK',
      frequencyPerWeek: 3,
    });
    expect(result.success).toBe(true);
  });

  it('rejects an endDate before startDate', () => {
    const result = HabitCreateSchema.safeParse({
      ...validHabit,
      startDate: '2026-01-10',
      endDate: '2026-01-01',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['endDate']);
    }
  });

  it('accepts an endDate on or after startDate', () => {
    const result = HabitCreateSchema.safeParse({
      ...validHabit,
      startDate: '2026-01-01',
      endDate: '2026-01-01',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid date format', () => {
    const result = HabitCreateSchema.safeParse({
      ...validHabit,
      startDate: '01/01/2026',
    });
    expect(result.success).toBe(false);
  });
});

describe('HabitUpdateSchema', () => {
  it('accepts an empty object (all fields optional)', () => {
    const result = HabitUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('accepts a partial update', () => {
    const result = HabitUpdateSchema.safeParse({ name: 'Swim' });
    expect(result.success).toBe(true);
  });

  it('rejects N_PER_WEEK frequency without frequencyPerWeek', () => {
    const result = HabitUpdateSchema.safeParse({ frequency: 'N_PER_WEEK' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['frequencyPerWeek']);
    }
  });

  it('rejects endDate before startDate when both are provided', () => {
    const result = HabitUpdateSchema.safeParse({
      startDate: '2026-02-01',
      endDate: '2026-01-01',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['endDate']);
    }
  });

  it('accepts endDate after startDate when both are provided', () => {
    const result = HabitUpdateSchema.safeParse({
      startDate: '2026-01-01',
      endDate: '2026-02-01',
    });
    expect(result.success).toBe(true);
  });
});

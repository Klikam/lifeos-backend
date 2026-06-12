import { describe, it, expect, beforeEach } from 'vitest';
import { prismaMock, resetPrismaMock } from '../mocks/prisma.js';
import { usersService } from '../../src/services/usersService.js';
import type { UserCreate, UserUpdate } from '../../src/schemas/user.js';

const user = {
  id: 'user-1',
  name: 'Jane Doe' as string | null,
  email: 'jane@example.com',
  image: null as string | null,
  emailVerified: false,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-01T00:00:00Z'),
};

const userWithHabits = { ...user, habits: [] };

beforeEach(() => {
  resetPrismaMock();
});

describe('usersService.findByEmail', () => {
  it('returns the user with habits when found', async () => {
    prismaMock.user.findFirst.mockResolvedValue(userWithHabits as never);

    const result = await usersService.findByEmail('jane@example.com');

    expect(result).toEqual(userWithHabits);
    expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
      where: { email: 'jane@example.com' },
      include: { habits: true },
    });
  });

  it('returns null when not found', async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    const result = await usersService.findByEmail('missing@example.com');

    expect(result).toBeNull();
  });
});

describe('usersService.findById', () => {
  it('returns the user with habits when found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userWithHabits as never);

    const result = await usersService.findById('user-1');

    expect(result).toEqual(userWithHabits);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      include: { habits: true },
    });
  });

  it('returns null when not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await usersService.findById('missing');

    expect(result).toBeNull();
  });
});

describe('usersService.create', () => {
  const createData: UserCreate = {
    id: 'user-1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    emailVerified: false,
  };

  it('throws if a user with the same email already exists', async () => {
    prismaMock.user.findFirst.mockResolvedValue(userWithHabits as never);

    await expect(usersService.create(createData)).rejects.toThrow(
      `User with email ${createData.email} already exists`,
    );
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it('creates the user with undefined fields stripped', async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(userWithHabits as never);

    const result = await usersService.create(createData);

    expect(result).toEqual(userWithHabits);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: createData,
      include: { habits: true },
    });
  });
});

describe('usersService.update', () => {
  const updateData: UserUpdate = { name: 'New Name' };

  it('throws if the user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(usersService.update('missing', updateData)).rejects.toThrow(
      'User with id missing does not exist',
    );
    expect(prismaMock.user.update).not.toHaveBeenCalled();
  });

  it('updates the user with undefined fields stripped', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userWithHabits as never);
    const updatedUser = { ...userWithHabits, name: 'New Name' };
    prismaMock.user.update.mockResolvedValue(updatedUser as never);

    const result = await usersService.update('user-1', updateData);

    expect(result).toEqual(updatedUser);
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: updateData,
      include: { habits: true },
    });
  });
});

describe('usersService.delete', () => {
  it('throws if the user does not exist', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(usersService.delete('missing')).rejects.toThrow(
      'User with id missing does not exist',
    );
    expect(prismaMock.user.delete).not.toHaveBeenCalled();
  });

  it('deletes the user when it exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userWithHabits as never);
    prismaMock.user.delete.mockResolvedValue(userWithHabits as never);

    await usersService.delete('user-1');

    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: 'user-1' },
    });
  });
});

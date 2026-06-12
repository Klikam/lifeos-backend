import { describe, it, expect } from 'vitest';
import { UserCreateSchema, UserUpdateSchema } from '../../src/schemas/user.js';

const validUser = {
  id: 'user-1',
  name: 'Jane Doe',
  email: 'jane@example.com',
};

describe('UserCreateSchema', () => {
  it('accepts a valid user', () => {
    const result = UserCreateSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('defaults emailVerified to false when omitted', () => {
    const result = UserCreateSchema.safeParse(validUser);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.emailVerified).toBe(false);
    }
  });

  it('rejects an invalid email address', () => {
    const result = UserCreateSchema.safeParse({
      ...validUser,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid image URL', () => {
    const result = UserCreateSchema.safeParse({
      ...validUser,
      image: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('accepts a null image', () => {
    const result = UserCreateSchema.safeParse({
      ...validUser,
      image: null,
    });
    expect(result.success).toBe(true);
  });

  it('rejects a missing id', () => {
    const { id: _id, ...rest } = validUser;
    const result = UserCreateSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

describe('UserUpdateSchema', () => {
  it('accepts an empty object (all fields optional)', () => {
    const result = UserUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('accepts a partial update', () => {
    const result = UserUpdateSchema.safeParse({ name: 'New Name' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty name', () => {
    const result = UserUpdateSchema.safeParse({ name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = UserUpdateSchema.safeParse({ email: 'invalid' });
    expect(result.success).toBe(false);
  });
});

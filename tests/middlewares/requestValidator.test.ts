import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import {
  habitsValidator,
  idValidator,
} from '../../src/middlewares/requestValidator.js';

const createRes = () => {
  const res: Partial<Response> = {
    locals: {},
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
  return res as Response;
};

let next: NextFunction;

beforeEach(() => {
  next = vi.fn();
});

describe('habitsValidator', () => {
  const validBody = {
    name: 'Run',
    frequency: 'DAILY' as const,
    startDate: '2026-01-01',
    ownerId: 'user-1',
  };

  it('calls next and strips the id field on a valid body', () => {
    const req = { body: { ...validBody, id: 'should-be-ignored' } } as Request;
    const res = createRes();

    habitsValidator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.body).toEqual(validBody);
  });

  it('responds with 400 and validation details on an invalid body', () => {
    const req = { body: { name: '' } } as Request;
    const res = createRes();

    habitsValidator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Validation error' }),
    );
  });
});

describe('idValidator', () => {
  it('sets res.locals.id and calls next for a valid id param', () => {
    const req = { params: { id: 'habit-1' } } as unknown as Request;
    const res = createRes();

    idValidator(req, res, next);

    expect(res.locals.id).toBe('habit-1');
    expect(next).toHaveBeenCalledOnce();
  });

  it('responds with 400 when id param is missing', () => {
    const req = { params: {} } as unknown as Request;
    const res = createRes();

    idValidator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Validation error' }),
    );
  });
});

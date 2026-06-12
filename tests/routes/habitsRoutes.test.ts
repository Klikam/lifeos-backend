import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import '../mocks/prisma.js';

vi.mock('../../src/services/habitsService.js', () => ({
  habitsService: {
    findMany: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const { habitsService } = await import('../../src/services/habitsService.js');
const { default: app } = await import('../../src/app.js');

const habit = {
  id: 'habit-1',
  name: 'Run',
  frequency: 'DAILY' as const,
  startDate: '2026-01-01',
  endDate: null,
  frequencyPerWeek: null,
  ownerId: 'user-1',
};

const validBody = {
  name: 'Run',
  frequency: 'DAILY',
  startDate: '2026-01-01',
  ownerId: 'user-1',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/habits', () => {
  it('returns the list of habits', async () => {
    vi.mocked(habitsService.findMany).mockResolvedValue([habit] as never);

    const res = await request(app).get('/api/habits');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([habit]);
  });
});

describe('GET /api/habits/:id', () => {
  it('returns the habit when found', async () => {
    vi.mocked(habitsService.findById).mockResolvedValue(habit as never);

    const res = await request(app).get('/api/habits/habit-1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(habit);
    expect(habitsService.findById).toHaveBeenCalledWith('habit-1');
  });

  it('returns 404 when the habit does not exist', async () => {
    vi.mocked(habitsService.findById).mockResolvedValue(null);

    const res = await request(app).get('/api/habits/missing');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: 'Cannot find habit with id missing',
    });
  });
});

describe('POST /api/habits', () => {
  it('creates a habit and returns 201', async () => {
    vi.mocked(habitsService.create).mockResolvedValue(habit as never);

    const res = await request(app).post('/api/habits').send(validBody);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(habit);
    expect(habitsService.create).toHaveBeenCalledWith(validBody);
  });

  it('returns 400 on an invalid body', async () => {
    const res = await request(app)
      .post('/api/habits')
      .send({ name: '' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Validation error');
    expect(habitsService.create).not.toHaveBeenCalled();
  });
});

describe('PUT /api/habits/:id', () => {
  it('updates a habit and returns 200', async () => {
    const updated = { ...habit, name: 'Swim' };
    vi.mocked(habitsService.update).mockResolvedValue(updated as never);

    const res = await request(app)
      .put('/api/habits/habit-1')
      .send({ ...validBody, name: 'Swim' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
    expect(habitsService.update).toHaveBeenCalledWith('habit-1', {
      ...validBody,
      name: 'Swim',
    });
  });

  it('returns 400 on an invalid body', async () => {
    const res = await request(app)
      .put('/api/habits/habit-1')
      .send({ frequency: 'INVALID' });

    expect(res.status).toBe(400);
    expect(habitsService.update).not.toHaveBeenCalled();
  });
});

describe('DELETE /api/habits/:id', () => {
  it('deletes a habit and returns 204', async () => {
    vi.mocked(habitsService.delete).mockResolvedValue(undefined);

    const res = await request(app).delete('/api/habits/habit-1');

    expect(res.status).toBe(204);
    expect(habitsService.delete).toHaveBeenCalledWith('habit-1');
  });
});

describe('error handling', () => {
  it('returns 500 when the service throws', async () => {
    vi.mocked(habitsService.findMany).mockRejectedValue(
      new Error('Database error'),
    );

    const res = await request(app).get('/api/habits');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Database error' });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import '../mocks/prisma.js';

vi.mock('../../src/services/usersService.js', () => ({
  usersService: {
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const { usersService } = await import('../../src/services/usersService.js');
const { default: app } = await import('../../src/app.js');

const user = {
  id: 'user-1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  image: null,
  emailVerified: false,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  habits: [],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/users/:id', () => {
  it('returns the user when found', async () => {
    vi.mocked(usersService.findById).mockResolvedValue(user as never);

    const res = await request(app).get('/api/users/user-1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(user);
    expect(usersService.findById).toHaveBeenCalledWith('user-1');
  });

  it('returns 404 when the user does not exist', async () => {
    vi.mocked(usersService.findById).mockResolvedValue(null);

    const res = await request(app).get('/api/users/missing');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: 'User with id missing does not exist',
    });
  });
});

describe('POST /api/users', () => {
  it('creates a user and returns 201', async () => {
    const createBody = {
      id: 'user-1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      emailVerified: false,
    };
    vi.mocked(usersService.create).mockResolvedValue(user as never);

    const res = await request(app).post('/api/users').send(createBody);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(user);
    expect(usersService.create).toHaveBeenCalledWith(createBody);
  });
});

describe('PUT /api/users/:id', () => {
  it('updates a user and returns 200', async () => {
    const updated = { ...user, name: 'New Name' };
    vi.mocked(usersService.update).mockResolvedValue(updated as never);

    const res = await request(app)
      .put('/api/users/user-1')
      .send({ name: 'New Name' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
    expect(usersService.update).toHaveBeenCalledWith('user-1', {
      name: 'New Name',
    });
  });
});

describe('DELETE /api/users/:id', () => {
  it('deletes a user and returns 204', async () => {
    vi.mocked(usersService.delete).mockResolvedValue(undefined);

    const res = await request(app).delete('/api/users/user-1');

    expect(res.status).toBe(204);
    expect(usersService.delete).toHaveBeenCalledWith('user-1');
  });
});

describe('error handling', () => {
  it('returns 500 when the service throws', async () => {
    vi.mocked(usersService.findById).mockRejectedValue(
      new Error('Database error'),
    );

    const res = await request(app).get('/api/users/user-1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Database error' });
  });
});

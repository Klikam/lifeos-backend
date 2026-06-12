import { vi } from 'vitest';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import { prisma } from '../../src/lib/prisma.js';
import type { PrismaClient } from '../../src/generated/prisma/client.js';

vi.mock('../../src/lib/prisma.js', () => ({
  prisma: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

export const resetPrismaMock = () => mockReset(prismaMock);

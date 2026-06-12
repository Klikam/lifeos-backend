// Provide placeholder env vars so config modules don't throw on import,
// since prisma/auth modules read them eagerly at module load time.
process.env.DATABASE_URL ??= 'postgresql://test:test@localhost:5432/test';
process.env.BETTER_AUTH_SECRET ??= 'test-secret';

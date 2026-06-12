import { describe, it, expect } from 'vitest';
import { omitUndefined } from '../../src/lib/utils.js';

describe('omitUndefined', () => {
  it('removes keys with undefined values', () => {
    const result = omitUndefined({ a: 1, b: undefined, c: 'x' });
    expect(result).toEqual({ a: 1, c: 'x' });
    expect('b' in result).toBe(false);
  });

  it('keeps falsy but defined values', () => {
    const result = omitUndefined({ a: 0, b: false, c: '', d: null });
    expect(result).toEqual({ a: 0, b: false, c: '', d: null });
  });

  it('returns an empty object when all values are undefined', () => {
    const result = omitUndefined({ a: undefined, b: undefined });
    expect(result).toEqual({});
  });

  it('does not mutate the original object', () => {
    const input = { a: 1, b: undefined };
    omitUndefined(input);
    expect(input).toEqual({ a: 1, b: undefined });
  });
});

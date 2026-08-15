import { describe, expect, it } from 'vitest';
import { literalValue, normalizeRecord, toField, toU128, toU32 } from './aleoLiterals';

describe('Aleo literal validation', () => {
  it('normalizes supported unsigned literals', () => {
    expect(toField('1_001field')).toBe('1001field');
    expect(toU32('42')).toBe('42u32');
    expect(toU128('10_000')).toBe('10000u128');
    expect(literalValue('10_000', 'u128')).toBe(10_000n);
  });

  it('rejects malformed and out-of-range literals', () => {
    expect(() => toField('')).toThrow(/unsigned decimal/i);
    expect(() => toU32('-1')).toThrow(/unsigned decimal/i);
    expect(() => toU128('10u64')).toThrow(/unsigned decimal/i);
    expect(() => toU128('1__000')).toThrow(/unsigned decimal/i);
    expect(() => toU32('4294967296')).toThrow(/out of range/i);
  });

  it('requires a bounded private record', () => {
    expect(normalizeRecord('  { owner: private }  ', 'Record')).toBe('{ owner: private }');
    expect(() => normalizeRecord(' ', 'Record')).toThrow(/required/i);
  });
});

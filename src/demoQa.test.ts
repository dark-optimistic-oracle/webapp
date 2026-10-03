import { beforeEach, describe, expect, it } from 'vitest';
import { demoQaEnabled, demoQaFee, recordLabel, recordPlaintext } from './demoQa';

describe('explicit demo QA tools', () => {
  beforeEach(() => window.history.replaceState({}, '', '/'));
  it('does not lower ordinary fees or enable tools without both opt-ins', () => {
    expect(demoQaEnabled()).toBe(false); expect(demoQaFee(1_000_000)).toBe(1_000_000);
    window.history.replaceState({}, '', '/?demo=demo-20261003');
    expect(demoQaEnabled()).toBe(false);
    window.history.replaceState({}, '', '/?demo=demo-20261003&demoTools=1');
    expect(demoQaEnabled()).toBe(true); expect(demoQaFee(1_000_000)).toBe(10_000);
  });
  it('extracts only recognizable record plaintext and labels without private fields', () => {
    const plain = '{ owner: aleo1test.private, assertion_id: 2026100302field.private, _nonce: 1group.public }';
    expect(recordPlaintext({ plaintext: plain })).toBe(plain);
    expect(recordPlaintext({ record: 'record1ciphertext' })).toBeNull();
    expect(recordPlaintext({ plaintext: 'not a record' })).toBeNull();
    expect(recordLabel(plain, 0)).toBe('Record 1: Voting right for 2026100302field');
    expect(recordLabel(plain, 0)).not.toContain('aleo1test');
  });
});

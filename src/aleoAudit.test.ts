import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  beginAleoCall,
  buildAleoAuditMarkdown,
  completeAleoCall,
  formatAleoAuditInputs,
} from './aleoAudit';

describe('persistent Aleo audit journal', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('automatically retains calls and exports human-readable Markdown with JSON evidence', () => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const audit = beginAleoCall({
      kind: 'read',
      network: 'testnet',
      description: 'Read the latest Aleo Testnet block height',
      function: 'get_latest_block_height',
      parameters: {
        httpMethod: 'GET',
        url: 'https://api.provable.com/v2/testnet/block/height/latest',
      },
    });
    completeAleoCall(audit, 'response', {
      result: { httpStatus: 200, ok: true },
    });

    const markdown = buildAleoAuditMarkdown();
    expect(markdown).toContain('# Dark Optimistic Oracle webapp Aleo call log');
    expect(markdown).toContain('**What happened:** The frontend requested');
    expect(markdown).toContain('**What happened:** The public provider completed the read.');
    expect(markdown).toContain('get_latest_block_height');
    expect(markdown).toContain('"httpStatus": 200');
  });

  it('persists only the redacted form of a private record', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const privateRecord = '{ owner: aleo1secret, amount: 1000000u128.private }';
    const inputs = await formatAleoAuditInputs(
      [privateRecord, '187031922field'],
      ['payment', 'assertion_id'],
    );

    beginAleoCall({
      kind: 'transaction',
      network: 'testnet',
      description: 'Submit dark_optimistic_oracle.aleo.new_voting_right',
      program: 'dark_optimistic_oracle.aleo',
      function: 'new_voting_right',
      parameters: { inputs },
    });

    const markdown = buildAleoAuditMarkdown();
    expect(markdown).not.toContain(privateRecord);
    expect(markdown).not.toContain('aleo1secret');
    expect(markdown).toContain('private Aleo record');
    expect(markdown).toContain('"redacted": true');
  });
});

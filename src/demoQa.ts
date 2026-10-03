import { getAleoDemoContext } from './aleoAudit';

/** Record tools require a separate explicit opt-in, not merely a screenshot label. */
export function demoQaEnabled() {
  return Boolean(getAleoDemoContext()) && new URLSearchParams(window.location.search).get('demoTools') === '1';
}

/** Reduce optional priority fees for the authorized bounded-budget QA run. */
export function demoQaFee(normalFee: number) {
  return demoQaEnabled() ? 10_000 : normalFee;
}

export function recordPlaintext(value: unknown, depth = 0): string | null {
  if (depth > 3) return null;
  if (typeof value === 'string') {
    return value.trim().startsWith('{') && /\bowner\s*:\s*aleo1[a-z0-9]+\.private/.test(value)
      ? value.trim() : null;
  }
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  for (const name of ['plaintext', 'recordPlaintext', 'record_plaintext', 'record']) {
    const plain = recordPlaintext(row[name], depth + 1);
    if (plain) return plain;
  }
  return null;
}

/** Only public assertion identifiers and record kinds appear in selection labels. */
export function recordLabel(plain: string, index: number) {
  const assertion = plain.match(/assertion_id\s*:\s*(\d+field)/)?.[1];
  const kind = assertion ? (/\boutcome\s*:/.test(plain) ? 'Voting receipt' : 'Voting right') : 'Token record';
  return `Record ${index + 1}: ${kind}${assertion ? ` for ${assertion}` : ''}`;
}

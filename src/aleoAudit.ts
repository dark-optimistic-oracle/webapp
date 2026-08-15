export type AleoAuditCall = {
  kind: 'read' | 'transaction';
  description: string;
  network: 'testnet';
  program?: string;
  function: string;
  parameters: Record<string, unknown>;
};

export type AleoAuditContext = {
  callId: string;
  call: AleoAuditCall;
};

type AleoAuditPhase = 'request' | 'response' | 'submitted' | 'error';

export type AleoAuditEntry = AleoAuditCall & {
  schema: 'aleo-browser-audit/v1';
  sequence: number;
  timestamp: string;
  callId: string;
  phase: AleoAuditPhase;
  result?: Record<string, unknown>;
  error?: string;
};

let auditSequence = 0;
let callSequence = 0;

const AUDIT_STORAGE_KEY = 'dark-optimistic-oracle:webapp:aleo-audit:v1';
const MAX_PERSISTED_ENTRIES = 2_000;

const PRIVATE_RECORD_INPUT_NAMES = new Set([
  'payment',
  'voting_right',
  'voting_receipt',
]);

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function readAuditJournal(): AleoAuditEntry[] {
  try {
    const stored = window.localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed as AleoAuditEntry[] : [];
  } catch {
    return [];
  }
}

function persistAuditEntry(entry: AleoAuditEntry) {
  try {
    const entries = [...readAuditJournal(), entry].slice(-MAX_PERSISTED_ENTRIES);
    window.localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Console logging remains available if browser storage is disabled or full.
  }
}

function humanExplanation(entry: AleoAuditEntry) {
  if (entry.phase === 'request' && entry.kind === 'read') {
    return `The frontend requested: ${entry.description}. The parameters below identify the exact public provider call.`;
  }
  if (entry.phase === 'request') {
    return `The frontend prepared ${entry.program ?? 'the Aleo network'}.${entry.function} and handed the displayed parameters to Shield for interactive approval.`;
  }
  if (entry.phase === 'submitted') {
    return 'Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.';
  }
  if (entry.phase === 'error') {
    return `The operation failed without a successful terminal response${entry.error ? `: ${entry.error}` : '.'}`;
  }
  if (entry.kind === 'read') {
    return `The public provider completed the read. HTTP result: ${JSON.stringify(entry.result ?? {})}.`;
  }

  const status = typeof entry.result?.walletStatus === 'string'
    ? entry.result.walletStatus
    : 'unknown';
  const transactionId = typeof entry.result?.onchainTransactionId === 'string'
    ? entry.result.onchainTransactionId
    : null;
  return transactionId
    ? `Shield reported ${status}. The accepted on-chain transaction ID is ${transactionId}.`
    : `Shield reported ${status}; no accepted on-chain transaction ID was returned.`;
}

export function buildAleoAuditMarkdown() {
  const entries = readAuditJournal();
  const lines = [
    '# Dark Optimistic Oracle webapp Aleo call log',
    '',
    `Generated: ${new Date().toISOString()}.`,
    '',
    '> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.',
    '',
  ];

  if (entries.length === 0) {
    lines.push('No Aleo calls are currently retained in this browser.', '');
  }

  entries.forEach((entry, index) => {
    lines.push(
      `## ${index + 1}. ${entry.description}`,
      '',
      `**What happened:** ${humanExplanation(entry)}`,
      '',
      `- Time: ${entry.timestamp}`,
      `- Phase: \`${entry.phase}\``,
      `- Kind: \`${entry.kind}\``,
      `- Call ID: \`${entry.callId}\``,
      `- Program: \`${entry.program ?? 'network endpoint'}\``,
      `- Function: \`${entry.function}\``,
      '',
      '```json',
      JSON.stringify(entry, null, 2),
      '```',
      '',
    );
  });

  return lines.join('\n');
}

export function downloadAleoAuditMarkdown() {
  const blob = new Blob([buildAleoAuditMarkdown()], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'LOG.md';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export async function formatAleoAuditInputs(inputs: string[], inputNames: string[]) {
  return Promise.all(inputs.map(async (value, index) => {
    const name = inputNames[index] ?? `input_${index}`;
    if (!PRIVATE_RECORD_INPUT_NAMES.has(name)) {
      return { position: index, name, value };
    }

    return {
      position: index,
      name,
      value: {
        redacted: true,
        classification: 'private Aleo record',
        sha256: await sha256(value),
        plaintextLength: value.length,
      },
    };
  }));
}

function writeAuditEntry(
  context: AleoAuditContext,
  phase: AleoAuditPhase,
  details: Record<string, unknown> = {},
) {
  const entry = {
    schema: 'aleo-browser-audit/v1',
    sequence: ++auditSequence,
    timestamp: new Date().toISOString(),
    callId: context.callId,
    phase,
    ...context.call,
    ...details,
  } as AleoAuditEntry;

  // Serialize immediately so later object mutation cannot alter an audit line.
  console.info('[Aleo audit]', JSON.stringify(entry));
  persistAuditEntry(entry);
}

export function beginAleoCall(call: AleoAuditCall): AleoAuditContext {
  const context = {
    callId: `aleo-call-${++callSequence}`,
    call: {
      ...call,
      parameters: structuredClone(call.parameters),
    },
  };
  writeAuditEntry(context, 'request');
  return context;
}

export function completeAleoCall(
  context: AleoAuditContext,
  phase: 'response' | 'submitted',
  details: Record<string, unknown> = {},
) {
  writeAuditEntry(context, phase, details);
}

export function failAleoCall(context: AleoAuditContext, error: unknown) {
  writeAuditEntry(context, 'error', {
    error: error instanceof Error ? error.message : String(error),
  });
}

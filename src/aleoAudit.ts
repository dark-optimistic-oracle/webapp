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

let auditSequence = 0;
let callSequence = 0;

const PRIVATE_RECORD_INPUT_NAMES = new Set([
  'payment',
  'voting_right',
  'voting_receipt',
]);

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
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
  phase: 'request' | 'response' | 'submitted' | 'error',
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
  };

  // Serialize immediately so later object mutation cannot alter an audit line.
  console.info('[Aleo audit]', JSON.stringify(entry));
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

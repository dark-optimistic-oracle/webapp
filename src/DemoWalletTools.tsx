import { useRef, useState } from 'react';
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react';
import { beginAleoCall, completeAleoCall, failAleoCall, formatAleoAuditInputs } from './aleoAudit';
import { waitForWalletTransaction } from './aleoTransactionStatus';
import { demoQaEnabled, recordLabel, recordPlaintext } from './demoQa';

export type DemoRecordTarget = 'payment' | 'right' | 'receipt' | 'refund';
const DOOR_ID = '346688784394585735039324415800163929700021701423791533632764818774905958305field';

/** Testnet-only self-funding and record access, visible only with demoTools=1.
 * Plaintext stays in component memory and the chosen existing form input.
 * No records are persisted, exported, copied to clipboard, or logged here.
 */
export default function DemoWalletTools({ onRecord, includeAwards = true, disabled = false, onBusyChange }: {
  onRecord: (target: DemoRecordTarget, plaintext: string) => void;
  includeAwards?: boolean;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
}) {
  const { connected, address, executeTransaction, transactionStatus, requestRecords } = useWallet();
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [notice, setNotice] = useState('');
  const [target, setTarget] = useState<DemoRecordTarget>('payment');
  const [records, setRecords] = useState<string[]>([]);
  const [selection, setSelection] = useState('0');
  if (!demoQaEnabled()) return null;

  const fund = async (door: boolean) => {
    if (!connected || !address || lock.current || disabled) return;
    lock.current = true;
    setBusy(true);
    onBusyChange?.(true);
    const program = door ? 'token_registry.aleo' : 'credits.aleo';
    const inputs = door ? [DOOR_ID, address, '1000u128', 'false'] : [address, '3000000u64'];
    const names = door ? ['token_id', 'recipient', 'amount', 'external_authorization_required'] : ['recipient', 'amount'];
    let audit: ReturnType<typeof beginAleoCall> | undefined;
    try {
      audit = beginAleoCall({ kind: 'transaction', network: 'testnet', program,
        function: 'transfer_public_to_private', description: `Prepare QA private ${door ? 'DOOR' : 'fee credits'} in the connected wallet`,
        parameters: { caller: address, inputs: await formatAleoAuditInputs(inputs, names), fee: 10_000, privateFee: false } });
      const result = await executeTransaction({ program, function: 'transfer_public_to_private', inputs, fee: 10_000, privateFee: false });
      const walletRequestId = result?.transactionId;
      completeAleoCall(audit, 'submitted', { result: { walletRequestId } });
      if (!walletRequestId) throw new Error('No trackable wallet request was returned.');
      setNotice('Preparation submitted; waiting for Testnet acceptance.');
      const state = await waitForWalletTransaction(transactionStatus, walletRequestId);
      completeAleoCall(audit, 'response', { result: { walletRequestId, walletStatus: state.status,
        onchainTransactionId: state.status.toLowerCase() === 'accepted' ? state.transactionId : null,
        statusPollAttempts: state.attempts, timedOut: state.timedOut } });
      setNotice(`${program} preparation ${state.status}. Transaction: ${state.transactionId ?? 'not returned'}`);
    } catch {
      if (audit) failAleoCall(audit, new Error('QA preparation failed; inspect the wallet for details.'));
      setNotice('Preparation failed. Inspect Shield; do not blindly repeat a transaction with unknown finality.');
    } finally { lock.current = false; setBusy(false); onBusyChange?.(false); }
  };

  const load = async () => {
    if (!connected || lock.current || disabled) return;
    lock.current = true; setBusy(true); setRecords([]);
    onBusyChange?.(true);
    const program = target === 'payment' ? 'token_registry.aleo' : 'dark_optimistic_oracle.aleo';
    const audit = beginAleoCall({ kind: 'read', network: 'testnet', program,
      function: 'wallet_request_records', description: `Read unspent QA records from Shield for ${program}`,
      parameters: { source: 'Shield wallet', program, includePlaintext: true, statusFilter: 'unspent' } });
    try {
      const rows = await requestRecords(program, true, 'unspent');
      const plaintexts = rows.map(row => recordPlaintext(row)).filter((row): row is string => row !== null);
      setRecords(plaintexts); setSelection('0');
      // Only counts are retained as evidence of this wallet read, never row data.
      completeAleoCall(audit, 'response', { result: { recordCount: rows.length, usableRecordCount: plaintexts.length } });
      const keys = [...new Set(rows.flatMap(row => row && typeof row === 'object' ? Object.keys(row) : []))];
      setNotice(`Shield returned ${rows.length} unspent rows; ${plaintexts.length} usable records. Field names: ${keys.join(', ') || 'none'}.`);
    } catch {
      failAleoCall(audit, new Error('Shield record lookup failed; record contents were not logged.'));
      setNotice('Record lookup failed. Check the Shield permission prompt.');
    } finally { lock.current = false; setBusy(false); onBusyChange?.(false); }
  };

  return <details style={{ padding: 16, border: '1px solid #38786b', marginBlock: 16 }}>
    <summary>QA private record preparation</summary>
    <p>Testnet only. Each preparation transfers to the connected wallet itself and requires Shield approval.
      Fees shown here are optional priority fees; inspect Shield for the full network fee.
      Do not capture screenshots while private form inputs are filled.</p>
    <button disabled={!connected || busy || disabled} onClick={() => void fund(true)}>Prepare 1000 private DOOR units</button>{' '}
    <button disabled={!connected || busy || disabled} onClick={() => void fund(false)}>Prepare 3 private fee ALEO</button>
    <label>Record destination <select value={target} disabled={busy || disabled} onChange={event => {
      setTarget(event.target.value as DemoRecordTarget); setRecords([]);
    }}>
      <option value="payment">Private DOOR payment</option><option value="right">Voting right</option>
      {includeAwards && <><option value="receipt">Voting receipt</option><option value="refund">Unused voting right refund</option></>}
    </select></label>
    <button disabled={!connected || busy || disabled} onClick={() => void load()}>Load unspent records from Shield</button>
    <label>Select QA record <select value={selection} disabled={busy || disabled || !records.length} onChange={event => setSelection(event.target.value)}>
      {records.map((plain, index) => <option key={index} value={index}>{recordLabel(plain, index)}</option>)}
    </select></label>
    <button disabled={busy || disabled || !records[Number(selection)]} onClick={() => {
      onRecord(target, records[Number(selection)]); setRecords([]); setNotice('Selected record placed in the form. Keep plaintext off-camera.');
    }}>Use selected record in form</button>
    <p role="status" aria-label="QA preparation status">{notice}</p>
  </details>;
}

import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Gavel,
  KeyRound,
  LockKeyhole,
  RadioTower,
  ShieldCheck,
} from 'lucide-react';
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react';
import {
  beginAleoCall,
  completeAleoCall,
  downloadAleoAuditMarkdown,
  failAleoCall,
  formatAleoAuditInputs,
  type AleoAuditCall,
} from './aleoAudit';
import { waitForWalletTransaction } from './aleoTransactionStatus';
import {
  literalValue,
  normalizeRecord,
  toField,
  toU128,
  toU32,
} from './aleoLiterals';

const DOO_PROGRAM_ID = 'dark_optimistic_oracle.aleo';
const DEFAULT_ASSERTION_ID = '123';
const DEFAULT_TITLE_FIELD = '456';
const DEFAULT_CONTENT_FIELD = '789field';
const DEFAULT_ASSERTION_COST = '100_000_000';
const DEFAULT_VOTER_STAKE = '1_000_000';
const DEFAULT_DISPUTE_DEADLINE = '10000';
const DEFAULT_VOTING_DEADLINE = '20000';
const DEFAULT_AWARD = '1_010_000';
const DEFAULT_ASSERTER_PAYOUT = '90_000_000';
const DEFAULT_DISPUTER_PAYOUT = '190_000_000';
const DEFAULT_TRANSACTION_FEE = 1_000_000;
const MAX_BONDED_AMOUNT = 170141183460469231731687303715884105n;
const PRIVATE_FEE_FUNCTIONS = new Set([
  'new_voting_right',
  'confirm',
  'deny',
  'collect_voting_award',
  'refund_voting_right',
]);
const TESTNET_API_URL = import.meta.env.VITE_ALEO_API_URL ?? 'https://api.provable.com/v2';
const OFFICIAL_TESTNET_APIS = [
  'https://api.provable.com/v2',
  'https://api.explorer.provable.com/v2',
];

const samplePrivatePaymentRecord =
  '{ owner: aleo1azkl6rf3x5t3qk48rfsprxdkx6m7e33un9qpq0aqu036rzpm9qyq596vzw.private, amount: 1000000u128.private, token_id: 346688784394585735039324415800163929700021701423791533632764818774905958305field.private, external_authorization_required: false.private, authorized_until: 4294967295u32.private, _nonce: 7217685150051585053344308293369013275054479635381924146506947736298899083074group.public, _version: 1u8.public }';

const sampleVotingRightRecord =
  '{ owner: aleo1azkl6rf3x5t3qk48rfsprxdkx6m7e33un9qpq0aqu036rzpm9qyq596vzw.private, assertion_id: 123field.private, _nonce: 1916322672018147382854707312202085214777761072431433941899130795808197826813group.public, _version: 1u8.public }';

const sampleVotingReceiptRecord =
  '{ owner: aleo1azkl6rf3x5t3qk48rfsprxdkx6m7e33un9qpq0aqu036rzpm9qyq596vzw.private, assertion_id: 123field.private, outcome: true.private, _nonce: 8401380187321425398524037599072863595607808281814913320810389875998654131179group.public, _version: 1u8.public }';

const localDemoAccounts = [
  {
    role: 'Asserter',
    address: 'aleo1qk0xj2xcnx5n6f2d7wqjylf7ryda4gzypfcfh2mhqtynhz67x5xsswvcca',
  },
  {
    role: 'Disputer',
    address: 'aleo1jf506dlywsr6kzxcp3spv8rnyf2sx4fstel2yezk57nchsep6yrqfu7k52',
  },
  {
    role: 'Voter 1',
    address: 'aleo1azkl6rf3x5t3qk48rfsprxdkx6m7e33un9qpq0aqu036rzpm9qyq596vzw',
  },
];

type TxNotice = {
  type: 'success' | 'error';
  message: string;
};

type AssertionSnapshot = {
  assertion: string;
  asserter: string;
  disputer: string | null;
  confirmVotes: string;
  denyVotes: string;
};

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'loaded'; value: AssertionSnapshot }
  | { status: 'error'; message: string };

type View = 'proposals' | 'create' | 'dispute' | 'vote' | 'settle';

const fetchTestnet = async (path: string, call: Omit<AleoAuditCall, 'kind' | 'network'>) => {
  const endpoints = OFFICIAL_TESTNET_APIS.includes(TESTNET_API_URL)
    ? [
        TESTNET_API_URL,
        ...OFFICIAL_TESTNET_APIS.filter((endpoint) => endpoint !== TESTNET_API_URL),
      ]
    : [TESTNET_API_URL];
  let lastResponse: Response | null = null;
  let lastError: unknown;
  for (const endpoint of endpoints) {
    const url = `${endpoint}${path}`;
    const audit = beginAleoCall({
      kind: 'read',
      network: 'testnet',
      ...call,
      parameters: {
        ...call.parameters,
        httpMethod: 'GET',
        url,
      },
    });
    try {
      const response = await fetch(url);
      completeAleoCall(audit, 'response', {
        result: { httpStatus: response.status, ok: response.ok },
      });
      if (response.ok) return response;
      lastResponse = response;
    } catch (error) {
      failAleoCall(audit, error);
      lastError = error;
    }
  }
  if (lastResponse) return lastResponse;
  throw lastError instanceof Error ? lastError : new Error('Aleo Testnet is not responding.');
};

const readProgramMapping = async (mappingName: string, key: string) => {
  const response = await fetchTestnet(
    `/testnet/program/${DOO_PROGRAM_ID}/mapping/${mappingName}/${encodeURIComponent(key)}`,
    {
      description: `Read ${DOO_PROGRAM_ID}.${mappingName}[${key}]`,
      program: DOO_PROGRAM_ID,
      function: 'get_mapping_value',
      parameters: { mapping: mappingName, key },
    },
  );

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Unable to read ${mappingName} (${response.status}).`);
  }

  const value: unknown = await response.json();
  if (value === null || value === undefined || value === 'null') return null;
  return typeof value === 'string' ? value : JSON.stringify(value);
};

export default function MainComponent() {
  const {
    address,
    connected,
    executeTransaction: executeWalletTransaction,
    transactionStatus,
  } = useWallet();
  const [activeView, setActiveView] = useState<View>('proposals');
  const [assertId, setAssertId] = useState(DEFAULT_ASSERTION_ID);
  const [assertTitle, setAssertTitle] = useState(DEFAULT_TITLE_FIELD);
  const [assertRawContent, setAssertRawContent] = useState('BTC-USD closed above 100,000 on the reference exchange.');
  const [assertContent, setAssertContent] = useState(DEFAULT_CONTENT_FIELD);
  const [assertCost, setAssertCost] = useState(DEFAULT_ASSERTION_COST);
  const [voterStake, setVoterStake] = useState(DEFAULT_VOTER_STAKE);
  const [disputeDeadline, setDisputeDeadline] = useState(import.meta.env.DEV ? DEFAULT_DISPUTE_DEADLINE : '');
  const [votingDeadline, setVotingDeadline] = useState(import.meta.env.DEV ? DEFAULT_VOTING_DEADLINE : '');
  const [disputeId, setDisputeId] = useState(DEFAULT_ASSERTION_ID);
  const [privatePaymentRecord, setPrivatePaymentRecord] = useState(import.meta.env.DEV ? samplePrivatePaymentRecord : '');
  const [votingRightId, setVotingRightId] = useState(DEFAULT_ASSERTION_ID);
  const [votingRightRecord, setVotingRightRecord] = useState(import.meta.env.DEV ? sampleVotingRightRecord : '');
  const [votingReceiptRecord, setVotingReceiptRecord] = useState(import.meta.env.DEV ? sampleVotingReceiptRecord : '');
  const [awardAmount, setAwardAmount] = useState(DEFAULT_AWARD);
  const [asserterPayout, setAsserterPayout] = useState(DEFAULT_ASSERTER_PAYOUT);
  const [disputerPayout, setDisputerPayout] = useState(DEFAULT_DISPUTER_PAYOUT);
  const [txNotice, setTxNotice] = useState<TxNotice | null>(null);
  const [programAvailable, setProgramAvailable] = useState(import.meta.env.DEV);
  const [lookupId, setLookupId] = useState(DEFAULT_ASSERTION_ID);
  const [lookupState, setLookupState] = useState<LookupState>({ status: 'idle' });
  const [currentHeight, setCurrentHeight] = useState<number | null>(null);
  const [transactionPending, setTransactionPending] = useState(false);
  const transactionPendingRef = useRef(false);

  useEffect(() => {
    const computeHash = async () => {
      if (!assertRawContent.trim()) {
        setAssertContent('');
        return;
      }

      const encoder = new TextEncoder();
      const data = encoder.encode(assertRawContent);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const fieldModulus = 8444461749428370424248824938781546531375899335154063827935233455917409239041n;
      const bigIntHash = hashArray.reduce((acc, item) => (acc << 8n) + BigInt(item), 0n);
      setAssertContent(`${bigIntHash % fieldModulus}field`);
    };

    computeHash().catch(() => setAssertContent(DEFAULT_CONTENT_FIELD));
  }, [assertRawContent]);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    const loadTestnetState = async () => {
      const [heightResponse, programResponse] = await Promise.all([
        fetchTestnet('/testnet/block/height/latest', {
          description: 'Read the latest Aleo Testnet block height',
          function: 'get_latest_block_height',
          parameters: {},
        }),
        fetchTestnet(`/testnet/program/${DOO_PROGRAM_ID}`, {
          description: `Read deployed program ${DOO_PROGRAM_ID}`,
          program: DOO_PROGRAM_ID,
          function: 'get_program',
          parameters: { programId: DOO_PROGRAM_ID },
        }),
      ]);

      if (!heightResponse.ok) throw new Error(`Unable to read testnet height (${heightResponse.status}).`);
      const currentHeight = Number(await heightResponse.json());
      if (!Number.isSafeInteger(currentHeight)) throw new Error('Testnet returned an invalid block height.');

      setCurrentHeight(currentHeight);
      setDisputeDeadline(String(currentHeight + 10_000));
      setVotingDeadline(String(currentHeight + 20_000));
      setProgramAvailable(programResponse.ok);

      if (!programResponse.ok) {
        setTxNotice({
          type: 'error',
          message: `${DOO_PROGRAM_ID} is not deployed on Aleo testnet yet. Transactions are disabled.`,
        });
      }
    };

    loadTestnetState().catch(() => {
      setTxNotice({
        type: 'error',
        message: 'Could not verify Aleo testnet state. Transactions are disabled until the network is reachable.',
      });
    });
  }, []);

  const loadAssertion = async () => {
    const assertionId = toField(lookupId);
    setLookupState({ status: 'loading' });

    try {
      const [assertion, asserter, disputer, confirmVotes, denyVotes] = await Promise.all([
        readProgramMapping('assertions', assertionId),
        readProgramMapping('asserters', assertionId),
        readProgramMapping('disputers', assertionId),
        readProgramMapping('confirm_votes', assertionId),
        readProgramMapping('deny_votes', assertionId),
      ]);

      if (!assertion || !asserter) {
        setLookupState({
          status: 'error',
          message: `No on-chain assertion was found for ${assertionId}.`,
        });
        return;
      }

      setLookupState({
        status: 'loaded',
        value: {
          assertion,
          asserter,
          disputer,
          confirmVotes: confirmVotes ?? '0u64',
          denyVotes: denyVotes ?? '0u64',
        },
      });
    } catch (error) {
      setLookupState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unable to load the assertion from Aleo testnet.',
      });
    }
  };

  const executeTransaction = async (func: string, inputs: string[], inputNames: string[]) => {
    if (!connected || !address) {
      setTxNotice({ type: 'error', message: 'Connect Shield wallet before submitting a transaction.' });
      return;
    }

    if (!executeWalletTransaction) {
      setTxNotice({ type: 'error', message: 'The connected wallet does not expose transaction execution.' });
      return;
    }
    if (transactionPendingRef.current) {
      setTxNotice({ type: 'error', message: 'Wait for the pending wallet request before submitting another transaction.' });
      return;
    }

    transactionPendingRef.current = true;
    setTransactionPending(true);

    const request = {
      program: DOO_PROGRAM_ID,
      function: func,
      inputs,
      fee: DEFAULT_TRANSACTION_FEE,
      privateFee: PRIVATE_FEE_FUNCTIONS.has(func),
    };
    let audit: ReturnType<typeof beginAleoCall> | null = null;
    try {
      const auditInputs = await formatAleoAuditInputs(inputs, inputNames);
      audit = beginAleoCall({
        kind: 'transaction',
        network: 'testnet',
        description: `Submit ${DOO_PROGRAM_ID}.${func}`,
        program: DOO_PROGRAM_ID,
        function: func,
        parameters: {
          caller: address,
          inputs: auditInputs,
          fee: request.fee,
          privateFee: request.privateFee,
        },
      });
      const result = await executeWalletTransaction(request);
      const walletRequestId = result?.transactionId ?? null;

      completeAleoCall(audit, 'submitted', {
        result: { walletRequestId },
      });

      if (!walletRequestId || !transactionStatus) {
        setTxNotice({
          type: 'success',
          message: `Submitted ${func}. The wallet has not returned a trackable request ID.`,
        });
        return;
      }

      setTxNotice({
        type: 'success',
        message: `Submitted ${func}. Wallet request ${walletRequestId}; awaiting Testnet finality.`,
      });

      const finalStatus = await waitForWalletTransaction(transactionStatus, walletRequestId);
      const onchainTransactionId = finalStatus.transactionId ?? null;
      completeAleoCall(audit, 'response', {
        result: {
          walletRequestId,
          walletStatus: finalStatus.status,
          onchainTransactionId,
          statusPollAttempts: finalStatus.attempts,
          timedOut: finalStatus.timedOut,
          walletError: finalStatus.error ?? null,
        },
      });

      if (finalStatus.status.toLowerCase() === 'accepted') {
        setTxNotice({
          type: 'success',
          message: `${func} accepted on Testnet. Transaction ID: ${onchainTransactionId ?? 'not returned by Shield'}`,
        });
        return;
      }

      if (finalStatus.timedOut) {
        setTxNotice({
          type: 'success',
          message: `${func} is still pending. Wallet request: ${walletRequestId}`,
        });
        return;
      }

      setTxNotice({
        type: 'error',
        message: `${func} ${finalStatus.status}${finalStatus.error ? `: ${finalStatus.error}` : '.'}`,
      });
    } catch (error) {
      if (audit) failAleoCall(audit, error);
      setTxNotice({
        type: 'error',
        message: error instanceof Error ? error.message : `Unable to submit ${func}.`,
      });
    } finally {
      transactionPendingRef.current = false;
      setTransactionPending(false);
    }
  };

  const submitTransaction = (
    func: string,
    buildInputs: () => string[],
    inputNames: string[],
  ) => {
    try {
      void executeTransaction(func, buildInputs(), inputNames);
    } catch (error) {
      setTxNotice({
        type: 'error',
        message: error instanceof Error ? error.message : `Invalid input for ${func}.`,
      });
    }
  };

  const submitAssertion = () =>
    submitTransaction('create_assertion', () => {
      const cost = literalValue(assertCost, 'u128');
      const stake = literalValue(voterStake, 'u128');
      const dispute = literalValue(disputeDeadline, 'u32');
      const vote = literalValue(votingDeadline, 'u32');
      if (cost < 10n || cost > MAX_BONDED_AMOUNT) throw new Error('Assertion bond is outside the contract range.');
      if (stake < 100n || stake > MAX_BONDED_AMOUNT) throw new Error('Voter stake is outside the contract range.');
      if (currentHeight !== null && dispute < BigInt(currentHeight) + 10n) {
        throw new Error('Dispute deadline must be at least 10 blocks after the current block.');
      }
      if (vote < dispute + 10n) throw new Error('Voting deadline must be at least 10 blocks after the dispute deadline.');
      return [`{
        id: ${toField(assertId)},
        title: ${toField(assertTitle)},
        content_hash: ${assertContent || DEFAULT_CONTENT_FIELD},
        cost: ${toU128(assertCost)},
        voter_stake: ${toU128(voterStake)},
        dispute_deadline_block_height: ${toU32(disputeDeadline)},
        voting_deadline_block_height: ${toU32(votingDeadline)}
      }`,
      ];
    }, ['assertion']);

  const disputeAssertion = () => submitTransaction(
    'dispute_assertion',
    () => [toField(disputeId), toU128(assertCost)],
    ['assertion_id', 'assertion_cost'],
  );

  const buyVotingRight = () =>
    submitTransaction(
      'new_voting_right',
      () => [normalizeRecord(privatePaymentRecord, 'Private DOOR payment record'), toField(votingRightId), toU128(voterStake)],
      ['payment', 'assertion_id', 'voter_stake'],
    );

  const voteOnAssertion = (supportsAssertion: boolean) =>
    submitTransaction(
      supportsAssertion ? 'confirm' : 'deny',
      () => [normalizeRecord(votingRightRecord, 'Voting right record')],
      ['voting_right'],
    );

  const collectForRole = (
    role: 'collect_assertion_award' | 'collect_dispute_award' | 'collect_voting_award' | 'refund_voting_right'
  ) => {
    if (role === 'collect_voting_award') {
      submitTransaction(role, () => [toU128(awardAmount), normalizeRecord(votingReceiptRecord, 'Voting receipt record')], ['award_amount', 'voting_receipt']);
      return;
    }

    if (role === 'refund_voting_right') {
      submitTransaction(role, () => [toU128(voterStake), normalizeRecord(votingRightRecord, 'Voting right record')], ['refund_amount', 'voting_right']);
      return;
    }

    if (role === 'collect_assertion_award') {
      submitTransaction(role, () => [toField(disputeId), toU128(asserterPayout)], ['assertion_id', 'payout_amount']);
      return;
    }

    submitTransaction(role, () => [toField(disputeId), toU128(disputerPayout)], ['assertion_id', 'payout_amount']);
  };

  return (
    <section className="oracle-console" aria-label="Dark Optimistic Oracle console">
      <div className="status-strip">
        <div>
          <span className="eyebrow">Aleo testnet target</span>
          <strong>{programAvailable ? DOO_PROGRAM_ID : `${DOO_PROGRAM_ID} unavailable`}</strong>
        </div>
        <div>
          <span className="eyebrow">Asset</span>
          <strong>DOOR private and public records</strong>
        </div>
        <div>
          <span className="eyebrow">Wallet</span>
          <strong>{connected ? `${address?.slice(0, 12)}...${address?.slice(-6)}` : 'Shield not connected'}</strong>
        </div>
      </div>

      <div className="audit-export">
        <span>Calls are retained locally with private records redacted.</span>
        <button className="secondary-action" onClick={downloadAleoAuditMarkdown} type="button">
          <Download aria-hidden="true" size={17} />
          Download audit LOG.md
        </button>
      </div>

      <div className="view-tabs" role="tablist" aria-label="Oracle views">
        {[
          ['proposals', 'Proposals', RadioTower],
          ['create', 'Create', FileText],
          ['dispute', 'Dispute', AlertTriangle],
          ['vote', 'Private vote', LockKeyhole],
          ['settle', 'Settle', ShieldCheck],
        ].map(([view, label, Icon]) => (
          <button
            aria-selected={activeView === view}
            className="view-tab"
            key={view as string}
            onClick={() => setActiveView(view as View)}
            role="tab"
            type="button"
          >
            <Icon aria-hidden="true" size={17} />
            {label as string}
          </button>
        ))}
      </div>

      {txNotice && (
        <div className={`tx-notice ${txNotice.type}`} role="status">
          {txNotice.type === 'success' ? <CheckCircle2 aria-hidden="true" size={18} /> : <AlertTriangle aria-hidden="true" size={18} />}
          <span>{txNotice.message}</span>
        </div>
      )}

      {activeView === 'proposals' && (
        <div className="proposal-board">
          <div className="section-heading">
            <span className="eyebrow">Public protocol state</span>
            <h2>Inspect an on-chain assertion</h2>
            <p>
              Assertion IDs are not enumerable from Aleo mappings. Enter a known ID to load its
              public terms, participants, and aggregate vote totals.
            </p>
          </div>
          <form className="lookup-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Assertion ID
              <input value={lookupId} onChange={(event) => setLookupId(event.target.value)} />
            </label>
            <button
              className="secondary-action"
              disabled={!programAvailable || lookupState.status === 'loading'}
              onClick={loadAssertion}
              type="button"
            >
              <RadioTower aria-hidden="true" size={18} />
              {lookupState.status === 'loading' ? 'Loading…' : 'Load assertion'}
            </button>
          </form>

          {lookupState.status === 'idle' && (
            <p className="lookup-guidance">
              Public state is read from <code>{DOO_PROGRAM_ID}</code>. Voting rights, vote receipts,
              and voter awards are private records and are not exposed by this lookup.
            </p>
          )}

          {lookupState.status === 'error' && (
            <div className="tx-notice error" role="alert">
              <AlertTriangle aria-hidden="true" size={18} />
              <span>{lookupState.message}</span>
            </div>
          )}

          {lookupState.status === 'loaded' && (
            <div className="assertion-snapshot" aria-live="polite">
              <article className="snapshot-card snapshot-terms">
                <span className="eyebrow">Assertion terms</span>
                <code>{lookupState.value.assertion}</code>
              </article>
              <article className="snapshot-card">
                <span className="eyebrow">Participants</span>
                <dl>
                  <div>
                    <dt>Asserter</dt>
                    <dd><code>{lookupState.value.asserter}</code></dd>
                  </div>
                  <div>
                    <dt>Disputer</dt>
                    <dd><code>{lookupState.value.disputer ?? 'Not disputed'}</code></dd>
                  </div>
                </dl>
              </article>
              <article className="snapshot-card">
                <span className="eyebrow">Public aggregate tally</span>
                <dl>
                  <div>
                    <dt>Confirm</dt>
                    <dd>{lookupState.value.confirmVotes}</dd>
                  </div>
                  <div>
                    <dt>Deny</dt>
                    <dd>{lookupState.value.denyVotes}</dd>
                  </div>
                </dl>
              </article>
            </div>
          )}
        </div>
      )}

      {activeView === 'create' && (
        <form className="action-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading">
            <span className="eyebrow">Asserter action</span>
            <h2>Create an assertion</h2>
          </div>
          <div className="form-grid">
            <label>
              Assertion ID
              <input value={assertId} onChange={(event) => setAssertId(event.target.value)} />
            </label>
            <label>
              Title field
              <input value={assertTitle} onChange={(event) => setAssertTitle(event.target.value)} />
            </label>
            <label>
              Asserter payout amount
              <input value={asserterPayout} onChange={(event) => setAsserterPayout(event.target.value)} />
            </label>
            <label>
              Disputer payout amount
              <input value={disputerPayout} onChange={(event) => setDisputerPayout(event.target.value)} />
            </label>
            <label>
              Voter stake
              <input value={voterStake} onChange={(event) => setVoterStake(event.target.value)} />
            </label>
            <label>
              Dispute deadline block
              <input value={disputeDeadline} onChange={(event) => setDisputeDeadline(event.target.value)} />
            </label>
            <label>
              Voting deadline block
              <input value={votingDeadline} onChange={(event) => setVotingDeadline(event.target.value)} />
            </label>
          </div>
          <label>
            Claim text
            <textarea rows={4} value={assertRawContent} onChange={(event) => setAssertRawContent(event.target.value)} />
            <span className="field-help">
              Hashed locally in this browser. Only the resulting field is submitted on-chain.
            </span>
          </label>
          <label>
            Content hash field
            <input readOnly value={assertContent} />
          </label>
          <button
            className="primary-action"
            disabled={!connected || !programAvailable || transactionPending || !disputeDeadline.trim() || !votingDeadline.trim()}
            onClick={submitAssertion}
            type="button"
          >
            <FileText aria-hidden="true" size={18} />
            Submit assertion
          </button>
        </form>
      )}

      {activeView === 'dispute' && (
        <form className="action-panel compact" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading">
            <span className="eyebrow">Disputer action</span>
            <h2>Challenge an open assertion</h2>
          </div>
          <label>
            Assertion ID
            <input value={disputeId} onChange={(event) => setDisputeId(event.target.value)} />
          </label>
          <label>
            Dispute bond
            <input value={assertCost} onChange={(event) => setAssertCost(event.target.value)} />
          </label>
          <button className="danger-action" disabled={!connected || !programAvailable || transactionPending} onClick={disputeAssertion} type="button">
            <Gavel aria-hidden="true" size={18} />
            Dispute assertion
          </button>
        </form>
      )}

      {activeView === 'vote' && (
        <form className="action-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading">
            <span className="eyebrow">Private voter action</span>
            <h2>Buy a voting right and cast a record-private vote</h2>
            <p>The fee is private and record ownership stays hidden. The confirm/deny transition and aggregate tally remain public.</p>
          </div>
          <div className="form-grid">
            <label>
              Assertion ID
              <input value={votingRightId} onChange={(event) => setVotingRightId(event.target.value)} />
            </label>
            <label>
              Voter stake
              <input value={voterStake} onChange={(event) => setVoterStake(event.target.value)} />
            </label>
          </div>
          <label>
            Private DOOR payment record
            <textarea rows={4} value={privatePaymentRecord} onChange={(event) => setPrivatePaymentRecord(event.target.value)} />
          </label>
          <button className="secondary-action" disabled={!connected || !programAvailable || transactionPending} onClick={buyVotingRight} type="button">
            <KeyRound aria-hidden="true" size={18} />
            Buy voting right
          </button>
          <label>
            Voting right record
            <textarea rows={4} value={votingRightRecord} onChange={(event) => setVotingRightRecord(event.target.value)} />
          </label>
          <div className="button-pair">
            <button className="primary-action" disabled={!connected || !programAvailable || transactionPending} onClick={() => voteOnAssertion(true)} type="button">
              <CheckCircle2 aria-hidden="true" size={18} />
              Confirm privately
            </button>
            <button className="danger-action" disabled={!connected || !programAvailable || transactionPending} onClick={() => voteOnAssertion(false)} type="button">
              <AlertTriangle aria-hidden="true" size={18} />
              Deny privately
            </button>
          </div>
        </form>
      )}

      {activeView === 'settle' && (
        <form className="action-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading">
            <span className="eyebrow">Settlement actions</span>
            <h2>Collect awards, refunds, and private receipts</h2>
          </div>
          <div className="form-grid">
            <label>
              Assertion ID
              <input value={disputeId} onChange={(event) => setDisputeId(event.target.value)} />
            </label>
            <label>
              Assertion cost
              <input value={assertCost} onChange={(event) => setAssertCost(event.target.value)} />
            </label>
            <label>
              Voter award amount
              <input value={awardAmount} onChange={(event) => setAwardAmount(event.target.value)} />
            </label>
            <label>
              Refund amount
              <input value={voterStake} onChange={(event) => setVoterStake(event.target.value)} />
            </label>
          </div>
          <label>
            Voting receipt record
            <textarea rows={3} value={votingReceiptRecord} onChange={(event) => setVotingReceiptRecord(event.target.value)} />
          </label>
          <label>
            Unused voting right record
            <textarea rows={3} value={votingRightRecord} onChange={(event) => setVotingRightRecord(event.target.value)} />
          </label>
          <div className="settlement-grid">
            <button className="primary-action" disabled={!connected || !programAvailable || transactionPending} onClick={() => collectForRole('collect_assertion_award')} type="button">
              Asserter collect
            </button>
            <button className="secondary-action" disabled={!connected || !programAvailable || transactionPending} onClick={() => collectForRole('collect_dispute_award')} type="button">
              Disputer collect
            </button>
            <button className="primary-action" disabled={!connected || !programAvailable || transactionPending} onClick={() => collectForRole('collect_voting_award')} type="button">
              Voter collect
            </button>
            <button className="secondary-action" disabled={!connected || !programAvailable || transactionPending} onClick={() => collectForRole('refund_voting_right')} type="button">
              Voter refund
            </button>
          </div>
        </form>
      )}

      {import.meta.env.DEV && (
        <details className="demo-details">
          <summary>Local demo accounts</summary>
          <aside className="account-strip" aria-label="Local demo accounts">
            {localDemoAccounts.map((account) => (
              <div key={account.role}>
                <span>{account.role}</span>
                <code>{account.address}</code>
              </div>
            ))}
          </aside>
        </details>
      )}
    </section>
  );
}

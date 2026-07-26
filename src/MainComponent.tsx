import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Gavel,
  KeyRound,
  LockKeyhole,
  RadioTower,
  ShieldCheck,
  Vote,
} from 'lucide-react';
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react';

const DOO_PROGRAM_ID = 'dark_optimistic_oracle.aleo';
const DEFAULT_ASSERTION_ID = '123';
const DEFAULT_TITLE_FIELD = '456';
const DEFAULT_CONTENT_FIELD = '789field';
const DEFAULT_ASSERTION_COST = '100_000_000';
const DEFAULT_VOTER_STAKE = '1_000_000';
const DEFAULT_DISPUTE_DEADLINE = '10000';
const DEFAULT_VOTING_DEADLINE = '20000';
const DEFAULT_AWARD = '1_010_000';

const samplePrivatePaymentRecord =
  '{ owner: aleo1azkl6rf3x5t3qk48rfsprxdkx6m7e33un9qpq0aqu036rzpm9qyq596vzw.private, amount: 1000000u128.private, token_id: 346688784394585735039324415800163929700021701423791533632764818774905958305field.private, external_authorization_required: false.private, authorized_until: 4294967295u32.private, _nonce: 7217685150051585053344308293369013275054479635381924146506947736298899083074group.public, _version: 1u8.public }';

const sampleVotingRightRecord =
  '{ owner: aleo1azkl6rf3x5t3qk48rfsprxdkx6m7e33un9qpq0aqu036rzpm9qyq596vzw.private, assertion_id: 123field.private, _nonce: 1916322672018147382854707312202085214777761072431433941899130795808197826813group.public, _version: 1u8.public }';

const sampleVotingReceiptRecord =
  '{ owner: aleo1azkl6rf3x5t3qk48rfsprxdkx6m7e33un9qpq0aqu036rzpm9qyq596vzw.private, assertion_id: 123field.private, outcome: true.private, _nonce: 8401380187321425398524037599072863595607808281814913320810389875998654131179group.public, _version: 1u8.public }';

const testAccounts = [
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

const proposalRows = [
  {
    id: '123field',
    title: 'BTC-USD closed above 100,000 on the reference exchange',
    status: 'Disputed',
    bond: '100 DOOR',
    deadline: 'Voting closes at mock block 20000',
    privacy: 'Votes and voter rewards are private Aleo records',
  },
  {
    id: '884field',
    title: 'Protocol fee report matches the published treasury hash',
    status: 'Challenge window',
    bond: '80 DOOR',
    deadline: 'Dispute by block 18000',
    privacy: 'Assertion and dispute bonds settle publicly',
  },
  {
    id: '511field',
    title: 'Bridge incident report contains no unresolved critical claims',
    status: 'Ready to settle',
    bond: '120 DOOR',
    deadline: 'Collect as winner or refund unused voting right',
    privacy: 'Winning voter receipts collect private token records',
  },
];

type TxNotice = {
  type: 'success' | 'error';
  message: string;
};

type View = 'proposals' | 'create' | 'dispute' | 'vote' | 'settle';

const toField = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '0field';
  return trimmed.endsWith('field') ? trimmed : `${trimmed}field`;
};

const toU128 = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('u128') ? trimmed : `${trimmed}u128`;
};

const toU32 = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('u32') ? trimmed : `${trimmed}u32`;
};

export default function MainComponent() {
  const { address, connected, executeTransaction: executeWalletTransaction } = useWallet();
  const [activeView, setActiveView] = useState<View>('proposals');
  const [assertId, setAssertId] = useState(DEFAULT_ASSERTION_ID);
  const [assertTitle, setAssertTitle] = useState(DEFAULT_TITLE_FIELD);
  const [assertRawContent, setAssertRawContent] = useState('BTC-USD closed above 100,000 on the reference exchange.');
  const [assertContent, setAssertContent] = useState(DEFAULT_CONTENT_FIELD);
  const [assertCost, setAssertCost] = useState(DEFAULT_ASSERTION_COST);
  const [voterStake, setVoterStake] = useState(DEFAULT_VOTER_STAKE);
  const [disputeId, setDisputeId] = useState(DEFAULT_ASSERTION_ID);
  const [privatePaymentRecord, setPrivatePaymentRecord] = useState(samplePrivatePaymentRecord);
  const [votingRightId, setVotingRightId] = useState(DEFAULT_ASSERTION_ID);
  const [votingRightRecord, setVotingRightRecord] = useState(sampleVotingRightRecord);
  const [votingReceiptRecord, setVotingReceiptRecord] = useState(sampleVotingReceiptRecord);
  const [awardAmount, setAwardAmount] = useState(DEFAULT_AWARD);
  const [txNotice, setTxNotice] = useState<TxNotice | null>(null);

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

  const workflowSteps = useMemo(
    () => [
      { label: 'Assert', detail: 'Post a claim and public DOOR bond', icon: FileText },
      { label: 'Dispute', detail: 'Challenge before the liveness window closes', icon: Gavel },
      { label: 'Vote', detail: 'Buy a private right and vote without revealing identity', icon: Vote },
      { label: 'Settle', detail: 'Collect public awards or private voter records', icon: CircleDollarSign },
    ],
    []
  );

  const executeTransaction = async (func: string, inputs: string[]) => {
    if (!connected || !address) {
      setTxNotice({ type: 'error', message: 'Connect Shield wallet before submitting a transaction.' });
      return;
    }

    if (!executeWalletTransaction) {
      setTxNotice({ type: 'error', message: 'The connected wallet does not expose transaction execution.' });
      return;
    }

    try {
      const result = await executeWalletTransaction({
        program: DOO_PROGRAM_ID,
        function: func,
        inputs,
        fee: 100_000,
        privateFee: false,
      });

      setTxNotice({
        type: 'success',
        message: `Submitted ${func}. Transaction ID: ${result?.transactionId ?? 'pending wallet response'}`,
      });
    } catch (error) {
      setTxNotice({
        type: 'error',
        message: error instanceof Error ? error.message : `Unable to submit ${func}.`,
      });
    }
  };

  const submitAssertion = () =>
    executeTransaction('assertion', [
      toField(assertId),
      toField(assertTitle),
      assertContent || DEFAULT_CONTENT_FIELD,
      toU128(assertCost),
      toU128(voterStake),
      toU32(DEFAULT_DISPUTE_DEADLINE),
      toU32(DEFAULT_VOTING_DEADLINE),
    ]);

  const disputeAssertion = () => executeTransaction('dispute', [toField(disputeId), toU128(assertCost)]);

  const buyVotingRight = () =>
    executeTransaction('voting_right', [privatePaymentRecord, toField(votingRightId), toU128(voterStake)]);

  const voteOnAssertion = (supportsAssertion: boolean) =>
    executeTransaction(supportsAssertion ? 'confirm' : 'deny', [votingRightRecord]);

  const collectForRole = (role: 'asserter_collect' | 'disputer_collect' | 'voter_collect' | 'voter_refund') => {
    if (role === 'voter_collect') {
      executeTransaction(role, [toU128(awardAmount), votingReceiptRecord]);
      return;
    }

    if (role === 'voter_refund') {
      executeTransaction(role, [toU128(voterStake), votingRightRecord]);
      return;
    }

    executeTransaction(role, [toU128(assertCost), toField(disputeId)]);
  };

  return (
    <section className="oracle-console" aria-label="Dark Optimistic Oracle console">
      <div className="status-strip">
        <div>
          <span className="eyebrow">Local devnet target</span>
          <strong>{DOO_PROGRAM_ID}</strong>
        </div>
        <div>
          <span className="eyebrow">Token registry</span>
          <strong>token_registry.aleo workaround</strong>
        </div>
        <div>
          <span className="eyebrow">Wallet</span>
          <strong>{connected ? `${address?.slice(0, 12)}...${address?.slice(-6)}` : 'Shield not connected'}</strong>
        </div>
      </div>

      <div className="workflow-rail" aria-label="Oracle workflow">
        {workflowSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article className="workflow-step" key={step.label}>
              <Icon aria-hidden="true" size={20} />
              <div>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </div>
            </article>
          );
        })}
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
            <span className="eyebrow">UMA-like queue</span>
            <h2>Assertions moving through dispute resolution</h2>
          </div>
          <div className="proposal-list">
            {proposalRows.map((proposal) => (
              <article className="proposal-row" key={proposal.id}>
                <div>
                  <span className="proposal-id">{proposal.id}</span>
                  <h3>{proposal.title}</h3>
                  <p>{proposal.privacy}</p>
                </div>
                <div className="proposal-meta">
                  <span className="status-pill">{proposal.status}</span>
                  <span>{proposal.bond}</span>
                  <span>{proposal.deadline}</span>
                </div>
              </article>
            ))}
          </div>
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
              Assertion cost
              <input value={assertCost} onChange={(event) => setAssertCost(event.target.value)} />
            </label>
            <label>
              Voter stake
              <input value={voterStake} onChange={(event) => setVoterStake(event.target.value)} />
            </label>
          </div>
          <label>
            Claim text
            <textarea rows={4} value={assertRawContent} onChange={(event) => setAssertRawContent(event.target.value)} />
          </label>
          <label>
            Content hash field
            <input readOnly value={assertContent} />
          </label>
          <button className="primary-action" disabled={!connected} onClick={submitAssertion} type="button">
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
          <button className="danger-action" disabled={!connected} onClick={disputeAssertion} type="button">
            <Gavel aria-hidden="true" size={18} />
            Dispute assertion
          </button>
        </form>
      )}

      {activeView === 'vote' && (
        <form className="action-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading">
            <span className="eyebrow">Private voter action</span>
            <h2>Buy a voting right and cast a hidden vote</h2>
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
          <button className="secondary-action" disabled={!connected} onClick={buyVotingRight} type="button">
            <KeyRound aria-hidden="true" size={18} />
            Buy voting right
          </button>
          <label>
            Voting right record
            <textarea rows={4} value={votingRightRecord} onChange={(event) => setVotingRightRecord(event.target.value)} />
          </label>
          <div className="button-pair">
            <button className="primary-action" disabled={!connected} onClick={() => voteOnAssertion(true)} type="button">
              <CheckCircle2 aria-hidden="true" size={18} />
              Confirm privately
            </button>
            <button className="danger-action" disabled={!connected} onClick={() => voteOnAssertion(false)} type="button">
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
            <button className="primary-action" disabled={!connected} onClick={() => collectForRole('asserter_collect')} type="button">
              Asserter collect
            </button>
            <button className="secondary-action" disabled={!connected} onClick={() => collectForRole('disputer_collect')} type="button">
              Disputer collect
            </button>
            <button className="primary-action" disabled={!connected} onClick={() => collectForRole('voter_collect')} type="button">
              Voter collect
            </button>
            <button className="secondary-action" disabled={!connected} onClick={() => collectForRole('voter_refund')} type="button">
              Voter refund
            </button>
          </div>
        </form>
      )}

      <aside className="account-strip" aria-label="Demo accounts">
        {testAccounts.map((account) => (
          <div key={account.role}>
            <span>{account.role}</span>
            <code>{account.address}</code>
          </div>
        ))}
      </aside>
    </section>
  );
}

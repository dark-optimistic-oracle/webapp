import { useState } from 'react';
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react';

const DOO_PROGRAM_ID = 'dark_optimistic_oracle.aleo';

export default function MainComponent() {
  const { address, connected, executeTransaction: executeWalletTransaction } = useWallet();
  const [activeTab, setActiveTab] = useState<'assert' | 'dispute' | 'vote' | 'collect'>('assert');

  // Assertion state
  const [assertId, setAssertId] = useState('');
  const [assertTitle, setAssertTitle] = useState('');
  const [assertContent, setAssertContent] = useState('');
  const [assertCost, setAssertCost] = useState('100000000');
  const [voterStake, setVoterStake] = useState('1000000');

  // Dispute state
  const [disputeId, setDisputeId] = useState('');

  // Vote state
  const [voteId, setVoteId] = useState('');
  const [voteRecord, setVoteRecord] = useState('');

  const executeTransaction = async (func: string, inputs: any[]) => {
    if (!connected || !address) throw new Error('Wallet not connected');
    if (!executeWalletTransaction) throw new Error('Wallet does not support executing transactions');

    const transactionOptions = {
      program: DOO_PROGRAM_ID,
      function: func,
      inputs: inputs,
      fee: 100_000, // Provide appropriate microcredits fee
      privateFee: false,
    };

    try {
      const result = await executeWalletTransaction(transactionOptions);
      alert(`Transaction Submitted. Temp ID: ${result?.transactionId}`);
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  const handleAssert = () => {
    executeTransaction('assertion', [
      `${assertId}field`,
      `${assertTitle}field`,
      `${assertContent}field`,
      `${assertCost}u128`,
      `${voterStake}u128`,
      `10000u32`, // dummy dispute deadline
      `20000u32`, // dummy voting deadline
    ]);
  };

  const handleDispute = () => {
    executeTransaction('dispute', [
      `${disputeId}field`,
      `100000000u128`, // Example cost
    ]);
  };

  return (
    <div className="actions-section">
      <div className="glass-card">
        <h2 className="card-title">Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button 
            className={activeTab === 'assert' ? '' : 'button-outline'} 
            onClick={() => setActiveTab('assert')}
          >
            Create Assertion
          </button>
          <button 
            className={activeTab === 'dispute' ? '' : 'button-outline'} 
            onClick={() => setActiveTab('dispute')}
          >
            Dispute
          </button>
          <button 
            className={activeTab === 'vote' ? '' : 'button-outline'} 
            onClick={() => setActiveTab('vote')}
          >
            Vote
          </button>
          <button 
            className={activeTab === 'collect' ? '' : 'button-outline'} 
            onClick={() => setActiveTab('collect')}
          >
            Collect
          </button>
        </div>

        {activeTab === 'assert' && (
          <div>
            <h3>Create a New Assertion</h3>
            <input 
              className="input-field" 
              placeholder="Assertion ID (e.g. 123)" 
              value={assertId} onChange={e => setAssertId(e.target.value)} 
            />
            <input 
              className="input-field" 
              placeholder="Title (Field)" 
              value={assertTitle} onChange={e => setAssertTitle(e.target.value)} 
            />
            <input 
              className="input-field" 
              placeholder="Content Hash (Field)" 
              value={assertContent} onChange={e => setAssertContent(e.target.value)} 
            />
            <input 
              className="input-field" 
              placeholder="Cost (u128)" 
              value={assertCost} onChange={e => setAssertCost(e.target.value)} 
            />
            <button onClick={handleAssert} disabled={!connected}>Submit Assertion</button>
            {!connected && <p style={{color: '#f87171', fontSize: '0.875rem'}}>Connect wallet to submit.</p>}
          </div>
        )}

        {activeTab === 'dispute' && (
          <div>
            <h3>Dispute an Assertion</h3>
            <input 
              className="input-field" 
              placeholder="Assertion ID to dispute (e.g. 123)" 
              value={disputeId} onChange={e => setDisputeId(e.target.value)} 
            />
            <button onClick={handleDispute} disabled={!connected}>Submit Dispute</button>
          </div>
        )}

        {activeTab === 'vote' && (
          <div>
            <h3>Vote Privately</h3>
            <p style={{fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem'}}>
              Voting requires first creating a Voting Right with a private token record.
            </p>
            <input 
              className="input-field" 
              placeholder="Assertion ID (e.g. 123)" 
              value={voteId} onChange={e => setVoteId(e.target.value)} 
            />
            <input 
              className="input-field" 
              placeholder="Voting Right Record (JSON String)" 
              value={voteRecord} onChange={e => setVoteRecord(e.target.value)} 
            />
            <div className="button-group">
              <button onClick={() => executeTransaction('confirm', [voteRecord])} disabled={!connected}>
                Confirm (True)
              </button>
              <button 
                className="button-outline" 
                style={{borderColor: '#ef4444', color: '#ef4444'}}
                onClick={() => executeTransaction('deny', [voteRecord])} 
                disabled={!connected}
              >
                Deny (False)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'collect' && (
          <div>
            <h3>Collect Rewards or Refunds</h3>
            <p style={{fontSize: '0.875rem', color: '#94a3b8'}}>Collect rewards as Asserter or Disputer.</p>
            <div className="button-group">
              <button onClick={() => executeTransaction('asserter_collect', [`100000000u128`, `${assertId || '123'}field`])} disabled={!connected}>
                Asserter Collect
              </button>
              <button onClick={() => executeTransaction('disputer_collect', [`100000000u128`, `${assertId || '123'}field`])} disabled={!connected}>
                Disputer Collect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MainComponent from './MainComponent';

const executeTransactionMock = vi.fn();
let walletState = {
  address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
  connected: true,
  executeTransaction: executeTransactionMock,
};

vi.mock('@provablehq/aleo-wallet-adaptor-react', () => ({
  useWallet: () => walletState,
}));

describe('MainComponent', () => {
  beforeEach(() => {
    executeTransactionMock.mockReset();
    executeTransactionMock.mockResolvedValue({ transactionId: 'mock_tx_id' });
    walletState = {
      address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
      connected: true,
      executeTransaction: executeTransactionMock,
    };
  });

  it('renders the on-chain assertion lookup by default', () => {
    render(<MainComponent />);

    expect(screen.getByRole('tab', { name: /proposals/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Inspect an on-chain assertion')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /load assertion/i })).toBeEnabled();
    expect(screen.getByText(/voting rights, vote receipts, and voter awards are private records/i)).toBeInTheDocument();
  });

  it('loads public assertion state and aggregate vote totals', async () => {
    const values: Record<string, string | null> = {
      assertions: '{ id: 123field, cost: 100_000_000u128 }',
      asserters: 'aleo1asserter',
      disputers: null,
      confirm_votes: '3u64',
      deny_votes: '2u64',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request) => {
        const url = String(input);
        const mappingName = Object.keys(values).find((name) => url.includes(`/mapping/${name}/`));
        const value = mappingName ? values[mappingName] : null;

        return {
          ok: value !== null,
          status: value === null ? 404 : 200,
          json: async () => value,
        } as Response;
      })
    );

    render(<MainComponent />);
    fireEvent.click(screen.getByRole('button', { name: /load assertion/i }));

    expect(await screen.findByText('{ id: 123field, cost: 100_000_000u128 }')).toBeInTheDocument();
    expect(screen.getByText('aleo1asserter')).toBeInTheDocument();
    expect(screen.getByText('Not disputed')).toBeInTheDocument();
    expect(screen.getByText('3u64')).toBeInTheDocument();
    expect(screen.getByText('2u64')).toBeInTheDocument();
  });

  it('switches to the private voting workflow', () => {
    render(<MainComponent />);

    fireEvent.click(screen.getByRole('tab', { name: /private vote/i }));

    expect(screen.getByText('Buy a voting right and cast a hidden vote')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buy voting right/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /confirm privately/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /deny privately/i })).toBeEnabled();
  });

  it('submits assertion transactions with formatted Aleo inputs', async () => {
    render(<MainComponent />);

    fireEvent.click(screen.getByRole('tab', { name: /create/i }));
    fireEvent.change(screen.getByLabelText('Assertion ID'), { target: { value: '777' } });
    fireEvent.change(screen.getByLabelText('Title field'), { target: { value: '888field' } });
    fireEvent.click(screen.getByRole('button', { name: /submit assertion/i }));

    await waitFor(() => expect(executeTransactionMock).toHaveBeenCalledTimes(1));
    expect(executeTransactionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        program: 'dark_optimistic_oracle.aleo',
        function: 'create_assertion',
        inputs: [
          expect.stringMatching(
            /id: 777field,[\s\S]*title: 888field,[\s\S]*cost: 100_000_000u128,[\s\S]*voter_stake: 1_000_000u128,[\s\S]*dispute_deadline_block_height: 10000u32,[\s\S]*voting_deadline_block_height: 20000u32/
          ),
        ],
        fee: 1_000_000,
      })
    );
    expect(screen.getByText(/submitted create_assertion/i)).toBeInTheDocument();
  });

  it('uses the deployed ABI names for dispute and settlement transactions', async () => {
    render(<MainComponent />);

    fireEvent.click(screen.getByRole('tab', { name: /dispute/i }));
    fireEvent.click(screen.getByRole('button', { name: /dispute assertion/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          function: 'dispute_assertion',
          inputs: ['123field', '100_000_000u128'],
        })
      )
    );

    fireEvent.click(screen.getByRole('tab', { name: /settle/i }));
    fireEvent.click(screen.getByRole('button', { name: /asserter collect/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          function: 'collect_assertion_award',
          inputs: ['123field', '90_000_000u128'],
        })
      )
    );

    fireEvent.click(screen.getByRole('button', { name: /disputer collect/i }));

    await waitFor(() =>
      expect(executeTransactionMock).toHaveBeenLastCalledWith(
        expect.objectContaining({
          function: 'collect_dispute_award',
          inputs: ['123field', '190_000_000u128'],
        })
      )
    );
  });

  it('shows an error instead of submitting when the wallet is disconnected', () => {
    walletState = {
      ...walletState,
      connected: false,
      address: '',
    };

    render(<MainComponent />);

    fireEvent.click(screen.getByRole('tab', { name: /dispute/i }));

    expect(screen.getByRole('button', { name: /dispute assertion/i })).toBeDisabled();
    expect(executeTransactionMock).not.toHaveBeenCalled();
  });
});

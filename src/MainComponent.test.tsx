import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MainComponent from './MainComponent';

const executeTransactionMock = vi.fn();
const transactionStatusMock = vi.fn();
let walletState = {
  address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
  connected: true,
  executeTransaction: executeTransactionMock,
  transactionStatus: transactionStatusMock,
};

vi.mock('@provablehq/aleo-wallet-adaptor-react', () => ({
  useWallet: () => walletState,
}));

describe('MainComponent', () => {
  beforeEach(() => {
    executeTransactionMock.mockReset();
    transactionStatusMock.mockReset();
    executeTransactionMock.mockResolvedValue({ transactionId: 'mock_wallet_request' });
    transactionStatusMock.mockResolvedValue({
      status: 'accepted',
      transactionId: 'at1mock_onchain_transaction',
    });
    walletState = {
      address: 'aleo1mockaddress000000000000000000000000000000000000000000000000',
      connected: true,
      executeTransaction: executeTransactionMock,
      transactionStatus: transactionStatusMock,
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

  it('treats an HTTP 200 JSON null mapping value as missing state', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        status: 200,
        json: async () => null,
      } as Response)),
    );

    render(<MainComponent />);
    fireEvent.click(screen.getByRole('button', { name: /load assertion/i }));

    expect(await screen.findByText(/no on-chain assertion was found/i)).toBeInTheDocument();
  });

  it('redacts private Aleo records from audit logs while retaining a fingerprint', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    render(<MainComponent />);

    fireEvent.click(screen.getByRole('tab', { name: /private vote/i }));
    fireEvent.change(screen.getByLabelText(/private DOOR payment record/i), {
      target: { value: '{ owner: aleo1private, amount: 1000000u128 }' },
    });
    fireEvent.click(screen.getByRole('button', { name: /buy voting right/i }));

    await waitFor(() => expect(executeTransactionMock).toHaveBeenCalledTimes(1));
    const requestEntry = consoleSpy.mock.calls
      .filter(([prefix]) => prefix === '[Aleo audit]')
      .map(([, entry]) => JSON.parse(String(entry)))
      .find((entry) => entry.phase === 'request' && entry.function === 'new_voting_right');

    expect(JSON.stringify(requestEntry)).not.toContain('aleo1private');
    expect(requestEntry.parameters.inputs[0]).toEqual(expect.objectContaining({
      name: 'payment',
      value: expect.objectContaining({
        redacted: true,
        classification: 'private Aleo record',
        sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
      }),
    }));
    consoleSpy.mockRestore();
  });

  it('submits assertion transactions with formatted Aleo inputs', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
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
    const auditEntries = consoleSpy.mock.calls
      .filter(([prefix]) => prefix === '[Aleo audit]')
      .map(([, entry]) => JSON.parse(String(entry)));
    expect(auditEntries).toEqual(expect.arrayContaining([
      expect.objectContaining({
        phase: 'request',
        kind: 'transaction',
        program: 'dark_optimistic_oracle.aleo',
        function: 'create_assertion',
        parameters: expect.objectContaining({
          caller: walletState.address,
          inputs: [expect.objectContaining({ position: 0, name: 'assertion' })],
          fee: 1_000_000,
          privateFee: false,
        }),
      }),
      expect.objectContaining({
        phase: 'submitted',
        function: 'create_assertion',
        result: { walletRequestId: 'mock_wallet_request' },
      }),
      expect.objectContaining({
        phase: 'response',
        function: 'create_assertion',
        result: expect.objectContaining({
          walletRequestId: 'mock_wallet_request',
          walletStatus: 'accepted',
          onchainTransactionId: 'at1mock_onchain_transaction',
          timedOut: false,
        }),
      }),
    ]));
    consoleSpy.mockRestore();
    expect(screen.getByText(/create_assertion accepted on testnet/i)).toBeInTheDocument();
  });

  it('logs every mapping read with its program, mapping, key, URL, and response', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => '1u64',
    } as Response)));

    render(<MainComponent />);
    fireEvent.click(screen.getByRole('button', { name: /load assertion/i }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(5));

    const requests = consoleSpy.mock.calls
      .filter(([prefix]) => prefix === '[Aleo audit]')
      .map(([, entry]) => JSON.parse(String(entry)))
      .filter((entry) => entry.phase === 'request' && entry.kind === 'read');
    expect(requests).toHaveLength(5);
    expect(requests[0]).toEqual(expect.objectContaining({
      program: 'dark_optimistic_oracle.aleo',
      function: 'get_mapping_value',
      parameters: expect.objectContaining({
        mapping: 'assertions',
        key: '123field',
        httpMethod: 'GET',
        url: expect.stringContaining('/mapping/assertions/123field'),
      }),
    }));
    consoleSpy.mockRestore();
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

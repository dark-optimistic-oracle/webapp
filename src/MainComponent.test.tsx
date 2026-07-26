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

  it('renders the UMA-like proposal queue by default', () => {
    render(<MainComponent />);

    expect(screen.getByRole('tab', { name: /proposals/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Assertions moving through dispute resolution')).toBeInTheDocument();
    expect(screen.getByText('BTC-USD closed above 100,000 on the reference exchange')).toBeInTheDocument();
    expect(screen.getByText('Votes and voter rewards are private Aleo records')).toBeInTheDocument();
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
        function: 'assertion',
        inputs: expect.arrayContaining(['777field', '888field', '100_000_000u128', '1_000_000u128', '10000u32', '20000u32']),
      })
    );
    expect(screen.getByText(/submitted assertion/i)).toBeInTheDocument();
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

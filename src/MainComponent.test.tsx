import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MainComponent from './MainComponent';

// Mock the useWallet hook
vi.mock('@provablehq/aleo-wallet-adaptor-react', () => ({
  useWallet: () => ({
    publicKey: 'aleo1mockaddress',
    requestTransaction: vi.fn().mockResolvedValue('mock_tx_id'),
  }),
}));

describe('MainComponent', () => {
  it('renders the tabs correctly', () => {
    render(<MainComponent />);
    
    expect(screen.getByText('Create Assertion')).toBeDefined();
    expect(screen.getByText('Dispute')).toBeDefined();
    expect(screen.getByText('Vote')).toBeDefined();
    expect(screen.getByText('Collect')).toBeDefined();
  });

  it('shows assertion inputs by default', () => {
    render(<MainComponent />);
    expect(screen.getByPlaceholderText('Assertion ID (e.g. 123)')).toBeDefined();
    expect(screen.getByText('Submit Assertion')).toBeDefined();
  });

  it('switches to dispute tab', () => {
    render(<MainComponent />);
    
    fireEvent.click(screen.getByText('Dispute'));
    
    expect(screen.getByPlaceholderText('Assertion ID to dispute (e.g. 123)')).toBeDefined();
    expect(screen.getByText('Submit Dispute')).toBeDefined();
  });
});

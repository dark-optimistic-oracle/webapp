import { useMemo } from 'react';
import { AleoWalletProvider } from '@provablehq/aleo-wallet-adaptor-react';
import { WalletModalProvider, WalletMultiButton } from '@provablehq/aleo-wallet-adaptor-react-ui';
import { ShieldWalletAdapter } from '@provablehq/aleo-wallet-adaptor-shield';
import { DecryptPermission } from '@provablehq/aleo-wallet-adaptor-core';
import { Network } from '@provablehq/aleo-types';
import '@provablehq/aleo-wallet-adaptor-react-ui/dist/styles.css';
import './App.css';
import MainComponent from './MainComponent';

function App() {
  const wallets = useMemo(
    () => [
      new ShieldWalletAdapter({
        appName: 'Dark Optimistic Oracle',
      }),
    ],
    []
  );

  return (
    <AleoWalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={Network.TESTNET} // Using TESTNET because LOCALNET might not exist in Network enum
      autoConnect
    >
      <WalletModalProvider>
        <div className="app-container">
          <header className="header">
            <div className="logo">
              DOO <span>Oracle</span>
            </div>
            <WalletMultiButton />
          </header>
          <main className="main-content">
            <div className="hero-section">
              <h1 className="hero-title">Dark Optimistic Oracle</h1>
              <p className="hero-subtitle">
                The privacy-preserving oracle. Powered by Aleo zero-knowledge proofs.
                Hide your incentive payouts and keep dispute voting completely anonymous.
              </p>
            </div>
            <MainComponent />
          </main>
          <footer className="footer">
            &copy; {new Date().getFullYear()} Dark Optimistic Oracle. Zero-Knowledge Private Voting.
          </footer>
        </div>
      </WalletModalProvider>
    </AleoWalletProvider>
  );
}

export default App;

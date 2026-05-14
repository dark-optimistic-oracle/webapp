import { useMemo } from 'react';
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base';
import '@demox-labs/aleo-wallet-adapter-reactui/styles.css';
import './App.css';
import MainComponent from './MainComponent';

function App() {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'Dark Optimistic Oracle',
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet}
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
    </WalletProvider>
  );
}

export default App;

import { useMemo } from 'react';
import { AleoWalletProvider } from '@provablehq/aleo-wallet-adaptor-react';
import { WalletModalProvider, WalletMultiButton } from '@provablehq/aleo-wallet-adaptor-react-ui';
import { ShieldWalletAdapter } from '@provablehq/aleo-wallet-adaptor-shield';
import { DecryptPermission } from '@provablehq/aleo-wallet-adaptor-core';
import { Network } from '@provablehq/aleo-types';
import { ShieldCheck } from 'lucide-react';
import '@provablehq/aleo-wallet-adaptor-react-ui/dist/styles.css';
import './App.css';
import MainComponent from './MainComponent';

function App() {
  const wallets = useMemo(
    () => [new ShieldWalletAdapter()],
    []
  );

  return (
    <AleoWalletProvider
      autoConnect
      decryptPermission={DecryptPermission.UponRequest}
      network={Network.TESTNET}
      wallets={wallets}
    >
      <WalletModalProvider>
        <div className="app-shell">
          <header className="site-header">
            <a className="brand-mark" href="https://dark-optimistic-oracle.github.io/website/" aria-label="Dark Optimistic Oracle website">
              <span className="brand-icon">
                <ShieldCheck aria-hidden="true" size={19} />
              </span>
              Dark Optimistic Oracle
            </a>
            <div className="header-actions">
              <nav aria-label="Project navigation">
                <a href="https://dark-optimistic-oracle.github.io/website/">Website</a>
                <a aria-current="page" href="./">App</a>
                <a href="https://dark-optimistic-oracle.github.io/webdocs/">Docs</a>
              </nav>
              <WalletMultiButton />
            </div>
          </header>

          <main className="app-main">
            <section className="app-intro" aria-labelledby="app-title">
              <div>
                <span className="eyebrow">Aleo testnet</span>
                <h1 id="app-title">Oracle console</h1>
                <p>Create, dispute, inspect, vote on, and settle assertions.</p>
              </div>
              <a href="https://dark-optimistic-oracle.github.io/webdocs/">Protocol documentation</a>
            </section>

            <MainComponent />
          </main>

          <footer className="site-footer">
            <span>Dark Optimistic Oracle on Aleo testnet</span>
            <div>
              <a href="https://dark-optimistic-oracle.github.io/website/">Website</a>
              <a href="https://dark-optimistic-oracle.github.io/webdocs/">Docs</a>
            </div>
          </footer>
        </div>
      </WalletModalProvider>
    </AleoWalletProvider>
  );
}

export default App;

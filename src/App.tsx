import { useMemo } from 'react';
import { AleoWalletProvider } from '@provablehq/aleo-wallet-adaptor-react';
import { WalletModalProvider, WalletMultiButton } from '@provablehq/aleo-wallet-adaptor-react-ui';
import { ShieldWalletAdapter } from '@provablehq/aleo-wallet-adaptor-shield';
import { DecryptPermission } from '@provablehq/aleo-wallet-adaptor-core';
import { Network } from '@provablehq/aleo-types';
import { ShieldCheck } from 'lucide-react';
import '@provablehq/aleo-wallet-adaptor-react-ui/dist/styles.css';
import heroArt from './assets/hero.png';
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
            <div className="brand-mark" aria-label="Dark Optimistic Oracle">
              <span className="brand-icon">
                <ShieldCheck aria-hidden="true" size={19} />
              </span>
              Dark Optimistic Oracle
            </div>
            <WalletMultiButton />
          </header>

          <main className="app-main">
            <section className="intro-band" aria-label="Product overview">
              <div className="intro-copy">
                <span className="eyebrow">Privacy-preserving oracle on Aleo</span>
                <h1>Assert off-chain facts, challenge them, resolve disputes privately.</h1>
                <p>
                  An economically secured optimistic oracle with public assertion state and
                  aggregate tallies, plus private Aleo records for voting rights, vote receipts,
                  and voter awards.
                </p>
                <div className="privacy-metrics" aria-label="Privacy properties">
                  <span>Public assertion lifecycle</span>
                  <span>Private voting records</span>
                  <span>Zero-knowledge execution</span>
                </div>
              </div>
              <div className="hero-art" aria-hidden="true">
                <img alt="" src={heroArt} />
              </div>
            </section>

            <MainComponent />
          </main>

          <footer className="site-footer">
            Dark Optimistic Oracle on Aleo Testnet
          </footer>
        </div>
      </WalletModalProvider>
    </AleoWalletProvider>
  );
}

export default App;

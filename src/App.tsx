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
                <span className="eyebrow">Private dispute arbitration on Aleo</span>
                <h1>Assert truth, dispute bad data, keep voters hidden.</h1>
                <p>
                  A zero-knowledge optimistic oracle inspired by UMA's assert-and-dispute flow,
                  with Aleo private records for voting rights, ballots, and voter rewards.
                </p>
                <div className="privacy-metrics" aria-label="Privacy properties">
                  <span>Private token transfers</span>
                  <span>Hidden voter identity</span>
                  <span>Shield wallet execution</span>
                </div>
              </div>
              <div className="hero-art" aria-hidden="true">
                <img alt="" src={heroArt} />
              </div>
            </section>

            <MainComponent />
          </main>

          <footer className="site-footer">
            Dark Optimistic Oracle local UI for dark_optimistic_oracle.aleo.
          </footer>
        </div>
      </WalletModalProvider>
    </AleoWalletProvider>
  );
}

export default App;

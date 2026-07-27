# Dark Optimistic Oracle Web App

## Overview

Dark Optimistic Oracle is a privacy-preserving optimistic oracle on Aleo. The product follows the familiar UMA-style lifecycle of assertion, dispute, voting, and settlement, but uses zero-knowledge records so voter identity, ballots, and voter payouts can remain private.

The frontend connects to Shield through the Provable Aleo wallet adapter and submits testnet transactions to `dark_optimistic_oracle.aleo`.

The deployed web app is published at [dark-optimistic-oracle.github.io/webapp](https://dark-optimistic-oracle.github.io/webapp/).

## UI

The `real-ui` interface is an operational oracle console:

- **Proposals:** a queue of assertions moving through challenge windows, disputes, and settlement.
- **Create:** asserters submit an assertion ID, title field, content hash, assertion cost, voter stake, and deadlines.
- **Dispute:** disputers challenge an open assertion by posting the matching public DOOR bond.
- **Private vote:** voters paste a private DOOR payment record, buy a voting right, then submit a private confirm or deny vote.
- **Settle:** winners collect asserter or disputer awards, voters collect private reward records, and unused voting rights can be refunded.

For development, the form defaults mirror the local demo workflow in `../core/demo/README.md`, including assertion `123field`, a `100_000_000u128` assertion bond, and `1_000_000u128` voter stake.

## Aleo Testnet

The hosted app uses Aleo testnet and expects:

- `token_registry.aleo`, the canonical registry already deployed on testnet.
- `dark_optimistic_oracle.aleo`, deployed from the sibling `../core` repository.

Connect Shield to Aleo testnet before submitting transactions.

At startup the production UI checks the official Provable API for the oracle
program and current block height. Transaction controls remain disabled if the
program is absent or testnet cannot be verified. New assertion deadlines default
to 10,000 and 20,000 blocks after the current testnet height.

The public app calls the current program ABI: `create_assertion`,
`dispute_assertion`, `new_voting_right`, `confirm`, `deny`, and the four
`collect_*`/refund settlement functions. Local demo records are not embedded as
production defaults.

## Local Backend

Start and install the local devnet from `../core`:

```bash
./run_node.sh
./install.sh
```

Then connect Shield to the appropriate Aleo environment and use the demo accounts and private records from `../core/demo/README.md`.

## Deployment

GitHub Actions builds, tests, and publishes the app to GitHub Pages after every push to `main`. The production build uses `/webapp/` as its Vite base path; local builds continue to use `/`.

The workflow can also be run manually from the repository's Actions page.

## Getting Started

```bash
pnpm install
pnpm run dev
```

## Testing

```bash
pnpm test
```

The unit tests use Vitest and Testing Library. They cover the proposal queue, tab navigation, disconnected wallet behavior, and the transaction payload for assertion submission.

For a production release, add integration tests against a running local devnet and Shield wallet once browser wallet automation is available.

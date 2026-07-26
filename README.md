# Dark Optimistic Oracle Web App

## Overview

Dark Optimistic Oracle is a privacy-preserving optimistic oracle on Aleo. The product follows the familiar UMA-style lifecycle of assertion, dispute, voting, and settlement, but uses zero-knowledge records so voter identity, ballots, and voter payouts can remain private.

The frontend connects to Shield through the Provable Aleo wallet adapter and submits transactions to `dark_optimistic_oracle.aleo`.

## UI

The `real-ui` interface is an operational oracle console:

- **Proposals:** a queue of assertions moving through challenge windows, disputes, and settlement.
- **Create:** asserters submit an assertion ID, title field, content hash, assertion cost, voter stake, and deadlines.
- **Dispute:** disputers challenge an open assertion by posting the matching public DOOR bond.
- **Private vote:** voters paste a private DOOR payment record, buy a voting right, then submit a private confirm or deny vote.
- **Settle:** winners collect asserter or disputer awards, voters collect private reward records, and unused voting rights can be refunded.

For development, the form defaults mirror the local demo workflow in `../core/demo/README.md`, including assertion `123field`, a `100_000_000u128` assertion bond, and `1_000_000u128` voter stake.

## Backend Assumptions

The app expects the local Aleo programs from sibling repositories:

- `../core` deploys `dark_optimistic_oracle.aleo`.
- `../token-registry-workaround` deploys the shortened `token_registry.aleo` used by the demo.

Start and install the local devnet from `../core`:

```bash
./run_node.sh
./install.sh
```

Then connect Shield to the appropriate Aleo environment and use the demo accounts and private records from `../core/demo/README.md`.

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

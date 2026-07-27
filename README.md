# Dark Optimistic Oracle Web App

Dark Optimistic Oracle is a privacy-preserving optimistic oracle on Aleo. It lets decentralized applications use assertions about off-chain events while preserving privacy in the disputed voting process.

The hosted interface is available at [dark-optimistic-oracle.github.io/webapp](https://dark-optimistic-oracle.github.io/webapp/).

## Purpose

An asserter publishes a claim identifier, public metadata, a content hash, deadlines, and economic terms. The claim can settle optimistically when nobody challenges it. If it is disputed, staked voters resolve it and the program distributes awards or refunds according to the result.

The protocol is intended to provide a verifiable source of off-chain outcomes for applications such as prediction markets, insurance, decentralized finance, supply-chain automation, gaming, and governance.

## Protocol lifecycle

1. **Assert:** An asserter creates a claim and posts the required public DOOR amount.
2. **Dispute:** A disputer challenges the claim before its dispute deadline and posts the matching amount.
3. **Vote:** A token holder spends a private DOOR record to create a private voting right, then confirms or denies the assertion.
4. **Settle:** Eligible participants collect the public asserter or disputer settlement, a private voter award, or a refund for an unused voting right.

Deadlines and settlement conditions are enforced by `dark_optimistic_oracle.aleo`.

## Public and private data

The Aleo program deliberately combines public protocol state with private records:

- Assertion terms, content hashes, deadlines, asserter and disputer addresses, and aggregate confirm/deny totals are public.
- Voting rights, vote receipts, and voter award tokens are private Aleo records.
- The app hashes claim text locally and submits only the resulting field. It does not publish or store the original text, so users must retain the exact source material needed to verify the hash.

This interface describes concrete record visibility and does not claim that all transaction metadata is hidden.

## Current web app

The React interface connects to Shield through the Provable Aleo wallet adapter and targets Aleo testnet. It provides:

- On-chain assertion lookup by known assertion ID, including public terms, participants, and aggregate vote totals.
- Assertion creation with local content hashing.
- Dispute submission.
- Private voting-right purchase and confirm/deny transactions.
- Public and private settlement actions supported by the current program ABI.
- Network and program availability checks that disable transaction controls when testnet cannot be verified.

Aleo mappings are key-value stores and do not provide an assertion index, so the app cannot discover every assertion automatically. Consumers should retain or publish assertion IDs through their own application or indexer.

DAO governance, cross-chain bridges, and contracts on other networks are future integration stages. They are not represented as available features in this web app.

## Architecture

The site is a static React and Vite application suitable for GitHub Pages:

```text
Browser
  ├─ Provable API → public program state and current testnet height
  └─ Shield wallet → Aleo transaction authorization
                         │
                         ▼
              dark_optimistic_oracle.aleo
                         │
                         ▼
                  token_registry.aleo
```

The public testnet deployment uses the canonical `token_registry.aleo`. The sibling `../token-registry-workaround` project is only required for the local devnet.

## Aleo testnet

The app expects:

- `token_registry.aleo`, the canonical registry deployed on testnet.
- `dark_optimistic_oracle.aleo`, deployed from the sibling `../core` repository.
- Shield connected to Aleo testnet.

At startup, the production build checks the official Provable API for the oracle program and current block height. New assertion deadlines default to future block heights derived from the live testnet height. Transactions remain disabled if the oracle program is absent or the network check fails.

The current program calls are:

- `create_assertion`
- `dispute_assertion`
- `new_voting_right`
- `confirm`
- `deny`
- `collect_assertion_cost`
- `collect_dispute_award`
- `collect_voting_award`
- `refund_voting_right`

## Local development

Install dependencies and start Vite:

```bash
pnpm install
pnpm run dev
```

For the local Aleo devnet, follow the instructions in `../core/README.md` and `../core/demo/README.md`. Development-only record examples and account addresses are not rendered by the production build.

## Testing

```bash
pnpm run lint
pnpm exec vitest run
pnpm run build
```

The unit tests cover navigation, disconnected-wallet behavior, assertion and settlement transaction payloads, and public assertion-state lookup. A complete release should also be exercised end-to-end with Shield against a deployed Aleo environment.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds, tests, and publishes `dist` after pushes to `main`. Repository Pages settings must use **GitHub Actions** as the source.

The production build uses `/webapp/` as its Vite base path, while local development uses `/`.

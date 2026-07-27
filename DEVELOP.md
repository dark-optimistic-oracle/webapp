# Development Process

Last updated: 2026-07-27

## Current status

The Vite/React client builds successfully, its six component tests pass, and it
targets Aleo Testnet through `https://api.explorer.provable.com/v2`. It uses the
Shield wallet adapter and the current `dark_optimistic_oracle.aleo` ABI.

The public oracle is not deployed yet. The shared replacement Testnet
administrator is
`aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf`.
Transactions remain disabled when the API cannot verify the program.

## Initial work

1. Created a Vite and React application in the `webapp` directory.
2. Added Aleo wallet adapter packages for Shield wallet integration.
3. Added `lucide-react`, Vitest, and Testing Library.
4. Built the assertion, dispute, private-voting, and settlement console.

## Protocol model

The interface follows the program's assertion, dispute, private-record voting,
and settlement lifecycle. Governance, bridges, and foreign-chain contracts
remain future integration stages and are not presented as current
functionality.

## UI implementation

The workflow console contains:

- An on-chain assertion lookup showing public terms, participants, and
  aggregate vote totals.
- A workflow rail for Assert, Dispute, Vote, and Settle.
- Asserter, disputer, private voter, and settlement forms.
- Shield wallet connection status and transaction feedback.
- Development-only account and record defaults from `../core/demo/README.md`.

The app submits through `executeTransaction` from the Provable wallet adapter
to `dark_optimistic_oracle.aleo`. Form helpers normalize common Aleo scalar
suffixes such as `field`, `u128`, and `u32`.

The settlement forms call `collect_assertion_award` and
`collect_dispute_award` with `(assertion_id, payout_amount)`, matching the
current contract. Payouts are entered explicitly and verified by the Aleo
program before minting.

## Network and credential boundary

The hosted build targets Testnet. The official API confirms that canonical
`token_registry.aleo` exists, so the local workaround is excluded from public
deployment. The application never receives an operator private key; transaction
authorization remains in the connected wallet.

The generic development credentials were retained under `DEVNET_*` names. A
separate shared `TESTNET_PRIVATE_KEY` is stored only in ignored, mode-`600`
`.env.private` files in `core` and `predmkt`. All real `.env*` files are
ignored; only sanitized `*.example` templates may be tracked.

`../core/deploy_testnet.sh` owns an oracle-only deploy/upgrade path. The complete
oracle-plus-market deployment is owned by `../predmkt/deploy_testnet.sh`.

## GitHub Pages

`.github/workflows/deploy-pages.yml` deploys the production app from `main`.
The workflow installs locked dependencies, lints, tests, builds with
`VITE_BASE_PATH=/webapp/`, uploads `dist`, and deploys through the
`github-pages` environment. Jekyll is not used.

Local development retains the `/` base path. The favicon uses Vite's
`%BASE_URL%` replacement so it also resolves under the GitHub Pages repository
path.

## Validation

```bash
pnpm run lint
pnpm exec vitest --run
pnpm run build
```

The component suite covers public assertion lookup, private-vote navigation,
Aleo input formatting, current dispute and settlement ABI calls, and the
disconnected-wallet state. Vitest discovery is restricted to `src/**/*.test.*`
so ignored review/build artifacts under `temp/` cannot be mistaken for webapp
tests.

The wallet boundary is mocked in unit tests. A real browser-wallet approval
remains a manual Testnet check after deployment.

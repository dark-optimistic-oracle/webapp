# Development Process

Last updated: 2026-07-27

## Current status

The Vite/React client builds successfully, its six component tests pass, and it
targets Aleo Testnet through `https://api.provable.com/v2`. It uses the
Shield wallet adapter and the current `dark_optimistic_oracle.aleo` ABI.

The public oracle is deployed and initialized at edition `0`. The shared
Testnet administrator and fee collector is
`aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf`.
Transactions remain disabled when neither official API provider can verify the
program.

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

The primary API is `https://api.provable.com/v2`. Read-only program, mapping,
and height requests fall back to `https://api.explorer.provable.com/v2` when an
official provider is temporarily behind the other. Custom or local endpoints
are never silently redirected.

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

The production build was also exercised in a browser against the deployed
Testnet oracle. The console, assertion lookup, and workflow tabs rendered
without browser warnings or errors. Signing was intentionally not attempted
because that requires an interactive Shield wallet approval.

## Browser audit log

Every frontend-initiated Aleo read and every transaction handed to Shield is
written to the browser console with the prefix `[Aleo audit]`. Entries use the
`aleo-browser-audit/v1` schema and contain a monotonic sequence number, call ID,
timestamp, phase, description, network, program, called function, and every
parameter. Read entries include the exact HTTP method and provider URL;
transaction entries include ordered and named Leo inputs, caller, fee, and fee
privacy. Shield's initial temporary identifier is recorded as
`walletRequestId`. The frontend polls `transactionStatus` for up to two minutes
and adds a response entry with the terminal wallet status, poll count, timeout
state, and real `onchainTransactionId` when accepted. This avoids presenting a
wallet request ID as blockchain evidence.

Request and response/submission entries repeat the complete call description so
each line can be audited independently. Values are serialized immediately to
prevent later object mutation from changing historical console output. Private
record plaintext is replaced with a classification, plaintext length, and
SHA-256 fingerprint before logging. The fingerprint allows correlation across
an audit without disclosing a spendable record.

Provable can represent an absent mapping value as either HTTP 404 or a JSON
`null` response with HTTP 200. The mapping reader treats both forms as missing
state so an absent assertion or participant is never rendered as the literal
string `"null"`.

The audit writer automatically stores the latest 2,000 redacted entries under a
webapp-specific `localStorage` key. `buildAleoAuditMarkdown` converts the journal
to human-readable operation explanations followed by exact JSON, and the UI's
**Download audit LOG.md** control downloads it. Static GitHub Pages cannot write
or commit repository files, so reviewed exports must still be appended and
committed deliberately. The call inventory and retained evidence live in
[LOG.md](LOG.md).

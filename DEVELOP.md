# Development Process

## Initial Work

1. Created a Vite and React application in the `webapp` directory.
2. Added Aleo wallet adapter packages for Shield wallet integration.
3. Added `lucide-react` for interface icons and Vitest with Testing Library for unit tests.
4. Built an initial dark UI with crude action buttons for assertion, dispute, voting, and collection calls.

## Real UI Branch

Created and pushed the `real-ui` branch to `origin/real-ui`.

The requested tag name `v0.0.1 - Crude buttons and calls` could not be created because Git rejects that ref name as invalid. A valid replacement would be `v0.0.1-crude-buttons-and-calls`.

## UMA Reference

Reviewed the current UMA documentation for the optimistic oracle lifecycle. The relevant UX concepts are proposal queues, challenge windows, dispute escalation, wallet confirmation, and settlement after dispute resolution. Dark Optimistic Oracle adapts that flow to Aleo and does not include Ethereum mainnet DVM escalation or cross-chain claims.

## UI Implementation

Rebuilt the frontend around a workflow console:

- A proposal board showing challenge, disputed, and settlement states.
- A workflow rail for Assert, Dispute, Vote, and Settle.
- Asserter, disputer, private voter, and settlement forms.
- Shield wallet connection status and transaction feedback.
- Demo account and record defaults from `../core/demo/README.md`.

The app still submits through `executeTransaction` from the Provable wallet adapter to `dark_optimistic_oracle.aleo`. Form helpers normalize common Aleo scalar suffixes such as `field`, `u128`, and `u32`.

## Backend Notes

The UI is designed for the local devnet described in `../core/README.md` and `../core/demo/README.md`.

The hosted build targets Aleo testnet. Contract deployment and live-network discoveries are documented in `../core/README.md`.

The official testnet API confirms that canonical `token_registry.aleo` exists.
The local workaround is therefore excluded from public deployment. The oracle
was not present during this pass, and its Leo 4.3.4 deployment fee was estimated
at `21.609156` credits while the configured deployer held `10.049749`; no
underfunded transaction was broadcast.

The configured deployer/admin is also Leo's publicly documented local-devnet
account. It is not safe for an upgradable public deployment regardless of its
balance. The testnet script now refuses that account; a new secure admin address
and matching funded key are required.

The core program was migrated to current Leo syntax while preserving its
admin-only upgrade constructor. Record arguments now rely on their intrinsic
private visibility, and cross-program finalizers follow checks-effects-
interactions ordering. `../core/deploy_testnet.sh` provides a canonical-registry
deploy/upgrade path once the deployer is funded.

## GitHub Pages

Added `.github/workflows/deploy-pages.yml` to continuously deploy the production app from `main`.

The workflow:

1. Installs the locked pnpm dependencies on Node.js 22.
2. Runs ESLint and the Vitest suite.
3. Builds with `VITE_BASE_PATH=/webapp/`.
4. Uploads `dist` as a GitHub Pages artifact.
5. Deploys through the protected `github-pages` environment.

Local development and builds retain the `/` base path because `VITE_BASE_PATH` is only set by the deployment workflow.

The favicon also uses Vite's `%BASE_URL%` replacement so it resolves beneath the
GitHub Pages repository path. The production UI verifies the oracle program and
loads future assertion deadlines from the official testnet height endpoint
before enabling transactions.

## Tests

Run:

```bash
pnpm test
```

Current unit tests cover:

- Rendering the UMA-like proposal queue.
- Switching to the private voting workflow.
- Formatting and submitting assertion transaction inputs.
- Disconnected wallet disabled state.
- Current deployed ABI names and structured assertion input formatting.

Remaining integration test gap: a full Shield wallet plus local Aleo devnet transaction run was not automated in this UI pass.

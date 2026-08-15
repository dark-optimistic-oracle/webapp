# Dark Optimistic Oracle Web App

Transaction console for `dark_optimistic_oracle.aleo` on Aleo testnet.

- Website: https://dark-optimistic-oracle.github.io/website/
- App: https://dark-optimistic-oracle.github.io/webapp/
- Documentation: https://dark-optimistic-oracle.github.io/webdocs/

Protocol purpose, lifecycle, privacy boundaries, architecture, and integration notes live in the [documentation repository](https://github.com/dark-optimistic-oracle/webdocs).

## Features

- Shield wallet connection on Aleo testnet.
- Public assertion lookup by known ID.
- Assertion and dispute transactions.
- Private voting-right, confirm, and deny transactions.
- Public and private settlement transactions.
- Fail-closed network and program availability checks.

## Development

```bash
pnpm install
pnpm run dev
```

For local Aleo devnet setup and sample records, follow `../core/README.md` and `../core/demo/README.md`.

## Validation

```bash
pnpm run lint
pnpm exec vitest run
pnpm run build
```

## Auditing Aleo calls

Open the browser developer console and filter for `[Aleo audit]`. The app logs
one JSON request entry and one or more response, submission, or error entries for every
frontend-initiated Aleo call. Each entry includes a sequence number and call ID,
the program and function, all named positional inputs or read parameters, the
provider URL, fee settings, and caller. For writes, the submission entry labels
Shield's temporary identifier as `walletRequestId`; the app then polls Shield
and records the terminal wallet status and real `onchainTransactionId` after
Testnet accepts the transaction. A pending request is never presented as an
on-chain transaction ID.

Private-record plaintext passed to Shield is never written to the console. The
audit records its input name, private-record classification, plaintext length,
and SHA-256 fingerprint so an auditor can correlate calls without receiving a
spendable record. Private keys are never available to or logged by the app.

Every redacted entry is also retained automatically in browser storage. Use the
app's **Download audit LOG.md** control to export exact JSON evidence with a
plain-English explanation for each operation. The complete call inventory and
retained QA record are in [LOG.md](LOG.md).

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` publishes from `main`. In repository Pages settings, select **GitHub Actions** as the source.

The production build uses `/webapp/` as its Vite base path. A future custom domain can be attached through GitHub Pages without changing application routes.

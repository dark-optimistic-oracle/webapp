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
- Record-private voting-right, confirm, and deny transactions with private fees.
- Public and private settlement transactions.
- Strict Aleo literal/range validation and duplicate-wallet-request prevention.
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
pnpm audit --prod
pnpm audit
```

The dated findings, dispositions, residual risks, and verification evidence are
maintained in [AUDIT.md](AUDIT.md).

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
retained QA record are in [LOG.md](LOG.md). Contributors and coding agents must
follow [AGENTS.md](AGENTS.md) and commit the relevant log entries with every
experiment or Aleo call sequence. The log commit must also be pushed unless the
user explicitly requests local-only work or the remote is unavailable.

## GitHub Pages

### Screenshot demos and step-tagged logs

Open the app with `?demo=demo-20261003` to show the demo audit controls.
Set **Demo step** before each action. The request and its later result retain
that label, even if the operator changes steps while waiting. Use **Download
audit LOG.md** to preserve the journal; **View demo audit log** shows identical
Markdown for inspection. Never include private records in slides. See
[the screenplay](demo-slideshow/DEMO_SCREENPLAY.md).

The demo folder also contains numbered screenshots, `slides.json`, an HTML
slideshow (`index.html`) and `DEMO_SLIDESHOW.pdf`. Captions distinguish planned
steps from executed evidence. Import a reviewed browser export with
`node demo-slideshow/import_audit_log.mjs EXPORT.md LOG.md`; duplicate imports
are detected by digest. Review the result, then commit and push LOG.md.

Private QA preparation requires the additional explicit `&demoTools=1` URL
flag. Its controls can transfer 1000 DOOR units and 3 Testnet ALEO **to the
connected wallet itself**, then load unspent records through Shield and place
a selected record into the existing form. Every transfer requires wallet approval.
Record plaintext stays in memory and form fields, not audit exports; clear those
inputs before capture. This mode uses a 10000-microcredit optional priority fee
instead of the normal 1000000; Shield displays the full network fee.

The workflow in `.github/workflows/deploy-pages.yml` publishes from `main`. In repository Pages settings, select **GitHub Actions** as the source.

The production build uses `/webapp/` as its Vite base path. A future custom domain can be attached through GitHub Pages without changing application routes.
The document carries a restrictive CSP and no-referrer policy; complete HTTP
security headers will require a header-capable custom-domain front door.
# Assertion bond visibility

The Settle tab also exposes both public payout amounts. Choose the amount for
the actual resolution branch before collecting; do not rely on a value left in
another tab. **Close audit preview** hides the journal without erasing it.

The Create tab shows **Assertion bond** explicitly. This is the DOOR amount burned
when creating an assertion; a dispute must post exactly the same bond. Payout
amount fields do not set the bond. Verify the bond and deadlines in Shield's
advanced transaction details before approving.

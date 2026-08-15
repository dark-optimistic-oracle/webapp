# Security audit record

This file is an append-only record of security reviews of the Dark Optimistic
Oracle web application. Each review or remediation verification is a separate
dated chapter. Browser audit exports are diagnostic evidence produced by the
client; transaction IDs must still be verified against Aleo.

## 2026-08-15 — Pre-remediation audit

Audit time: 2026-08-15 06:29 EDT (computer local time).

### Scope and method

The review covered wallet connection and transaction construction, Aleo mapping
reads, audit-log capture/export, user-input conversion, browser storage,
dependency and lockfile state, GitHub Pages CI, production output, repository and
history secret scans, HTTP response headers, and integration assumptions about
`dark_optimistic_oracle.aleo`. It included lint, all 11 Vitest tests, a production
build, production and full dependency audits, static source searches, and live
read-only Testnet verification. The associated calls and ordered evidence are in
`LOG.md`.

### Findings

| ID | Severity | Status | Finding and impact | Recommendation |
| --- | --- | --- | --- | --- |
| WEB-2026-08-15-01 | High | Open | Direct wallet packages use the floating version `latest`; the lockfile resolves pre-release `0.3.0-alpha.4` packages. Unused direct Provable dependencies add unnecessary review surface. A future install or lockfile refresh can silently change wallet behavior. | Pin reviewed stable wallet-adaptor versions, align the supported React version, remove unused direct packages, and keep a frozen lockfile. |
| WEB-2026-08-15-02 | High | Open | Every transaction requests a public fee, including private-record voting operations. Combined with the public `confirm`/`deny` transition name, this exposes the fee payer and substantially weakens the promised voter privacy. | Request private fees for voting-right, vote, receipt-claim, and unused-right-refund operations; explain that the transition direction and aggregate tally remain public. |
| WEB-2026-08-15-03 | Medium | Open | Transaction controls do not have an application-level pending lock. Repeated clicks can produce duplicate wallet prompts; rejected Aleo transactions can still consume fees. | Disable all transaction controls while a request is pending and test double-submission behavior. |
| WEB-2026-08-15-04 | Medium | Open | Integer conversion helpers append `field`, `u32`, or `u128` suffixes without strict lexical and range validation. Malformed values reach the wallet, where rejection is harder to understand and may cost a fee if submitted. | Parse canonical decimal input, reject signs/decimals/exponents/embedded suffixes, enforce type ranges, and validate deadline relationships before requesting a transaction. |
| WEB-2026-08-15-05 | Medium | Open | GitHub Actions are referenced by mutable major tags and the build job inherits Pages and OIDC write permissions before dependency installation and tests. A compromised action or dependency has broader privileges than necessary. | Pin actions to reviewed commit SHAs and separate unprivileged verification/build from the least-privileged deployment job. |
| WEB-2026-08-15-06 | Medium | Open | The deployed GitHub Pages response has HSTS but no application CSP, frame restriction, MIME-sniffing protection, referrer policy, or permissions policy. GitHub project pages also share their parent origin with other project pages. | Add safe document-level CSP and referrer policy where possible. For final custom-domain production, use a hosting/front-door configuration that can set complete response headers and isolate origins. |
| WEB-2026-08-15-07 | Medium | Accepted for QA, open for release | Audit entries deliberately retain cleartext public call metadata, parameters, results, and errors in the user's browser and voluntary download. This aids debugging as requested, but raw wallet errors could accidentally echo private record material if an upstream wallet includes it. | Keep public data readable, continue explicit redaction of private-record inputs and known secret shapes, warn users to inspect exports, and remove or redesign diagnostic persistence for a final consumer release. |
| WEB-2026-08-15-08 | Medium | Open | The full development dependency audit reports 17 advisories, including a critical Vitest issue and high-severity issues in old Vite/esbuild and transitive tooling. The production-only audit reports zero advisories. | Upgrade the test/build toolchain, regenerate the lockfile, run the full audit in CI, and keep production and development audit results separately visible. |
| WEB-2026-08-15-09 | Low | Open | Downloaded `LOG.md` evidence is generated and stored by the client and can be edited by the user or page script. It demonstrates intended call order but is not a cryptographic audit trail. | Label exports as client-generated, include transaction IDs and network/endpoint context, and require auditors to verify IDs and final mappings on-chain. |

### Positive controls observed

- The production bundle contains no development sample records, private keys,
  wallet password, seed phrase, or private `.env` content.
- No `eval`, `new Function`, or unsafe HTML injection sink was found in the
  application source.
- The audit journal normalizes entries and redacts private-record parameters and
  recognizable private-key or mnemonic shapes before persistence and export.
- Real `.env*` files are ignored and the local private QA file is mode `600`.
- `pnpm audit --prod` reports no known production dependency advisory.

### Verification evidence and limits

- Lint: passed.
- Vitest: 11 passed, 0 failed.
- Production build: passed.
- Production dependency audit: 0 advisories.
- Full dependency audit: 17 advisories (1 critical, 10 high, 5 moderate, 1 low).
- Live Pages and Testnet checks were read-only; no signed transaction was
  submitted during this audit chapter.
- Wallet extension internals, the Aleo network/prover, the canonical token
  registry, browser/OS compromise, and the core contract are external trust
  boundaries. Core findings are tracked separately in the core repository.

## 2026-08-15 — Remediation verification

Verification time: 2026-08-15 07:04 EDT (computer local time).

### Fixes and dispositions

| Finding | Disposition | Remediation and remaining risk |
| --- | --- | --- |
| WEB-2026-08-15-01 | Fixed | Wallet dependencies are pinned to stable 1.0.1 releases, React is aligned to the supported 18.3 line, unused direct Aleo packages were removed, and the lockfile is committed. |
| WEB-2026-08-15-02 | Mitigated | Voting-right purchase, vote, voter-award, and unused-right-refund requests use private fees. UI text now states that record ownership and the fee payer are private while transition direction and aggregate tally remain public. |
| WEB-2026-08-15-03 | Fixed | A synchronous ref plus rendered pending state rejects re-entry and disables every transaction button until the wallet request reaches a terminal result or timeout. Tests exercise sequential submission behavior. |
| WEB-2026-08-15-04 | Fixed | A shared literal module accepts only canonical unsigned decimal Aleo literals, checks `field`/`u32`/`u128` ranges, bounds record size, and validates bond and deadline relationships before opening Shield. |
| WEB-2026-08-15-05 | Fixed | GitHub Actions are pinned to full commit SHAs. Verification/build has read-only contents permission; Pages and OIDC writes exist only on the deployment job. The full dependency audit is a build gate. |
| WEB-2026-08-15-06 | Partially fixed | The HTML now sets a restrictive document CSP and `no-referrer`. GitHub Pages cannot supply the complete response-header policy; origin isolation and response headers remain requirements for the final custom-domain front door. |
| WEB-2026-08-15-07 | Accepted for QA | Readable public diagnostic evidence remains an intentional user-controlled feature. Private-record inputs and secret-like values remain summarized/redacted; users must inspect voluntary exports before sharing them. |
| WEB-2026-08-15-08 | Fixed | Vitest, Vite, jsdom, Babel, and affected transitive packages were upgraded/overridden. Both `pnpm audit --prod` and the full `pnpm audit` report zero known vulnerabilities. |
| WEB-2026-08-15-09 | Accepted limitation | The export is explicitly labeled client-generated evidence. It records network context and real accepted transaction IDs where available; independent chain verification remains mandatory. |

### Verification

- ESLint passed.
- 14/14 Vitest tests passed.
- TypeScript and the production GitHub Pages build passed.
- Production and full dependency audits report zero known vulnerabilities.
- The application still contains no operator private key; signing remains in
  the connected wallet.

This audit does not cover the Shield extension implementation, Aleo VM/prover,
browser compromise, or the upgraded oracle's external dependencies.

## 2026-08-15 — Remediation deployment dependency check

Verification time: 2026-08-15 08:12 EDT (computer local time).

The frontend remediation remains verified by 14/14 tests, lint, production
build, and zero-advisory production/full dependency audits. Its private-fee
selection and strict request validation are active in source and do not depend
on a contract edition. The Pages workflow now requests pnpm `10.14.0`, exactly
matching `packageManager`, so the pinned setup action cannot reject conflicting
tool versions before the build.

The prediction market was accepted as edition 1 on Testnet. The oracle security
candidate remains edition 0 because consensus V18 aborted every large
deployment attempt that reached a target block with insufficient certificate
capacity; provider timeouts prevented several other broadcasts. No oracle
attempt charged a fee or changed mappings. Until the oracle reaches edition 1,
the webapp must be treated as a QA interface to the earlier Testnet contract,
not as evidence that the administrator and voting-cutoff fixes are active
on-chain. Exact public call evidence and the preserved-state checks are recorded
in `LOG.md`.

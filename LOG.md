# Aleo frontend call log

## 2026-10-03 — Private QA preparation controls

User authorization: prepare private records and continue, within an additional
10-Testnet-ALEO budget. Implemented explicitly opt-in self-funding/record tools
and smaller optional priority fees for that bounded run. Plaintext is never
persisted or logged by the helper. Record reads log only counts. No preparation
transaction is claimed before the actual wallet operation is captured below.

## 2026-10-03 — Public screenshot-demo checkpoint

The public Oracle branch executed from the published GitHub Pages frontend.
Assertion 2026100301 was absent before creation, then accepted with QA asserter,
bond 1000 DOOR units, stake 100, title 20261003 and deadlines 20136400/20136440.
Five mapping reads returned matching terms, no disputer and zero votes.
After grace ended, collection of 900 DOOR units was accepted. Exact request
parameters, initiating steps, temporary wallet IDs, accepted transaction IDs and
ordered responses are preserved below in the imported browser journal.
Explorer and screenshot links are in `demo-slideshow/CALLING_SEQUENCE.md`.

Diagnostic shell GETs to `https://api.provable.com/v2/testnet/block/height/latest`
returned, in order: 20136366, 20136396, 20136410, 20136427, 20136437,
20136444, 20136471 and 20136483. These are separate from frontend calls and
have no wallet/transaction ID. They established actual block deadlines without
resetting form state. A later diagnostic GET of the deployed `token_registry.aleo`
source inspected `transfer_public_to_private(field,address,u128,bool)` for
private-record preparation; no preparation transaction was submitted then.

Both apps' Download audit LOG.md controls completed actual browser downloads.
The browser download-event API timed out for Oracle, and macOS denied filesystem
read access to Downloads even after escalation. Therefore the exact journal
was retrieved through View demo audit log (the same Markdown generator), saved
as AUDIT_EXPORT.md, and imported rather than claiming access to the downloaded
file. The public export contains no secrets or private records.

Ten captioned PDF/HTML slides are a public-path checkpoint, not a claim that
every private branch is complete. The user authorized preparing private records
and continuing within an additional 10-Testnet-ALEO budget. Aleo tools unchanged.

## 2026-10-03 — Demo preparation (run demo-20261003)

Purpose: capture actual frontend operations as labeled screenshots and preserve
their ordered call evidence. The initial live page was opened and a wallet
connection attempted; Shield was locked. No transaction was submitted or
accepted during this preparation. macOS initially blocked native wallet access;
after the user granted permissions, Shield unlocked successfully on m24 using
the existing testing-machine credential. No credential is included here.

The initial overview screenshot is provisional: it is not evidence of a
transaction. Browser startup reads will be preserved from the exported journal
during capture, rather than reconstructed from memory. Added step-tagged logs
and tested request/result step preservation: 15 unit tests, lint, build passed;
dependency audit has no known vulnerabilities. Planned calls are listed in
`demo-slideshow/CALLING_SEQUENCE.md`; planned is not executed.

Last updated: 2026-08-15.

This file is the durable audit reference for Aleo calls initiated by the Dark
Optimistic Oracle web app. The application writes the original event stream to
the browser console with the prefix `[Aleo audit]`; it cannot write directly to
this repository when served as a static GitHub Pages site. Every redacted entry
is therefore also retained automatically in browser `localStorage`, up to the
most recent 2,000 entries. The app's **Download audit LOG.md** control exports
that journal with a plain-English explanation before every exact JSON entry.

The call inventory below is complete for the current frontend. The retained
live evidence section records what remains from browser QA. It does not invent
timestamps, sequence numbers, or transaction IDs that were not retained.

No private key, wallet password, seed phrase, or private record plaintext may
be added to this file.

## Audit entry lifecycle

All entries use schema `aleo-browser-audit/v1` and share a `callId`:

| Phase | Meaning |
|---|---|
| `request` | The frontend is about to perform a read or hand a transaction request to Shield. |
| `submitted` | Shield accepted the request and returned a temporary `walletRequestId`. This is not blockchain finality. |
| `response` | A read returned, or Shield reported terminal transaction status. Accepted writes include the real `onchainTransactionId`. |
| `error` | The provider or wallet rejected or failed the operation. |

Transaction entries repeat the program, function, caller, ordered named inputs,
fee, and fee privacy at every phase. Reads repeat the program or network
operation, mapping and key when applicable, HTTP method, and provider URL.

Private record inputs are replaced before logging with their classification,
plaintext length, and SHA-256 fingerprint. The fingerprint supports correlation
without disclosing a spendable record.

## Complete call inventory

### Network and program reads

| Logged function | Parameters | Operation |
|---|---|---|
| `get_latest_block_height` | Provider URL and `GET` method | Obtains the current Testnet height used to propose safe assertion deadlines. |
| `get_program` | `programId = dark_optimistic_oracle.aleo`, provider URL and `GET` method | Fails closed when the deployed oracle cannot be verified. |

### Assertion mapping reads

Each lookup uses `get_mapping_value` on `dark_optimistic_oracle.aleo` with the
known assertion ID as its mapping key.

| Mapping | Operation |
|---|---|
| `assertions` | Loads the public assertion fields and deadlines. |
| `asserters` | Loads the address that bonded and created the assertion. |
| `disputers` | Determines whether the optimistic assertion was challenged. |
| `confirm_votes` | Loads the public aggregate confirm count; individual votes remain private. |
| `deny_votes` | Loads the public aggregate deny count; individual votes remain private. |

An absent mapping may be returned as HTTP 404 or HTTP 200 with JSON `null`.
Both are treated as missing state.

### Transactions

All writes target `dark_optimistic_oracle.aleo`, use a fee of 1,000,000
microcredits, and require interactive Shield approval. Public-balance flows use
a public fee. Record-based voting flows use a private fee so the fee payer is
not added as a public identity link; the called `confirm` or `deny` transition
and aggregate vote counts remain public.

| Function | Ordered named inputs | Fee | Operation |
|---|---|---|---|
| `create_assertion` | `assertion` | Public | Bonds public DOOR and records the assertion ID, title, content hash, cost, voter stake, dispute deadline, and voting deadline. |
| `dispute_assertion` | `assertion_id`, `assertion_cost` | Public | Bonds matching public DOOR before the dispute deadline and opens private voting. |
| `new_voting_right` | `payment`, `assertion_id`, `voter_stake` | Private | Consumes a private DOOR payment record and creates a private voting-right record. `payment` is redacted in logs. |
| `confirm` | `voting_right` | Private | Consumes a private voting right, increments the public confirm aggregate, and returns a private receipt. |
| `deny` | `voting_right` | Private | Consumes a private voting right, increments the public deny aggregate, and returns a private receipt. |
| `collect_voting_award` | `award_amount`, `voting_receipt` | Private | Claims the private winning-voter award after voting closes. |
| `refund_voting_right` | `refund_amount`, `voting_right` | Private | Refunds an unused private voting right after voting closes. |
| `collect_assertion_award` | `assertion_id`, `payout_amount` | Public | Claims the public asserter payout after the applicable deadline and outcome checks. |
| `collect_dispute_award` | `assertion_id`, `payout_amount` | Public | Claims the public disputer payout when private voting rejects the assertion. |

## Retained live Testnet evidence

The production webapp was exercised against Testnet for program availability,
block-height reads, assertion lookups, and workflow navigation. The exact
per-call console sequence and timestamps from that earlier read-only session
were not exported, so they are not presented as verbatim logs here.

No signed transaction was submitted through the webapp during the retained
session. A shared-program `create_assertion` transaction was later submitted
through the prediction-market frontend; it is recorded in that repository's
`LOG.md` and should not be misattributed to this UI.

## Representative messages

The following messages demonstrate the exact current schema. Their sequence,
timestamp, and call ID are illustrative rather than retained live values.

### Mapping read

```json
{"schema":"aleo-browser-audit/v1","sequence":1,"timestamp":"2026-08-15T00:00:00.000Z","callId":"aleo-call-1","phase":"request","kind":"read","network":"testnet","description":"Read dark_optimistic_oracle.aleo.assertions[187031922field]","program":"dark_optimistic_oracle.aleo","function":"get_mapping_value","parameters":{"mapping":"assertions","key":"187031922field","httpMethod":"GET","url":"https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/187031922field"}}
{"schema":"aleo-browser-audit/v1","sequence":2,"timestamp":"2026-08-15T00:00:00.250Z","callId":"aleo-call-1","phase":"response","kind":"read","network":"testnet","description":"Read dark_optimistic_oracle.aleo.assertions[187031922field]","program":"dark_optimistic_oracle.aleo","function":"get_mapping_value","parameters":{"mapping":"assertions","key":"187031922field","httpMethod":"GET","url":"https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/187031922field"},"result":{"httpStatus":200,"ok":true}}
```

### Private-record redaction

```json
{"schema":"aleo-browser-audit/v1","sequence":3,"timestamp":"2026-08-15T00:00:01.000Z","callId":"aleo-call-2","phase":"request","kind":"transaction","network":"testnet","description":"Submit dark_optimistic_oracle.aleo.new_voting_right","program":"dark_optimistic_oracle.aleo","function":"new_voting_right","parameters":{"caller":"aleo1example","inputs":[{"position":0,"name":"payment","value":{"redacted":true,"classification":"private Aleo record","sha256":"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef","plaintextLength":412}},{"position":1,"name":"assertion_id","value":"187031922field"},{"position":2,"name":"voter_stake","value":"1000000u128"}],"fee":1000000,"privateFee":true}}
```

The example address and fingerprint are deliberately non-spendable placeholders.

## Preserving future sessions

For a future browser QA session, use **Download audit LOG.md**. Review the
generated explanations and JSON, then append the relevant dated session to this
checked-in file and commit it. The static site cannot commit to GitHub on the
user's behalf. Preserve rejected and timed-out calls as well as accepted calls;
never replace a `walletRequestId` with an assumed on-chain ID.

## Security-audit experiment: 2026-08-15

**What happened:** A fresh read-only audit checked the webapp source, wallet
request construction, audit redaction, GitHub Pages workflow and response
headers, dependency advisories, tests, production build, tracked history, and
the Testnet oracle program used by this app. No wallet transaction was prepared,
signed, or broadcast during this audit.

The experiment ran from approximately `2026-08-15T10:09:00Z` through
`2026-08-15T10:18:35Z`.

### Local verification

| Command or check | Result |
|---|---|
| `pnpm run lint` | Passed. |
| `pnpm exec vitest run` | 11 of 11 browser/unit tests passed. Aleo entries printed by these tests used mocked providers and wallet IDs; they were not live calls. |
| `pnpm run build` | Passed with Vite 8.0.12; the static bundle was produced without source maps or detected secret strings. |
| `pnpm audit --prod` | No known production dependency vulnerabilities. |
| `pnpm audit` | Reported 17 development-tool advisories: 1 critical, 10 high, 5 moderate, and 1 low. |
| Current and history-aware tracked-secret scans | No Aleo private key, seed-phrase assignment, wallet-password assignment, or PEM private key was found. The ignored QA environment file remained mode `600`. |
| GitHub Pages `HEAD` and index reads | Returned HTTP 200 and the current production asset hashes. HSTS was present; CSP, clickjacking protection, Referrer-Policy, Permissions-Policy, and `X-Content-Type-Options` were absent. |

### Read-only Testnet oracle verification

All reads used network `testnet` and endpoint
`https://api.provable.com/v2`. They did not require a private key.

1. `leo query program dark_optimistic_oracle.aleo -q` returned edition-0 Aleo
   instructions. A whitespace-insensitive diff against the fresh local build
   found only the intentional constructor administrator substitution:
   `aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf`.
2. `leo query program dark_optimistic_oracle.aleo --mapping-value fee_collector 0u8 -q`
   returned the same administrator address. This confirms that the existing
   Testnet deployment was initialized by the intended account.
3. `leo query program token_registry.aleo --mapping-value registered_tokens
   346688784394585735039324415800163929700021701423791533632764818774905958305field -q`
   returned the DOOR registration. Its token administrator and authorization
   party are the oracle program address
   `aleo1nyflwg9mjfkfp2n9mtng0snxj9qrhahkjxp5l9pag4zxm3qrssrqwv8tml`, and its
   retained supply was `999999900000000u128` of a
   `10000000000000000u128` maximum.

The audit found security issues that require remediation before Mainnet. This
entry records the experiment and public network evidence; it is not a claim
that the application is secure or an independent third-party audit.


## Security remediation and Testnet upgrade experiment: 2026-08-15

**What happened:** The audited contract fixes were compiled with Leo 4.4.1,
checked against the deployed edition-0 interfaces, and submitted through the
dedicated Testnet administrator. No wallet password, private key, seed phrase,
private record, transaction signature, or raw provider error body is retained
here.

The experiment ran from approximately `2026-08-15T10:45:00Z` through
`2026-08-15T12:12:25Z` using network `testnet` and the official Provable
API endpoints.

### Read-only preflight and compatibility calls

| Call | Public parameters | Result and purpose |
|---|---|---|
| `get_program` / `latest_edition` | `dark_optimistic_oracle.aleo` | Edition 0. The generated candidate kept its program ID, mappings, records, transition inputs, and finalize input order. |
| `get_program` / `latest_edition` | `doo_prediction_market.aleo` | Edition 0 before the market upgrade. The generated candidate preserved every edition-0 interface and added only `settlement_assertions`. |
| `get_mapping_value` | Oracle `fee_collector[0u8]` | Returned the documented dedicated administrator. |
| `get_mapping_value` | Oracle `assertions[187031922field]` | Returned the retained QA assertion before and after the attempts with identical fields. |
| `get_mapping_value` | Market `markets[187031921field]`, collateral, supplies, and resolution | Returned the retained market, `300000u128` collateral, `200000u128` YES, `100000u128` NO, and `resolved = false`. |

Leo 4.3.4 first produced an obsolete base-fee estimate and the network did not
accept candidate `at184pml9xx44j82g3cz8um4sl4xfesj5lvlxqzyjnk07lyzv7nlcpswcph5e`.
No accepted transaction or fee resulted. Leo 4.4.1 uses the active consensus
V18 cost rules. Local compatibility checks also rejected an oracle initializer
and a market settlement candidate whose finalize input order differed from
edition 0; both were corrected before any broadcast or fee.

### Oracle upgrade calls

The final oracle candidate's public parameters were:

- program: `dark_optimistic_oracle.aleo`;
- existing edition: `0`;
- administrator: the documented dedicated Testnet administrator;
- combined circuit density: `3481397`;
- minimum public fee if accepted: `29.406397` credits;
- dependencies: canonical `token_registry.aleo` and `credits.aleo`.

Consensus V18 gives the target block 75,000 deployment-density units per
certificate, so this candidate needs at least 47 certificates. The following
public deployment IDs reached validators but landed in lower-capacity blocks
and were recorded in each block's `aborted_transaction_ids` list:

| Candidate transaction ID | Block | Certificates | Result |
|---|---:|---:|---|
| `at1550we5h9nnd7sp7mc60n8u35v26m2cpkr7xn7pvmaxevx2ynpc8sp60srj` | 18742086 | 44 | Aborted; no fee or state change. |
| `at1zs4syx646ggk44u5vgkqe74edtfyrf6rcmvrmx9qxe5cnv70ssqqz9hjdt` | 18742208 | 38 | Aborted; no fee or state change. |
| `at197nejl2gj066r49nx4jhdunm86ckf7crahpf620y89cljc022vpqfsdwep` | 18742421 | 41 | Aborted; no fee or state change. |
| `at1zfcprxyanh2hw3xmlafpjk3kh2e02mskctr6g3ruwxaukrhvqvqqu3gy8r` | 18742478 | 38 | Aborted; no fee or state change. |
| `at1gxsl36z6zdnqyzq6zlrft5j03cas25gt9atwav8r8eawckt5jygs3veylj` | 18742531 | 39 | Aborted; no fee or state change. |
| `at1rqrm39jdkccsgepe9qfmmncu6q6hmnsrn8c8f7ddqt6hj03gzy9sphrqex` | 18742557 | 34 | Aborted; no fee or state change. |
| `at1e57gadlhwu9z7nkr4s4hhpml620rxrrqfywflf766ls3lah6gvxsawdg6q` | 18742799 | 36 | Aborted; no fee or state change. |
| `at1ntx9xsdtg89sswyrdex4qa9gl2l2w2tqe5etm4mlny80jq3tdyrqdnd6p0` | 18743022 | 30 | Aborted; no fee or state change. |

The first two rows used the earlier, slightly larger compatible candidate; the
remaining rows used the final `3481397`-density candidate. Several other
provider calls returned HTTP 522 before a candidate ID was returned. They did
not produce an accepted or aborted ledger transaction and charged no fee.

### Accepted prediction-market upgrade

**Operation:** Upgrade `doo_prediction_market.aleo` from edition 0 to edition
1 while leaving the oracle at edition 0.

- Deployment transaction:
  `at1gxza4mhcrendchvguswhyvjvq3ga5pc3wcl7948qvfgzs3g705yslssaal`
- Fee transition:
  `au1tr36sqgsqnu695pc2097trdv096fmm0hmehgql6lqlj00knyyspscsllzn`
- Fee transaction:
  `at14lfgnn4lwxgq2q6hwlxx4y6nlxqvgmytvyzjkepxsf89m9k4hsrq6g62yx`
- Public fee: `12.687318` credits.
- Accepted deployment edition embedded in the transaction: `1`.

One official provider reported edition 1 immediately while another briefly
reported edition 0; the accepted transaction itself embeds edition 1. After the
upgrade, every retained market field and accounting mapping listed above was
unchanged. `settlement_assertions[187031921field]` returned `null`, which is
correct because that legacy QA market has not settled.

### Final state

Final local verification completed after the source and documentation changes:

| Check | Result |
|---|---|
| Webapp lint, Vitest, TypeScript, production build | Passed; 14/14 tests. |
| Prediction-market lint/static checks, Vitest, TypeScript, production build | Passed; 36/36 tests. |
| Leo 4.4.1 core/oracle and market suites | Passed; 10/10 oracle and 13/13 market tests. |
| Devnet, Testnet, and Mainnet deployment dry runs | Passed; no dry run signed or broadcast a transaction. |
| Production and full dependency audits in both apps | Zero known vulnerabilities. |
| Documentation production build | Passed. |

- Oracle: edition 0; security upgrade is committed and tested but still awaits
  a target block with sufficient certificate capacity.
- Prediction market: accepted edition 1 with the settlement-binding and
  distinct-claim fixes active.
- Dedicated administrator public balance: `949027761u64` after the one
  accepted `12.687318`-credit market fee. Oracle aborts did not reduce it.
- Mainnet: no transaction was signed or broadcast.

To retry the oracle safely, install Leo 4.4.1 and run
`LEO_BIN=/path/to/leo-4.4.1 ./deploy_testnet.sh` from `core`. Confirm edition
1 and the preserved mappings before attempting any later edition.

## 2026-08-15 09:08 EDT — Published Pages smoke tests

GitHub Actions run `31884532950` completed successfully for webapp commit
`284f9c4`; documentation run `31884534110` also completed successfully. The
published oracle console and documentation were loaded in the integrated
browser. Both documents completed loading with their expected navigation and
content, the oracle console exposed the on-chain assertion loader and audit-log
download, and Shield correctly remained disconnected. No browser warning or
error was observed during that check.

Prediction-market Actions run `31886243646` subsequently passed its complete
frontend, security, 23-test Leo, three-network dry-build, production-build, and
Pages-deployment gates. Its published page loaded the market, explanation, and
documentation sections; public Testnet reads reported both programs available.
No wallet was connected during any Pages smoke test, so no proof, signed
transaction, submission, or fee occurred.

Before that successful run, two prediction-market CI experiments identified
macOS-only `/bin/zsh` path use and an undeclared `rg` dependency in the shell
harness. The entrypoints now use portable Bash and standard `grep`. The exact
23-test contract suite passed in a clean Ubuntu 24.04 amd64 container without
either command. The container mounted public source read-only, loaded no secret
environment file, and made no signed or broadcast Aleo call.

## 2026-08-15 09:32 EDT — Initialization upgrade-rule assessment

**Purpose:** Determine whether Aleo prevents changes to a function named
`initialize`, and distinguish that function from the immutable upgrade-policy
constructor.

Read-only Testnet calls confirmed oracle edition 0, fetched its public program,
and confirmed the intended fee collector. The on-chain constructor and freshly
compiled candidate constructor matched byte-for-byte. `initialize` retained
zero inputs, one future output, and the same three finalize-input types; only
its internal signer/caller checks changed. No Testnet proof, signature,
transaction, broadcast, or fee occurred.

A disposable local program then made the following Devnet calls using the
generic local fixture account and non-economic Devnet credits:

| Operation | Public parameters | Result |
|---|---|---|
| Deploy `init_upgrade_probe.aleo` edition 0 | Immutable administrator constructor; unrestricted `initialize` logic | Accepted as `at1kmvyghxp3ap534sjj4rkwf9eppmmuq2upjawa0y7nn4l2hjgtuzsyn36rq`. |
| Upgrade the same program | Constructor unchanged; administrator signer/caller checks added inside `initialize`; interfaces unchanged | Accepted as edition 1 in `at1hwq2gmu4zj4000jfjzkgn5w4sskx5jmldt5v57sqq5yakva3ac8q43djuy`. |
| Execute upgraded `initialize` | No user inputs; caller and signer were the public Devnet administrator | Accepted as `at1jxl4yk280d9yut0gawyqydsy4tustu6xx2zjnkc4w76wurx3tu9qrtapzg`; `initialized_by[0u8]` returned the expected administrator. |

The existing local snarkOS 4.8.1 fixture ran consensus V17 while Leo 4.4.1
warned that it expected V18. That is a local harness-version mismatch, not an
upgrade rejection. The inspected active snarkVM 4.9 rule is the same: the
special constructor is immutable, while compatible function/finalize logic is
mutable. The real public blocker remains the oracle candidate's `3481397`
combined density, which needs at least 47 certificates; attempted Testnet blocks
provided only 30–44.

## 2026-08-15 10:18 EDT — Accepted oracle edition-1 upgrade

**Human-readable summary:** The committed security candidate was profiled
without broadcasting, checked against the live edition-0 interface, and then
submitted through the dedicated Testnet administrator. A live 60-block capacity
sample contained three blocks with at least the required 47 certificates. The
first controlled submission in this run landed in a 78-certificate block and
was accepted. Existing oracle state was preserved and initialization was not
repeated. No secret, private record, signature, or wallet credential is retained
in this log.

### Read-only profiling and preflight calls

| Operation | Public parameters | Result and explanation |
|---|---|---|
| `get_program` / `latest_edition` | `dark_optimistic_oracle.aleo` | Loaded edition `0` and passed Leo's upgrade-interface check before transaction generation. |
| Offline `leo upgrade --save` | Testnet, canonical `token_registry.aleo`, no broadcast | Generated the real candidate artifact with `3481397` combined density and a `29.406397`-credit accepted fee. A transient state-root read failed before one artifact was produced; no transaction ID, broadcast, or fee resulted. |
| `get_block` capacity sample | 60 recent Testnet blocks | Certificate counts ranged from 35 to 82; three blocks had at least 47 certificates, proving that the candidate could fit without changing its interfaces or logic. |
| Core unit suite | Leo 4.4.1 and local registry fixture | Passed all 10 tests. |

### Accepted upgrade call

| Field | Public value |
|---|---|
| Program | `dark_optimistic_oracle.aleo` |
| Previous / accepted edition | `0` / `1` |
| Deployment transaction | `at1900gz2klm9we2deqarpv2fpqhnjqjr3cvr43stxq4525l6s9zupq6r0v5p` |
| Fee transition | `au1w9s7u95tn5h0lgn9gf5nvvwm4sh3gymjzpzprkvckfg2ypu2qq8q8ap0e4` |
| Fee transaction | `at1ga3x8fmn9cc7e2p8r950cy4w3ncpz54ke6upmwh8r5kvu7g4jyqq8zmrag` |
| Accepted block / certificates | `18745064` / `78` |
| Combined deployment density | `3481397` |
| Public fee | `29406397u64` (`29.406397` credits) |
| Administrator balance | `949027761u64` before; `919621364u64` after |

### Post-upgrade verification calls

| Read | Result and purpose |
|---|---|
| `latest_edition` | Returned `1`. |
| Accepted deployment body | Embedded edition `1`, the expected program ID, and the locally compiled instructions (formatting-normalized exact match). |
| Deployed source | Contains the immutable documented constructor, signer and caller administrator guards in `initialize`, and the 10-block `new_voting_right` purchase cutoff. |
| `fee_collector[0u8]` | Still `aleo1a2k4a9phy4kklx2ad0aed0lgvyzaegf0gfp85uldzhjzn8tt05zsjmfjnf`. |
| `assertions[187031922field]` | Retained the exact QA assertion fields, costs, and deadlines. |
| Related assertion mappings | Creation height `18703569u32`, documented QA asserter, no disputer, zero confirm votes, zero deny votes, and no claim flags—all unchanged. |

The deployment script detected the existing initialized mapping and skipped
`initialize`. This is important: an upgrade changes program logic but does not
rerun application initialization or overwrite prior mappings.

Final frontend verification passed ESLint, 14/14 Vitest tests, TypeScript, and
the production Vite build. No wallet transaction was needed for these checks.

## 2026-10-02 22:49 EDT — Aleo Testnet and development-tool version audit

**Purpose:** Check whether the repository's pinned Aleo tools, the local
developer tools, the public Testnet protocol, the wallet integration, and the
general frontend toolchain have newer releases. This was a read-only audit. It
did not generate a proof or signature, connect a wallet, submit a transaction,
spend a fee, deploy or upgrade a program, or change any on-chain state.

### Ordered read-only operations

1. Read local executable versions and repository pins. The default machine
   executables reported Leo `4.3.4` and a snarkOS commit corresponding to
   `3.7.1`; the repository's Leo-managed Devnet binary reported snarkOS
   `4.8.1`. Contract manifests, scripts, and CI in the oracle and prediction
   market repositories pin Leo `4.4.1`. The machine also reported Node
   `24.21.0`, pnpm `10.14.0`, and Rust `1.97.1`.
2. Read the official ProvableHQ GitHub release metadata for Leo, snarkOS,
   snarkVM, the Provable SDK, and the Aleo developer toolkit. No GitHub write
   API was called. The newest released Leo compiler was `4.4.4`; official
   Testnet snarkOS and snarkVM `4.11.0` releases were published for consensus
   V21; and SDK `0.12.0` added V21/Varuna V3 support. Leo's unreleased main
   branch identifies `4.4.5` with snarkVM/snarkOS `4.11.0`, but there was no
   corresponding released `leo-lang` tag at the time of this check.
3. Queried the public Testnet height from both
   `https://api.provable.com/v2/testnet/block/height/latest` and
   `https://api.explorer.provable.com/v1/testnet/block/height/latest`. Both
   returned block `20132974`. The official snarkOS Testnet `4.11.0` release
   schedules consensus V21 for block `20234000`, leaving `101026` blocks at
   the observed height. The same endpoint family reported
   `token_registry.aleo` edition `1`.
4. Read official npm registry metadata for the installed wallet packages and
   ran pnpm's read-only outdated-package report. The installed
   `@provablehq/aleo-wallet-adaptor-*` packages remain at `1.0.1` but are
   deprecated; the supported package family is now spelled `adapter`, with
   newer core, React, UI, Shield, and wallet-standard releases. The report also
   found optional frontend updates, including major-version changes to React,
   TypeScript, Vitest, pnpm, and other packages.
5. Read the official Node.js release index. Local Node `24.21.0` was the current
   Node 24 LTS release, so no Node runtime update was indicated.

### Result and interpretation

The Aleo-specific toolchain is materially behind. Leo `4.4.4` is the current
released compiler and uses snarkVM `4.10.0` rules for the active V20 network,
while Testnet node operators need `testnet-v4.11.0` before the announced V21
activation. The repository should first move from Leo `4.4.1` to released Leo
`4.4.4` and migrate the deprecated wallet `adaptor` packages to the current
`adapter` family, with regression and Devnet testing. A second compatibility
update will be required when a released Leo compiler carrying snarkVM `4.11.0`
becomes available; unreleased Leo source should not silently replace the pinned
production toolchain. Broad React, TypeScript, Vitest, and pnpm major upgrades
should be tested separately rather than combined with the time-sensitive Aleo
compatibility work.

The hosted GitHub Pages frontend does not itself run a snarkOS node, so an old
local node binary does not by itself take the published site offline. However,
deployment/proof tooling, a locally operated node, and the user's wallet must
be compatible with the activated protocol to produce and submit new
transactions. Existing deployed programs and their mappings are not erased by
the network-version activation.


## Imported frontend journal

<!-- audit-export-sha256: 3771f117bad99cac784c208dd20458b49d055d0405480a62acc042ca5b533516 -->

## Dark Optimistic Oracle webapp Aleo call log

Generated: 2026-10-03T05:47:57.699Z.

> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.

### 1. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 2. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 3. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.156Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:28:22.156Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 4. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.175Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:28:22.175Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 5. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.043Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:41:58.043Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 6. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.044Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:41:58.044Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 7. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.236Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:41:58.236Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 8. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.241Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:41:58.241Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 9. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.833Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:42:19.833Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 10. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.834Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:42:19.834Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 11. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.928Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:42:19.928Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 12. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.951Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:42:19.951Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 13. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.636Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:42:23.636Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 14. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 15. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 16. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 17. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 18. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.746Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T05:42:23.746Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 19. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.749Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T05:42:23.749Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 20. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.752Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T05:42:23.752Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 21. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.768Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T05:42:23.768Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 22. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.772Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T05:42:23.772Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 23. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:42:40.851Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T05:42:40.851Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  }
}
```

### 24. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:43:01.786Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T05:43:01.786Z",
  "callId": "aleo-call-8",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr"
  }
}
```

### 25. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f.

- Time: 2026-10-03T05:43:15.822Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T05:43:15.822Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr",
    "walletStatus": "accepted",
    "onchainTransactionId": "at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 26. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.382Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T05:44:24.382Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 27. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.383Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T05:44:24.383Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 28. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 29. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 30. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 31. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.481Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T05:44:24.481Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 32. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.483Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T05:44:24.483Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 33. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.500Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T05:44:24.500Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 34. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T05:44:24.504Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 35. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.515Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T05:44:24.515Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 36. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:23.765Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T05:45:23.765Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  }
}
```

### 37. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:36.387Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T05:45:36.387Z",
  "callId": "aleo-call-14",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g"
  }
}
```

### 38. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z.

- Time: 2026-10-03T05:45:50.686Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T05:45:50.686Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```
# Private demo checkpoint — 2026-10-03

Follow-up: confirming vote and second unused voting-right purchase both reached
accepted status. Five public reads showed assertion 2026100306 with bond 1000,
stake 100, QA as both demonstration parties, confirm=1 and deny=0. Explorer
independently verified confirm transaction at block 20145376. Additional wallet
read returned two Oracle records (receipt and unused right); only type labels
and counts were inspected. Private reward/refund calls have not yet occurred.
The journal snapshot below includes those later results and the startup/mapping
reads after refreshing the newly deployed bond-field fix.

Resumed the published Testnet app with the authorized QA wallet and demo tools.
Private DOOR preparation (1,000 units) and private fee preparation (3 ALEO)
were accepted. Shield returned one usable registry record. A first assertion
at ID 2026100302 used the hidden 100,000,000-unit bond default; disputing it
with 1,000 units was rejected. Readback confirmed its original bond and no
disputer. No rejected request is represented as successful.

Created a fresh assertion 2026100306 with the correct 1,000-unit bond, posted
its matching dispute, and purchased a private voting right with a 100-unit
stake. All three were accepted. A private confirm request was then approved;
the exported checkpoint below preserves the observed finality at export time.
Private records are fingerprinted only; all form plaintext was cleared before
captures. The first assertion's 90,000,000-unit undisputed refund remains due
after its grace period. Its 10% protocol fee is not recoverable.

The visible creation-bond fix passed lint, 17 unit tests, and production build.
This is an intermediate checkpoint, not completion of the full private demo.


## Imported frontend journal

<!-- audit-export-sha256: d121b1c1b45ab4141dd0ccabb3e8772f1a0ae5107674b9260450f980bad4ffc3 -->

## Dark Optimistic Oracle webapp Aleo call log

Generated: 2026-10-03T13:35:32.999Z.

> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.

### 1. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 2. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 3. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.156Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:28:22.156Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 4. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.175Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:28:22.175Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 5. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.043Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:41:58.043Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 6. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.044Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:41:58.044Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 7. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.236Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:41:58.236Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 8. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.241Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:41:58.241Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 9. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.833Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:42:19.833Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 10. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.834Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:42:19.834Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 11. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.928Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:42:19.928Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 12. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.951Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:42:19.951Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 13. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.636Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:42:23.636Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 14. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 15. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 16. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 17. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 18. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.746Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T05:42:23.746Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 19. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.749Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T05:42:23.749Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 20. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.752Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T05:42:23.752Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 21. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.768Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T05:42:23.768Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 22. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.772Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T05:42:23.772Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 23. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:42:40.851Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T05:42:40.851Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  }
}
```

### 24. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:43:01.786Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T05:43:01.786Z",
  "callId": "aleo-call-8",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr"
  }
}
```

### 25. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f.

- Time: 2026-10-03T05:43:15.822Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T05:43:15.822Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr",
    "walletStatus": "accepted",
    "onchainTransactionId": "at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 26. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.382Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T05:44:24.382Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 27. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.383Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T05:44:24.383Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 28. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 29. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 30. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 31. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.481Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T05:44:24.481Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 32. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.483Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T05:44:24.483Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 33. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.500Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T05:44:24.500Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 34. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T05:44:24.504Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 35. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.515Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T05:44:24.515Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 36. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:23.765Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T05:45:23.765Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  }
}
```

### 37. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:36.387Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T05:45:36.387Z",
  "callId": "aleo-call-14",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g"
  }
}
```

### 38. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z.

- Time: 2026-10-03T05:45:50.686Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T05:45:50.686Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 39. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.880Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T13:30:24.880Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 40. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.881Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T13:30:24.881Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 41. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.030Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T13:30:25.030Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 42. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.245Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T13:30:25.245Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 43. Prepare QA private DOOR in the connected wallet

**What happened:** The frontend prepared token_registry.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:30:33.541Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:30:33.541Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  }
}
```

### 44. Prepare QA private DOOR in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:30:47.130Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:30:47.130Z",
  "callId": "aleo-call-3",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a"
  }
}
```

### 45. Prepare QA private DOOR in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23.

- Time: 2026-10-03T13:30:55.331Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:30:55.331Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23",
    "statusPollAttempts": 5,
    "timedOut": false
  }
}
```

### 46. Prepare QA private fee credits in the connected wallet

**What happened:** The frontend prepared credits.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:31:01.603Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:31:01.603Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  }
}
```

### 47. Prepare QA private fee credits in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:31:11.666Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:31:11.666Z",
  "callId": "aleo-call-4",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa"
  }
}
```

### 48. Prepare QA private fee credits in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv.

- Time: 2026-10-03T13:31:17.780Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:31:17.780Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa",
    "walletStatus": "accepted",
    "onchainTransactionId": "at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv",
    "statusPollAttempts": 4,
    "timedOut": false
  }
}
```

### 49. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:31:21.434Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:31:21.434Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  }
}
```

### 50. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:31:27.622Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:31:27.622Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 51. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.675Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:32:03.675Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 52. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.677Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:32:03.677Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 53. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.678Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:32:03.678Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 54. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 55. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 56. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.798Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T13:32:03.798Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 57. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.801Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T13:32:03.801Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 58. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.807Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T13:32:03.807Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 59. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.810Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T13:32:03.810Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 60. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.818Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T13:32:03.818Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 61. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:07.370Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T13:32:07.370Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 62. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:13.202Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T13:32:13.202Z",
  "callId": "aleo-call-11",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z"
  }
}
```

### 63. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka.

- Time: 2026-10-03T13:32:21.287Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T13:32:21.287Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

### 64. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:29.468Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T13:32:29.468Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 65. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:42.126Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T13:32:42.126Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye"
  }
}
```

### 66. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported rejected. The accepted on-chain transaction ID is at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma.

- Time: 2026-10-03T13:32:54.531Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T13:32:54.531Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye",
    "walletStatus": "rejected",
    "onchainTransactionId": "at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma",
    "statusPollAttempts": 7,
    "timedOut": false,
    "walletError": null
  }
}
```

### 67. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.651Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T13:33:02.651Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 68. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.652Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T13:33:02.652Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 69. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 70. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 71. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.655Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T13:33:02.655Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 72. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.777Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T13:33:02.777Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 73. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.783Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T13:33:02.783Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 74. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.785Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T13:33:02.785Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 75. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.791Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T13:33:02.791Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 76. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.792Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T13:33:02.792Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 77. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:23.922Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T13:33:23.922Z",
  "callId": "aleo-call-18",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

### 78. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:35.636Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T13:33:35.636Z",
  "callId": "aleo-call-18",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9"
  }
}
```

### 79. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd.

- Time: 2026-10-03T13:33:45.914Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T13:33:45.914Z",
  "callId": "aleo-call-18",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9",
    "walletStatus": "accepted",
    "onchainTransactionId": "at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 80. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:52.458Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T13:33:52.458Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

### 81. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:59.110Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T13:33:59.110Z",
  "callId": "aleo-call-19",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v"
  }
}
```

### 82. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9.

- Time: 2026-10-03T13:34:05.314Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T13:34:05.314Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

### 83. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:34:11.871Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T13:34:11.871Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  }
}
```

### 84. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:34:23.693Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T13:34:23.693Z",
  "callId": "aleo-call-20",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob"
  }
}
```

### 85. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4.

- Time: 2026-10-03T13:34:52.303Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T13:34:52.303Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4",
    "statusPollAttempts": 15,
    "timedOut": false,
    "walletError": null
  }
}
```

### 86. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:35:04.385Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T13:35:04.385Z",
  "callId": "aleo-call-21",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 87. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:35:13.327Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 49,
  "timestamp": "2026-10-03T13:35:13.327Z",
  "callId": "aleo-call-21",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 88. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.confirm and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:35:17.273Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 50,
  "timestamp": "2026-10-03T13:35:17.273Z",
  "callId": "aleo-call-22",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 89. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:35:26.001Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 51,
  "timestamp": "2026-10-03T13:35:26.001Z",
  "callId": "aleo-call-22",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "walletRequestId": "shield_1791034525994_4p0nw81cble"
  }
}
```



## Imported frontend journal

<!-- audit-export-sha256: 1f382c2e90ad10113bf1bb1aeddf84657efdedfe859d49c472d3b2b64545102e -->

## Dark Optimistic Oracle webapp Aleo call log

Generated: 2026-10-03T13:42:39.299Z.

> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.

### 1. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 2. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 3. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.156Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:28:22.156Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 4. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.175Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:28:22.175Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 5. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.043Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:41:58.043Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 6. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.044Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:41:58.044Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 7. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.236Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:41:58.236Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 8. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.241Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:41:58.241Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 9. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.833Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:42:19.833Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 10. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.834Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:42:19.834Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 11. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.928Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:42:19.928Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 12. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.951Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:42:19.951Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 13. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.636Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:42:23.636Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 14. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 15. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 16. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 17. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 18. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.746Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T05:42:23.746Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 19. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.749Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T05:42:23.749Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 20. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.752Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T05:42:23.752Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 21. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.768Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T05:42:23.768Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 22. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.772Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T05:42:23.772Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 23. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:42:40.851Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T05:42:40.851Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  }
}
```

### 24. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:43:01.786Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T05:43:01.786Z",
  "callId": "aleo-call-8",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr"
  }
}
```

### 25. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f.

- Time: 2026-10-03T05:43:15.822Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T05:43:15.822Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr",
    "walletStatus": "accepted",
    "onchainTransactionId": "at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 26. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.382Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T05:44:24.382Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 27. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.383Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T05:44:24.383Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 28. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 29. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 30. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 31. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.481Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T05:44:24.481Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 32. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.483Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T05:44:24.483Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 33. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.500Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T05:44:24.500Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 34. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T05:44:24.504Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 35. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.515Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T05:44:24.515Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 36. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:23.765Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T05:45:23.765Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  }
}
```

### 37. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:36.387Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T05:45:36.387Z",
  "callId": "aleo-call-14",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g"
  }
}
```

### 38. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z.

- Time: 2026-10-03T05:45:50.686Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T05:45:50.686Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 39. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.880Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T13:30:24.880Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 40. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.881Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T13:30:24.881Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 41. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.030Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T13:30:25.030Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 42. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.245Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T13:30:25.245Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 43. Prepare QA private DOOR in the connected wallet

**What happened:** The frontend prepared token_registry.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:30:33.541Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:30:33.541Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  }
}
```

### 44. Prepare QA private DOOR in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:30:47.130Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:30:47.130Z",
  "callId": "aleo-call-3",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a"
  }
}
```

### 45. Prepare QA private DOOR in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23.

- Time: 2026-10-03T13:30:55.331Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:30:55.331Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23",
    "statusPollAttempts": 5,
    "timedOut": false
  }
}
```

### 46. Prepare QA private fee credits in the connected wallet

**What happened:** The frontend prepared credits.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:31:01.603Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:31:01.603Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  }
}
```

### 47. Prepare QA private fee credits in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:31:11.666Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:31:11.666Z",
  "callId": "aleo-call-4",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa"
  }
}
```

### 48. Prepare QA private fee credits in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv.

- Time: 2026-10-03T13:31:17.780Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:31:17.780Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa",
    "walletStatus": "accepted",
    "onchainTransactionId": "at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv",
    "statusPollAttempts": 4,
    "timedOut": false
  }
}
```

### 49. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:31:21.434Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:31:21.434Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  }
}
```

### 50. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:31:27.622Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:31:27.622Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 51. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.675Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:32:03.675Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 52. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.677Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:32:03.677Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 53. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.678Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:32:03.678Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 54. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 55. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 56. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.798Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T13:32:03.798Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 57. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.801Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T13:32:03.801Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 58. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.807Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T13:32:03.807Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 59. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.810Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T13:32:03.810Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 60. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.818Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T13:32:03.818Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 61. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:07.370Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T13:32:07.370Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 62. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:13.202Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T13:32:13.202Z",
  "callId": "aleo-call-11",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z"
  }
}
```

### 63. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka.

- Time: 2026-10-03T13:32:21.287Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T13:32:21.287Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

### 64. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:29.468Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T13:32:29.468Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 65. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:42.126Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T13:32:42.126Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye"
  }
}
```

### 66. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported rejected. The accepted on-chain transaction ID is at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma.

- Time: 2026-10-03T13:32:54.531Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T13:32:54.531Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye",
    "walletStatus": "rejected",
    "onchainTransactionId": "at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma",
    "statusPollAttempts": 7,
    "timedOut": false,
    "walletError": null
  }
}
```

### 67. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.651Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T13:33:02.651Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 68. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.652Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T13:33:02.652Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 69. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 70. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 71. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.655Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T13:33:02.655Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 72. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.777Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T13:33:02.777Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 73. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.783Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T13:33:02.783Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 74. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.785Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T13:33:02.785Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 75. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.791Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T13:33:02.791Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 76. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.792Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T13:33:02.792Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 77. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:23.922Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T13:33:23.922Z",
  "callId": "aleo-call-18",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

### 78. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:35.636Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T13:33:35.636Z",
  "callId": "aleo-call-18",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9"
  }
}
```

### 79. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd.

- Time: 2026-10-03T13:33:45.914Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T13:33:45.914Z",
  "callId": "aleo-call-18",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9",
    "walletStatus": "accepted",
    "onchainTransactionId": "at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 80. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:52.458Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T13:33:52.458Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

### 81. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:59.110Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T13:33:59.110Z",
  "callId": "aleo-call-19",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v"
  }
}
```

### 82. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9.

- Time: 2026-10-03T13:34:05.314Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T13:34:05.314Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

### 83. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:34:11.871Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T13:34:11.871Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  }
}
```

### 84. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:34:23.693Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T13:34:23.693Z",
  "callId": "aleo-call-20",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob"
  }
}
```

### 85. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4.

- Time: 2026-10-03T13:34:52.303Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T13:34:52.303Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4",
    "statusPollAttempts": 15,
    "timedOut": false,
    "walletError": null
  }
}
```

### 86. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:35:04.385Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T13:35:04.385Z",
  "callId": "aleo-call-21",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 87. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:35:13.327Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 49,
  "timestamp": "2026-10-03T13:35:13.327Z",
  "callId": "aleo-call-21",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 88. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.confirm and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:35:17.273Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 50,
  "timestamp": "2026-10-03T13:35:17.273Z",
  "callId": "aleo-call-22",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 89. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:35:26.001Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 51,
  "timestamp": "2026-10-03T13:35:26.001Z",
  "callId": "aleo-call-22",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "walletRequestId": "shield_1791034525994_4p0nw81cble"
  }
}
```

### 90. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1kh705w6fejhp0u4zq2ws0xzkxqh7juymjfpn2elsxk8nsz95dszsk9qxze.

- Time: 2026-10-03T13:35:36.269Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 52,
  "timestamp": "2026-10-03T13:35:36.269Z",
  "callId": "aleo-call-22",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "walletRequestId": "shield_1791034525994_4p0nw81cble",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1kh705w6fejhp0u4zq2ws0xzkxqh7juymjfpn2elsxk8nsz95dszsk9qxze",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 91. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:36:14.966Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 53,
  "timestamp": "2026-10-03T13:36:14.966Z",
  "callId": "aleo-call-23",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  }
}
```

### 92. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:36:21.779Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 54,
  "timestamp": "2026-10-03T13:36:21.779Z",
  "callId": "aleo-call-23",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 93. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:36:27.801Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 55,
  "timestamp": "2026-10-03T13:36:27.801Z",
  "callId": "aleo-call-24",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  }
}
```

### 94. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:36:35.058Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 56,
  "timestamp": "2026-10-03T13:36:35.058Z",
  "callId": "aleo-call-24",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "walletRequestId": "shield_1791034595053_kflubuvqsc"
  }
}
```

### 95. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1qf8gkdvg3thzspdcfsfep647n0fvggwq2pv927atp2mnk6qpucxs4d434s.

- Time: 2026-10-03T13:36:45.281Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 57,
  "timestamp": "2026-10-03T13:36:45.281Z",
  "callId": "aleo-call-24",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "walletRequestId": "shield_1791034595053_kflubuvqsc",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1qf8gkdvg3thzspdcfsfep647n0fvggwq2pv927atp2mnk6qpucxs4d434s",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 96. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:29.108Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T13:37:29.108Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 97. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:29.108Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T13:37:29.108Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 98. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:29.219Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T13:37:29.219Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 99. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:29.243Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T13:37:29.243Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 100. Read dark_optimistic_oracle.aleo.assertions[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.299Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:37:35.299Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 101. Read dark_optimistic_oracle.aleo.asserters[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.301Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:37:35.301Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 102. Read dark_optimistic_oracle.aleo.disputers[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.302Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:37:35.302Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 103. Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.303Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:37:35.303Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 104. Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.303Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:37:35.303Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 105. Read dark_optimistic_oracle.aleo.assertions[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.402Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:37:35.402Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 106. Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.403Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:37:35.403Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 107. Read dark_optimistic_oracle.aleo.asserters[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.404Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:37:35.404Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 108. Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.418Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:37:35.418Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 109. Read dark_optimistic_oracle.aleo.disputers[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.420Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:37:35.420Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 110. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:40:55.790Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:40:55.790Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 111. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":2,"usableRecordCount":2}.

- Time: 2026-10-03T13:41:04.659Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:41:04.659Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "recordCount": 2,
    "usableRecordCount": 2
  }
}
```


## Imported frontend journal

<!-- audit-export-sha256: 4d5d800ffc19a73baf3b778b2e007d577f892c1956ffbdb743a49f19534b4fa2 -->

## Dark Optimistic Oracle webapp Aleo call log

Generated: 2026-10-03T14:03:58.839Z.

> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.

### 1. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 2. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 3. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.156Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:28:22.156Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 4. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.175Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:28:22.175Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 5. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.043Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:41:58.043Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

### 6. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.044Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:41:58.044Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

### 7. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.236Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:41:58.236Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 8. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.241Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:41:58.241Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 9. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.833Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:42:19.833Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 10. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.834Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:42:19.834Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 11. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.928Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:42:19.928Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 12. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.951Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:42:19.951Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 13. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.636Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:42:23.636Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 14. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 15. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 16. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 17. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

### 18. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.746Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T05:42:23.746Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 19. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.749Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T05:42:23.749Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 20. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.752Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T05:42:23.752Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 21. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.768Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T05:42:23.768Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 22. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.772Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T05:42:23.772Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 23. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:42:40.851Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T05:42:40.851Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  }
}
```

### 24. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:43:01.786Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T05:43:01.786Z",
  "callId": "aleo-call-8",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr"
  }
}
```

### 25. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f.

- Time: 2026-10-03T05:43:15.822Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T05:43:15.822Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr",
    "walletStatus": "accepted",
    "onchainTransactionId": "at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 26. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.382Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T05:44:24.382Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 27. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.383Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T05:44:24.383Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 28. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 29. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 30. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

### 31. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.481Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T05:44:24.481Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 32. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.483Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T05:44:24.483Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 33. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.500Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T05:44:24.500Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 34. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T05:44:24.504Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 35. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.515Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T05:44:24.515Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 36. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:23.765Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T05:45:23.765Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  }
}
```

### 37. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:36.387Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T05:45:36.387Z",
  "callId": "aleo-call-14",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g"
  }
}
```

### 38. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z.

- Time: 2026-10-03T05:45:50.686Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T05:45:50.686Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

### 39. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.880Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T13:30:24.880Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 40. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.881Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T13:30:24.881Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 41. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.030Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T13:30:25.030Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 42. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.245Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T13:30:25.245Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 43. Prepare QA private DOOR in the connected wallet

**What happened:** The frontend prepared token_registry.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:30:33.541Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:30:33.541Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  }
}
```

### 44. Prepare QA private DOOR in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:30:47.130Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:30:47.130Z",
  "callId": "aleo-call-3",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a"
  }
}
```

### 45. Prepare QA private DOOR in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23.

- Time: 2026-10-03T13:30:55.331Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:30:55.331Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23",
    "statusPollAttempts": 5,
    "timedOut": false
  }
}
```

### 46. Prepare QA private fee credits in the connected wallet

**What happened:** The frontend prepared credits.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:31:01.603Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:31:01.603Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  }
}
```

### 47. Prepare QA private fee credits in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:31:11.666Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:31:11.666Z",
  "callId": "aleo-call-4",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa"
  }
}
```

### 48. Prepare QA private fee credits in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv.

- Time: 2026-10-03T13:31:17.780Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:31:17.780Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa",
    "walletStatus": "accepted",
    "onchainTransactionId": "at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv",
    "statusPollAttempts": 4,
    "timedOut": false
  }
}
```

### 49. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:31:21.434Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:31:21.434Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  }
}
```

### 50. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:31:27.622Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:31:27.622Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 51. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.675Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:32:03.675Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 52. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.677Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:32:03.677Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 53. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.678Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:32:03.678Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 54. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 55. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 56. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.798Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T13:32:03.798Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 57. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.801Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T13:32:03.801Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 58. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.807Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T13:32:03.807Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 59. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.810Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T13:32:03.810Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 60. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.818Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T13:32:03.818Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 61. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:07.370Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T13:32:07.370Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

### 62. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:13.202Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T13:32:13.202Z",
  "callId": "aleo-call-11",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z"
  }
}
```

### 63. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka.

- Time: 2026-10-03T13:32:21.287Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T13:32:21.287Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

### 64. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:29.468Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T13:32:29.468Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 65. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:42.126Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T13:32:42.126Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye"
  }
}
```

### 66. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported rejected. The accepted on-chain transaction ID is at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma.

- Time: 2026-10-03T13:32:54.531Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T13:32:54.531Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye",
    "walletStatus": "rejected",
    "onchainTransactionId": "at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma",
    "statusPollAttempts": 7,
    "timedOut": false,
    "walletError": null
  }
}
```

### 67. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.651Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T13:33:02.651Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 68. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.652Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T13:33:02.652Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 69. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 70. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 71. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.655Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T13:33:02.655Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

### 72. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.777Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T13:33:02.777Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 73. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.783Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T13:33:02.783Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 74. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.785Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T13:33:02.785Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 75. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.791Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T13:33:02.791Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 76. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.792Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T13:33:02.792Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 77. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:23.922Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T13:33:23.922Z",
  "callId": "aleo-call-18",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

### 78. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:35.636Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T13:33:35.636Z",
  "callId": "aleo-call-18",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9"
  }
}
```

### 79. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd.

- Time: 2026-10-03T13:33:45.914Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T13:33:45.914Z",
  "callId": "aleo-call-18",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9",
    "walletStatus": "accepted",
    "onchainTransactionId": "at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 80. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:52.458Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T13:33:52.458Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

### 81. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:59.110Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T13:33:59.110Z",
  "callId": "aleo-call-19",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v"
  }
}
```

### 82. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9.

- Time: 2026-10-03T13:34:05.314Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T13:34:05.314Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

### 83. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:34:11.871Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T13:34:11.871Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  }
}
```

### 84. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:34:23.693Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T13:34:23.693Z",
  "callId": "aleo-call-20",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob"
  }
}
```

### 85. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4.

- Time: 2026-10-03T13:34:52.303Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T13:34:52.303Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4",
    "statusPollAttempts": 15,
    "timedOut": false,
    "walletError": null
  }
}
```

### 86. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:35:04.385Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T13:35:04.385Z",
  "callId": "aleo-call-21",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 87. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:35:13.327Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 49,
  "timestamp": "2026-10-03T13:35:13.327Z",
  "callId": "aleo-call-21",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 88. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.confirm and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:35:17.273Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 50,
  "timestamp": "2026-10-03T13:35:17.273Z",
  "callId": "aleo-call-22",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 89. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:35:26.001Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 51,
  "timestamp": "2026-10-03T13:35:26.001Z",
  "callId": "aleo-call-22",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "walletRequestId": "shield_1791034525994_4p0nw81cble"
  }
}
```

### 90. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1kh705w6fejhp0u4zq2ws0xzkxqh7juymjfpn2elsxk8nsz95dszsk9qxze.

- Time: 2026-10-03T13:35:36.269Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 52,
  "timestamp": "2026-10-03T13:35:36.269Z",
  "callId": "aleo-call-22",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "walletRequestId": "shield_1791034525994_4p0nw81cble",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1kh705w6fejhp0u4zq2ws0xzkxqh7juymjfpn2elsxk8nsz95dszsk9qxze",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 91. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:36:14.966Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 53,
  "timestamp": "2026-10-03T13:36:14.966Z",
  "callId": "aleo-call-23",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  }
}
```

### 92. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:36:21.779Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 54,
  "timestamp": "2026-10-03T13:36:21.779Z",
  "callId": "aleo-call-23",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 93. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:36:27.801Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 55,
  "timestamp": "2026-10-03T13:36:27.801Z",
  "callId": "aleo-call-24",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  }
}
```

### 94. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:36:35.058Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 56,
  "timestamp": "2026-10-03T13:36:35.058Z",
  "callId": "aleo-call-24",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "walletRequestId": "shield_1791034595053_kflubuvqsc"
  }
}
```

### 95. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1qf8gkdvg3thzspdcfsfep647n0fvggwq2pv927atp2mnk6qpucxs4d434s.

- Time: 2026-10-03T13:36:45.281Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 57,
  "timestamp": "2026-10-03T13:36:45.281Z",
  "callId": "aleo-call-24",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "walletRequestId": "shield_1791034595053_kflubuvqsc",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1qf8gkdvg3thzspdcfsfep647n0fvggwq2pv927atp2mnk6qpucxs4d434s",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 96. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:29.108Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T13:37:29.108Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 97. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:29.108Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T13:37:29.108Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 98. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:29.219Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T13:37:29.219Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 99. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:29.243Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T13:37:29.243Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 100. Read dark_optimistic_oracle.aleo.assertions[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.299Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:37:35.299Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 101. Read dark_optimistic_oracle.aleo.asserters[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.301Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:37:35.301Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 102. Read dark_optimistic_oracle.aleo.disputers[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.302Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:37:35.302Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 103. Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.303Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:37:35.303Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 104. Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.303Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:37:35.303Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 105. Read dark_optimistic_oracle.aleo.assertions[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.402Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:37:35.402Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 106. Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.403Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:37:35.403Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 107. Read dark_optimistic_oracle.aleo.asserters[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.404Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:37:35.404Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 108. Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.418Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:37:35.418Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 109. Read dark_optimistic_oracle.aleo.disputers[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.420Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:37:35.420Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 110. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:40:55.790Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:40:55.790Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

### 111. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":2,"usableRecordCount":2}.

- Time: 2026-10-03T13:41:04.659Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:41:04.659Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "recordCount": 2,
    "usableRecordCount": 2
  }
}
```

### 112. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:45:04.526Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T13:45:04.526Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 113. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:45:04.527Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T13:45:04.527Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

### 114. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:45:04.628Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T13:45:04.628Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 115. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:45:04.649Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T13:45:04.649Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 116. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:46:46.249Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:46:46.249Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  }
}
```

### 117. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:47:00.566Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:47:00.566Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

### 118. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:50:03.272Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:50:03.272Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "8df423ef8bf8b2c871dddf523602eb818258873b5d1854451b7a9915455ffb0c",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  }
}
```

### 119. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:50:11.935Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:50:11.935Z",
  "callId": "aleo-call-4",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "8df423ef8bf8b2c871dddf523602eb818258873b5d1854451b7a9915455ffb0c",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  },
  "result": {
    "walletRequestId": "shield_1791035411929_jb4zgqumrqb"
  }
}
```

### 120. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1c2gafx0tlzs5cf48px9gn2e9gengm0rar94dx7f53zjrnle8fufqcjy56h.

- Time: 2026-10-03T13:50:22.200Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:50:22.200Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "8df423ef8bf8b2c871dddf523602eb818258873b5d1854451b7a9915455ffb0c",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  },
  "result": {
    "walletRequestId": "shield_1791035411929_jb4zgqumrqb",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1c2gafx0tlzs5cf48px9gn2e9gengm0rar94dx7f53zjrnle8fufqcjy56h",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 121. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:50:46.751Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:50:46.751Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  }
}
```

### 122. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":5,"usableRecordCount":5}.

- Time: 2026-10-03T13:50:54.840Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:50:54.840Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  },
  "result": {
    "recordCount": 5,
    "usableRecordCount": 5
  }
}
```

### 123. Submit dark_optimistic_oracle.aleo.deny

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.deny and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:51:00.458Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `deny`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:51:00.458Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.deny",
  "program": "dark_optimistic_oracle.aleo",
  "function": "deny",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "b7bbcb785a6a5aa537d824a3e23cf7094dc7b689cbd55733f28d36ed98527403",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  }
}
```

### 124. Submit dark_optimistic_oracle.aleo.deny

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:51:11.490Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `deny`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:51:11.490Z",
  "callId": "aleo-call-6",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.deny",
  "program": "dark_optimistic_oracle.aleo",
  "function": "deny",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "b7bbcb785a6a5aa537d824a3e23cf7094dc7b689cbd55733f28d36ed98527403",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  },
  "result": {
    "walletRequestId": "shield_1791035471483_f1pyuyzo95"
  }
}
```

### 125. Submit dark_optimistic_oracle.aleo.deny

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at18863kgtdk6kfa8nv4uqx6s2yu4dguv9urpqxk8hhnr5wh0fudyys7jylk6.

- Time: 2026-10-03T13:51:19.607Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `deny`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:51:19.607Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.deny",
  "program": "dark_optimistic_oracle.aleo",
  "function": "deny",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "b7bbcb785a6a5aa537d824a3e23cf7094dc7b689cbd55733f28d36ed98527403",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  },
  "result": {
    "walletRequestId": "shield_1791035471483_f1pyuyzo95",
    "walletStatus": "accepted",
    "onchainTransactionId": "at18863kgtdk6kfa8nv4uqx6s2yu4dguv9urpqxk8hhnr5wh0fudyys7jylk6",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

### 126. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:51:35.352Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-RECOVERY-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:51:35.352Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "90000000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-RECOVERY-01"
  }
}
```

### 127. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:51:50.417Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-RECOVERY-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:51:50.417Z",
  "callId": "aleo-call-7",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "90000000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-RECOVERY-01"
  },
  "result": {
    "walletRequestId": "shield_1791035510414_4df7ot3fboc"
  }
}
```

### 128. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1fnypqe5thl7mugwn6n6tetz3kwcq467lw4n4hm333a0ansh0pvzswgmxxl.

- Time: 2026-10-03T13:51:56.452Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-RECOVERY-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T13:51:56.452Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "90000000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-RECOVERY-01"
  },
  "result": {
    "walletRequestId": "shield_1791035510414_4df7ot3fboc",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1fnypqe5thl7mugwn6n6tetz3kwcq467lw4n4hm333a0ansh0pvzswgmxxl",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

### 129. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:52:12.919Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T13:52:12.919Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  }
}
```

### 130. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":5,"usableRecordCount":5}.

- Time: 2026-10-03T13:52:24.124Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T13:52:24.124Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  },
  "result": {
    "recordCount": 5,
    "usableRecordCount": 5
  }
}
```

### 131. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_voting_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:52:30.505Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T13:52:30.505Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "179cfb5caed18c3b9945f102ec8a2d83c40bc092161820d92ed956e1e4526f7b",
          "plaintextLength": 274
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  }
}
```

### 132. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:52:48.052Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T13:52:48.052Z",
  "callId": "aleo-call-9",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "179cfb5caed18c3b9945f102ec8a2d83c40bc092161820d92ed956e1e4526f7b",
          "plaintextLength": 274
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  },
  "result": {
    "walletRequestId": "shield_1791035568048_7c0jc404uo8"
  }
}
```

### 133. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1zs9320qx7fk7xdh76j2hljpy2r3q9etls2pxlx2t0wl02pld2cpqdl5unr.

- Time: 2026-10-03T13:53:14.825Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T13:53:14.825Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "179cfb5caed18c3b9945f102ec8a2d83c40bc092161820d92ed956e1e4526f7b",
          "plaintextLength": 274
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  },
  "result": {
    "walletRequestId": "shield_1791035568048_7c0jc404uo8",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1zs9320qx7fk7xdh76j2hljpy2r3q9etls2pxlx2t0wl02pld2cpqdl5unr",
    "statusPollAttempts": 14,
    "timedOut": false,
    "walletError": null
  }
}
```

### 134. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:53:42.352Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-14`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T13:53:42.352Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-14"
  }
}
```

### 135. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:54:02.746Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-14`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T13:54:02.746Z",
  "callId": "aleo-call-10",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-14"
  },
  "result": {
    "walletRequestId": "shield_1791035642743_f7vccxyqi15"
  }
}
```

### 136. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1dacpqzgrd9phzwnf2292fv0d8lx9ghpgmjd8c899pvgt5wtjqq9q8x6f3x.

- Time: 2026-10-03T13:54:11.008Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-14`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T13:54:11.008Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-14"
  },
  "result": {
    "walletRequestId": "shield_1791035642743_f7vccxyqi15",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1dacpqzgrd9phzwnf2292fv0d8lx9ghpgmjd8c899pvgt5wtjqq9q8x6f3x",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

### 137. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:54:19.534Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T13:54:19.534Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  }
}
```

### 138. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":4,"usableRecordCount":4}.

- Time: 2026-10-03T13:54:36.114Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T13:54:36.114Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  },
  "result": {
    "recordCount": 4,
    "usableRecordCount": 4
  }
}
```

### 139. Submit dark_optimistic_oracle.aleo.refund_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.refund_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:54:42.742Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `refund_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T13:54:42.742Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.refund_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "refund_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "refund_amount",
        "value": "100u128"
      },
      {
        "position": 1,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "0d27a0372722786732d1002cd2983007ee11bdaaafe89343e0ea73bc881a3de2",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  }
}
```

### 140. Submit dark_optimistic_oracle.aleo.refund_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:54:56.827Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `refund_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T13:54:56.827Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.refund_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "refund_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "refund_amount",
        "value": "100u128"
      },
      {
        "position": 1,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "0d27a0372722786732d1002cd2983007ee11bdaaafe89343e0ea73bc881a3de2",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  },
  "result": {
    "walletRequestId": "shield_1791035696821_8ve56up6yxu"
  }
}
```

### 141. Submit dark_optimistic_oracle.aleo.refund_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1qqahg3f5uezlrgjvftqn93zwyuqqlfwdwftxm4ffsfhly98jusyqf7juqz.

- Time: 2026-10-03T13:55:21.485Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `refund_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T13:55:21.485Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.refund_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "refund_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "refund_amount",
        "value": "100u128"
      },
      {
        "position": 1,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "0d27a0372722786732d1002cd2983007ee11bdaaafe89343e0ea73bc881a3de2",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  },
  "result": {
    "walletRequestId": "shield_1791035696821_8ve56up6yxu",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1qqahg3f5uezlrgjvftqn93zwyuqqlfwdwftxm4ffsfhly98jusyqf7juqz",
    "statusPollAttempts": 13,
    "timedOut": false,
    "walletError": null
  }
}
```

### 142. Read dark_optimistic_oracle.aleo.assertions[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.286Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T13:55:38.286Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

### 143. Read dark_optimistic_oracle.aleo.asserters[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.287Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T13:55:38.287Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

### 144. Read dark_optimistic_oracle.aleo.disputers[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.287Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T13:55:38.287Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

### 145. Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.288Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T13:55:38.288Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

### 146. Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.288Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T13:55:38.288Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

### 147. Read dark_optimistic_oracle.aleo.assertions[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.388Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T13:55:38.388Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 148. Read dark_optimistic_oracle.aleo.disputers[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.399Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T13:55:38.399Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 149. Read dark_optimistic_oracle.aleo.asserters[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.401Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T13:55:38.401Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 150. Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.416Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T13:55:38.416Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 151. Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.419Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T13:55:38.419Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

### 152. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:56:13.839Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-receipt`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T13:56:13.839Z",
  "callId": "aleo-call-18",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-receipt"
  }
}
```

### 153. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":3,"usableRecordCount":3}.

- Time: 2026-10-03T13:56:46.755Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-receipt`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T13:56:46.755Z",
  "callId": "aleo-call-18",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-receipt"
  },
  "result": {
    "recordCount": 3,
    "usableRecordCount": 3
  }
}
```

### 154. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_voting_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:58:20.439Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-voter`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T13:58:20.439Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "99be212555166f565c2272e27b46a9782131ac331dc7e0708c8bd39e11423d3a",
          "plaintextLength": 275
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-voter"
  }
}
```

### 155. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:58:34.227Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-voter`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T13:58:34.227Z",
  "callId": "aleo-call-19",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "99be212555166f565c2272e27b46a9782131ac331dc7e0708c8bd39e11423d3a",
          "plaintextLength": 275
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-voter"
  },
  "result": {
    "walletRequestId": "shield_1791035914219_vpum8n9lb8b"
  }
}
```

### 156. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at140v8wdqe0tg57fmxy9fx64uf7dsvxu6nxmea8vfzeu29krmp0qfqnkpqjv.

- Time: 2026-10-03T13:58:44.465Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-voter`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T13:58:44.465Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "99be212555166f565c2272e27b46a9782131ac331dc7e0708c8bd39e11423d3a",
          "plaintextLength": 275
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-voter"
  },
  "result": {
    "walletRequestId": "shield_1791035914219_vpum8n9lb8b",
    "walletStatus": "accepted",
    "onchainTransactionId": "at140v8wdqe0tg57fmxy9fx64uf7dsvxu6nxmea8vfzeu29krmp0qfqnkpqjv",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

### 157. Submit dark_optimistic_oracle.aleo.collect_dispute_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_dispute_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:59:48.741Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_dispute_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-disputer`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T13:59:48.741Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_dispute_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_dispute_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-disputer"
  }
}
```

### 158. Submit dark_optimistic_oracle.aleo.collect_dispute_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T14:00:03.842Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_dispute_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-disputer`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T14:00:03.842Z",
  "callId": "aleo-call-20",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_dispute_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_dispute_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-disputer"
  },
  "result": {
    "walletRequestId": "shield_1791036003839_kjzha2ksmd"
  }
}
```

### 159. Submit dark_optimistic_oracle.aleo.collect_dispute_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1lzyxezrhe2qllh7xtk0qrz5ccqraj6c8eafppy3z0l7gthlcjsysxrfttx.

- Time: 2026-10-03T14:00:18.326Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_dispute_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-disputer`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T14:00:18.326Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_dispute_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_dispute_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-disputer"
  },
  "result": {
    "walletRequestId": "shield_1791036003839_kjzha2ksmd",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1lzyxezrhe2qllh7xtk0qrz5ccqraj6c8eafppy3z0l7gthlcjsysxrfttx",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```
# Private demo completion - 2026-10-03

The final exact browser export was imported below, including initiating demo
steps, request IDs, public parameters, acceptance and redacted record evidence.
The chronological completion is detailed in demo-slideshow/CALLING_SEQUENCE.md.
Confirming voter award, asserter payout and unused-right refund for 2026100306
were accepted. The cross-app Verity NO assertion 2026100305 had 1 confirm and
2 deny votes; its first winning voter award and disputer payout were accepted.
One eligible denying receipt remains unclaimed; the losing confirming receipt
was not submitted. This controlled one-wallet QA run is not independent voting.
The accidentally large 2026100302 bond was recovered at the contract's 90%
payout; 10% was retained as its protocol fee. No secret record was filmed.
Submission endpoint is Shield-managed and not exposed, not assumed equal to
the public read API. Unit/build checks and PDF visual QA are local operations,
not additional Aleo calls.
# Local dependency migration QA - 2026-10-03

Purpose: migrate webapp's .pnpm-store cache to the shared user store and verify
the frontend still rebuilds. No browser interaction or Aleo read/transaction
was performed; no network, program, function, wallet or chain ID applies.

Ordered operations:

1. Inspected pnpm 10.14.0 configuration and installed dependency store metadata.
2. Merged cache files into the existing shared store with rsync, preserving
   destination contents; reinstalled with a frozen lockfile and explicit store.
3. Lint, 18 tests and production build passed, but the plain store-path command
   still selected a local store. A normal install confirmed this recurrence.
4. The first global configuration attempt failed because pnpm's global bin
   directory was absent from PATH; retried with that existing directory on PATH.
5. Configured the per-user shared store globally and repeated the frozen-lockfile
   reinstall. All 276 packages were reused from the shared store, none downloaded.
6. Repeated lint, 18 tests, production build and checked both pnpm store path and
   node_modules metadata for the shared store. Removed only migrated duplicate
   caches after successful verification; their contents remain in the shared store.

No dependency versions or lockfile were intentionally changed. README.md and
DEVELOP.md document store usage and recovery of the initially recurring cache.

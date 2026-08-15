# Aleo frontend call log

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

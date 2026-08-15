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

All writes target `dark_optimistic_oracle.aleo`, use a public fee of 1,000,000
microcredits, and require interactive Shield approval.

| Function | Ordered named inputs | Operation |
|---|---|---|
| `create_assertion` | `assertion` | Bonds public DOOR and records the assertion ID, title, content hash, cost, voter stake, dispute deadline, and voting deadline. |
| `dispute_assertion` | `assertion_id`, `assertion_cost` | Bonds matching public DOOR before the dispute deadline and opens private voting. |
| `new_voting_right` | `payment`, `assertion_id`, `voter_stake` | Consumes a private DOOR payment record and creates a private voting-right record. `payment` is redacted in logs. |
| `confirm` | `voting_right` | Consumes a private voting right, increments the public confirm aggregate, and returns a private receipt. |
| `deny` | `voting_right` | Consumes a private voting right, increments the public deny aggregate, and returns a private receipt. |
| `collect_voting_award` | `award_amount`, `voting_receipt` | Claims the private winning-voter award after voting closes. |
| `refund_voting_right` | `refund_amount`, `voting_right` | Refunds an unused private voting right after voting closes. |
| `collect_assertion_award` | `assertion_id`, `payout_amount` | Claims the public asserter payout after the applicable deadline and outcome checks. |
| `collect_dispute_award` | `assertion_id`, `payout_amount` | Claims the public disputer payout when private voting rejects the assertion. |

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
{"schema":"aleo-browser-audit/v1","sequence":3,"timestamp":"2026-08-15T00:00:01.000Z","callId":"aleo-call-2","phase":"request","kind":"transaction","network":"testnet","description":"Submit dark_optimistic_oracle.aleo.new_voting_right","program":"dark_optimistic_oracle.aleo","function":"new_voting_right","parameters":{"caller":"aleo1example","inputs":[{"position":0,"name":"payment","value":{"redacted":true,"classification":"private Aleo record","sha256":"0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef","plaintextLength":412}},{"position":1,"name":"assertion_id","value":"187031922field"},{"position":2,"name":"voter_stake","value":"1000000u128"}],"fee":1000000,"privateFee":false}}
```

The example address and fingerprint are deliberately non-spendable placeholders.

## Preserving future sessions

For a future browser QA session, use **Download audit LOG.md**. Review the
generated explanations and JSON, then append the relevant dated session to this
checked-in file and commit it. The static site cannot commit to GitHub on the
user's behalf. Preserve rejected and timed-out calls as well as accepted calls;
never replace a `walletRequestId` with an assumed on-chain ID.

# Dark Optimistic Oracle demo screenplay

Demo run: `demo-20261003`. Network: Aleo Testnet. Capture host: m24.

Open `https://dark-optimistic-oracle.github.io/webapp/?demo=demo-20261003`.
Before each action set **Demo step** to the identifier below. Its value is
snapshotted into every request, wallet submission, response, error, and exported
audit entry. Set it before the click, not while a wallet approval is pending.
The screenshot manifest links each captured slide to these identifiers and to
CALLING_SEQUENCE.md. A written scenario is not proof of execution: consult the
captured-run chapter there for actual requests, accepted transaction IDs,
failures, and steps still waiting to be recorded.

## Preparation and filming

Use the dedicated QA Testnet wallet, never an administrator wallet for routine
assertions. Unlock Shield off-camera. Never capture a password, seed phrase,
private key, or private record plaintext. Keep private record inputs out of the
frame; clear them after a successful call before capturing the result. Screenshots
are original captures with slide/step labels in the slideshow caption.

Use three fresh assertion IDs: A (undisputed), B (disputed and confirmed), and C
(disputed and denied). Suggested starting IDs are 2026100301, 2026100302, and
2026100303; query each before use. Use a 1000u128 DOOR bond and 100u128 voter
stake for a small demonstration. DOOR base units are separate from Aleo credits
used for execution fees. All wallet calls request a 1000000-microcredit fee.
Pick deadlines from the current live block height with enough time for proof
generation and all approvals. The minimum dispute window is 10 blocks; voting
must end at least 10 blocks later; voting-right purchases close 10 blocks before
voting ends. Do not shorten a live assertion's terms to accelerate filming.

DOOR must be available publicly for bonds and privately for voting rights. Each
private-fee action also needs a spendable private credits record in Shield.
Funding or record preparation is a separately logged prerequisite, not a click
in the oracle console. Show its transaction in the explorer if performed.

## Act 1 - public inspection and the undisputed path

| Step | Where to click and enter values | Aleo calls | Narration and expected result |
|---|---|---|---|
| DOO-01 | Open the URL; wait for the program status. | GET latest Testnet height; GET `dark_optimistic_oracle.aleo` source. | "The console checks the real Testnet before enabling transactions." |
| DOO-02 | **Connect Wallet**, then **Shield Wallet**; approve the connection in Shield. | Wallet connection only; no Aleo execution. | "Shield keeps the signing key and generates execution proofs." Show the connected public address. |
| DOO-03 | **Proposals**; enter a known assertion ID; **Load assertion**. Also query each new demo ID before using it. | Five oracle mapping reads: `assertions`, `asserters`, `disputers`, `confirm_votes`, `deny_votes`. | Show terms, participants, and public tally. An unused ID must report absent rather than invented state. |
| DOO-04 | **Dispute**; set **Dispute bond** to 1000 without submitting. **Create**; enter A, title 20261003, voter stake 100, claim text, live future deadlines, asserter payout 900, disputer payout 1900; **Submit assertion**. | `dark_optimistic_oracle.aleo/create_assertion(Assertion)` -> `token_registry.aleo/burn_public`. | Explain that claim text is hashed locally and the bond is DOOR. The Create tab shares its bond value with Dispute/Settle. |
| DOO-05 | In Shield inspect program, function, inputs, public fee; **Approve**. Return to the console. | Proof generation, signed submission, wallet status polls. | Capture approval with public inputs only. A temporary Shield request ID does not prove acceptance. |
| DOO-06 | Wait for an **accepted on Testnet** notice; **Proposals**, A, **Load assertion**; open its accepted transaction in the Testnet explorer. | Five mapping reads; explorer transaction read. | Show the final transaction ID, bonded terms, asserter, no disputer, and zero votes. |
| DOO-07 | Wait until live height is strictly greater than A's dispute deadline. Refresh/read current height and reload A. | Height and mapping reads only. | "The grace period is measured in blocks. An undisputed assertion can now be used." Use a time-cut between screenshots; no fake countdown. |
| DOO-08 | **Settle**; A, cost 1000. Ensure the Create-tab **Asserter payout amount** is 900; **Asserter collect**, approve in Shield, wait for acceptance. | `collect_assertion_award(A,900u128)` -> registry `mint_public`. | Show the actual refund to the asserter and 10% protocol fee accounting. The frontend's payout field is set in Create. |

## Act 2 - challenge, private voting, and both decisions

| Step | Where to click and enter values | Aleo calls | Narration and expected result |
|---|---|---|---|
| DOO-09 | Repeat DOO-04/05 for B with fresh future deadlines. **Dispute**; B, bond 1000; **Dispute assertion**; approve and wait for acceptance. | `create_assertion(B)` then `dispute_assertion(B,1000u128)` -> registry `burn_public` for each bond. | "A challenge commits a matching DOOR bond and opens voting." Use separate step markers for the two submissions if recording separate shots. |
| DOO-10 | **Private vote**; B, voter stake 100; enter a real unspent private DOOR record off-camera; **Buy voting right**; approve the private fee. | `new_voting_right(payment,B,100u128)` -> registry `burn_private`; returns VotingRight plus DOOR change. | Demonstrate private ownership, not secret vote direction. Preserve the returned records privately. |
| DOO-11 | Retrieve the real VotingRight in Shield, enter it off-camera; **Confirm privately**; approve; clear record input; **Proposals**, B, **Load assertion**. | `confirm(VotingRight)`; then five mapping reads. | Show confirm tally increasing and the accepted execution. The receipt is a private record; the function direction is public. |
| DOO-12 | Repeat DOO-10 for another right for B, but leave it unused. | `new_voting_right` -> registry `burn_private`. | Reserve an unused right to demonstrate the refund path after voting ends. |
| DOO-13 | Wait until height is strictly greater than B's voting deadline. **Settle**; voter award 101; enter B's receipt off-camera; **Voter collect**; approve; clear the input. | `collect_voting_award(101u128,VotingReceipt)` -> registry `mint_private`. | Show the private payout result without displaying its plaintext record. Only winning-direction receipts qualify. |
| DOO-14 | **Create** sets asserter payout 1900; **Settle** sets B; **Asserter collect**; approve. | `collect_assertion_award(B,1900u128)` -> registry `mint_public`. | A confirmed disputed claim returns both bonds less the protocol fee to the asserter. |
| DOO-15 | **Settle**; refund amount 100; enter the unused B right off-camera; **Voter refund**; approve; clear input. | `refund_voting_right(100u128,VotingRight)` -> registry `mint_private`. | An unused right is consumed once and returns its original stake after voting closes. |
| DOO-16 | Repeat creation and dispute for C. Buy a real voting right; **Deny privately**; reload C. | `create_assertion`, `dispute_assertion`, `new_voting_right`, `deny`, mapping reads. | Capture each sub-action with its own marker `DOO-16-create`, `DOO-16-dispute`, `DOO-16-right`, `DOO-16-deny`. Show the deny tally. |
| DOO-17 | After C's vote deadline, **Create** sets disputer payout 1900; **Settle** selects C; **Disputer collect**; approve. Optionally collect the winning deny receipt with award 101. | `collect_dispute_award(C,1900u128)` -> `mint_public`; optional `collect_voting_award` -> `mint_private`. | A denied or tied challenged claim pays the disputer. Confirm must strictly exceed deny for acceptance. |

## Act 3 - audit evidence and video handoff

| Step | Click | Aleo calls | Narration and capture |
|---|---|---|---|
| DOO-18 | **Download audit LOG.md**, then **View demo audit log** if download retrieval is unavailable. | None: exports the journal already recorded. | Show demo run/step, function, public parameters, wallet request ID, final transaction ID, and exact request/response order. Private records remain fingerprinted. |
| DOO-19 | Open each accepted transaction using its actual returned ID in the Testnet explorer. | Read transaction from explorer/provider. | Finish with independent acceptance evidence. Record failures honestly; don't use a pending request as a success shot. |

There is no frontend Initialize, administrator-upgrade, protocol-fee collection,
or standalone verifier button. Initialization already happened and must not be
replayed. Verifier integration is demonstrated by Verity's settlement call.
Those administrator and integration functions belong in the calling-sequence
explanation, not invented frontend clicks.

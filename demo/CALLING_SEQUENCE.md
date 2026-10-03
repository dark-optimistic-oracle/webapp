# Dark Optimistic Oracle calling sequence

Run `demo-20261003`; Testnet; primary API `https://api.provable.com/v2`.
The screenplay specifies the human clicks. This file distinguishes intended
contract calls from captured execution evidence. The slideshow manifest assigns
actual screenshots to the same `DOO-*` step identifiers.

## Planned sequence and nested contract operations

| Screenplay step | Entry point / public parameters | Calling chain and state effect |
|---|---|---|
| DOO-01 | GET `/testnet/block/height/latest`; GET `/testnet/program/dark_optimistic_oracle.aleo` | Public provider reads, not transactions. |
| DOO-02 | Shield connection on Testnet, decrypt permission UponRequest | No oracle or registry call. |
| DOO-03/06/07/11 | `get_mapping_value(mapping, assertionIdfield)` | Oracle `assertions`, `asserters`, `disputers`, `confirm_votes`, `deny_votes`; reads run concurrently and their response order can differ. |
| DOO-04/09/16 | `create_assertion({id,title,content_hash,cost,voter_stake,dispute_deadline_block_height,voting_deadline_block_height})` | Oracle -> registry `burn_public(DOOR_TOKEN_ID,caller,cost)`; writes terms, creation height, asserter, and fee accounting. |
| DOO-09/16 | `dispute_assertion(idfield,1000u128)` | Oracle -> registry `burn_public(DOOR_TOKEN_ID,caller,cost)`; records one disputer before dispute closes. |
| DOO-10/12/16 | `new_voting_right(privatePayment,idfield,100u128)` | Oracle -> registry `burn_private(payment,100u128)`; returns VotingRight and change. Purchase must finish at least 10 blocks before voting deadline. |
| DOO-11 | `confirm(privateVotingRight)` | Consumes right; writes confirm tally; returns private confirming receipt. |
| DOO-16 | `deny(privateVotingRight)` | Consumes right; writes deny tally; returns private denying receipt. |
| DOO-13/17 | `collect_voting_award(101u128,privateReceipt)` | Oracle -> registry `mint_private`; consumes receipt; only winning-direction receipts qualify after vote deadline. |
| DOO-08 | `collect_assertion_award(Afield,900u128)` | Undisputed branch -> registry `mint_public` to recorded asserter; sets claim flag. |
| DOO-14 | `collect_assertion_award(Bfield,1900u128)` | Confirmed disputed branch -> registry `mint_public`; sets claim flag. |
| DOO-15 | `refund_voting_right(100u128,unusedPrivateRight)` | Consumes unused right -> registry `mint_private` after voting deadline. |
| DOO-17 | `collect_dispute_award(Cfield,1900u128)` | Denied/tied disputed branch -> registry `mint_public` to disputer; sets claim flag. |
| DOO-18 | Download / preview audit journal | No new Aleo call. |
| DOO-19 | Explorer reads by accepted transaction ID | Independent transaction/finality evidence. |

`DOOR_TOKEN_ID` is
`346688784394585735039324415800163929700021701423791533632764818774905958305field`.
The initial public run specified a `1000000`-microcredit priority fee. Resumed
QA calls with `demoTools=1` specify `10000` microcredits; Shield adds the network
base fee or displays sponsored fee coverage. Voting-right, confirm,
deny, private award and private refund requests set `privateFee=true`; assertion,
dispute and public bond-award requests set `privateFee=false`.

The frontend is the caller of the top-level execution. Its audit journal logs
that request, the normalized parameters, Shield's temporary request ID, and
terminal status. Nested registry operations happen inside the execution and
are verified from the accepted transaction body; they are not additional
frontend wallet clicks. Network fee transitions belong to `credits.aleo`.

## Captured run

Native permissions were enabled and Shield unlocked. The public branch is
captured in slides 1-10 and in the verbatim browser journal `AUDIT_EXPORT.md`,
also imported into root LOG.md. Request/result entries retain the initiating
step. Wallet approval slides DOO-05 correspond to the DOO-04 logged request.

| Order | Step | Accepted execution | Wallet request | Transaction |
| --- | --- | --- | --- | --- |
| 1 | DOO-04 | `create_assertion`, assertion 2026100301, title 20261003, bond 1000, stake 100, deadlines 20136400/20136440 | `shield_1791006181781_j5d6fhdikcr` | [accepted transaction](https://testnet.explorer.provable.com/transaction/at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f) |
| 2 | DOO-08 | `collect_assertion_award(2026100301field,900u128)` after grace ended | `shield_1791006336385_spgolrhnv4g` | [accepted transaction](https://testnet.explorer.provable.com/transaction/at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z) |

The assertion was accepted in block 20136375. The frontend read back the exact
terms, QA asserter, no disputer, and zero vote counts. A diagnostic live-height
read returned 20136410 before award collection, past the 20136400 grace end.
Claim hash: `1967197542655213185970768287057963230030743952149426568688518505609222478009field`.

Private voting was subsequently captured for fresh assertion 2026100306.
Disputed awards and an unused-right refund were subsequently accepted (below).
The user confirmed no prepared private records, then authorized preparation
and execution within an additional 10-Testnet-ALEO budget. Preserve these as
historical checkpoint steps; accepted completion is recorded below.

## Private preparation and voting capture, 2026-10-03

Slides 11-13 show preparation availability, private-right wallet review, and
the public 1-confirm/0-deny tally. Private record contents were cleared before
capture and are represented only by fingerprints in the audit journal.

1. DOO-PREP-01: registry `transfer_public_to_private(DOOR_TOKEN_ID,QA,1000u128,false)`
   accepted as `at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23`.
2. DOO-PREP-02: credits `transfer_public_to_private(QA,3000000u64)` accepted as
   `at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv`.
3. DOO-PREP-03: Shield registry record read returned one usable unspent record.
4. DOO-PRIVATE-01/02: assertion 2026100302 was accepted with the hidden default
   100000000-unit bond. Its 1000-unit dispute was rejected, not accepted.
   Public readback confirmed the mismatch and no disputer. The UI now exposes
   the creation bond; payouts are not substitutes for that input.
5. DOO-09: assertion 2026100306 created with bond 1000, stake 100, and deadlines
   20145650/20145700. Creation accepted as
   `at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd`;
   its matching dispute accepted as
   `at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9`.
6. DOO-10: `new_voting_right(privatePayment,2026100306field,100u128)` accepted as
   `at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4`.
7. DOO-11: Shield returned a usable Oracle record, then `confirm(privateRight)`
   accepted as `at1kh705w6fejhp0u4zq2ws0xzkxqh7juymjfpn2elsxk8nsz95dszsk9qxze`.
   Explorer independently shows Accepted at block 20145376, fee 2973 microcredits,
   and the confirm transition. Public readback shows confirm=1 and deny=0.
8. DOO-12: a second `new_voting_right` using the private change record accepted
   as `at1qf8gkdvg3thzspdcfsfep647n0fvggwq2pv927atp2mnk6qpucxs4d434s`.
   This right was left unused until its refund after voting closed.

## Accepted completion, 2026-10-03

All calls below target `dark_optimistic_oracle.aleo` on Testnet, through Shield.
The adapter does not expose its submission endpoint. Public read endpoints and
full wallet request IDs are in the exact browser exports imported into LOG.md.
Private inputs are fingerprinted, never published as plaintext.

| Step | Operation and result | Accepted transaction |
| --- | --- | --- |
| DOO-RECOVERY-01 | Recover 90000000 DOOR from undisputed assertion 2026100302; the 10000000-unit protocol fee is not recoverable | `at1fnypqe5thl7mugwn6n6tetz3kwcq467lw4n4hm333a0ansh0pvzswgmxxl` |
| DOO-13 | Confirming receipt award 101 DOOR for 2026100306 | `at1zs9320qx7fk7xdh76j2hljpy2r3q9etls2pxlx2t0wl02pld2cpqdl5unr` |
| DOO-14 | Asserter payout 1900 DOOR for 2026100306 | `at1dacpqzgrd9phzwnf2292fv0d8lx9ghpgmjd8c899pvgt5wtjqq9q8x6f3x` |
| DOO-15 | Unused private voting-right refund 100 DOOR | `at1qqahg3f5uezlrgjvftqn93zwyuqqlfwdwftxm4ffsfhly98jusyqf7juqz` |
| DOO-16-right | Private right, 100 DOOR, for Verity assertion 2026100305 | `at1c2gafx0tlzs5cf48px9gn2e9gengm0rar94dx7f53zjrnle8fufqcjy56h` |
| DOO-16-deny | Deny the reported NO assertion using that right | `at18863kgtdk6kfa8nv4uqx6s2yu4dguv9urpqxk8hhnr5wh0fudyys7jylk6` |
| DOO-17-voter | First winning denying receipt award, 101 DOOR | `at140v8wdqe0tg57fmxy9fx64uf7dsvxu6nxmea8vfzeu29krmp0qfqnkpqjv` |
| DOO-17-disputer | Disputer payout 1900 DOOR for 2026100305 | `at1lzyxezrhe2qllh7xtk0qrz5ccqraj6c8eafppy3z0l7gthlcjsysxrfttx` |

The independent confirming-receipt claim for 2026100305 was not attempted:
it lost the 1-confirm/2-deny vote. A second winning denying receipt remains
unclaimed. Neither is fabricated as a successful claim. All roles use the
same controlled QA account; this demonstration is not a consensus audit.
Slides 14-16 show wallet review, denied tally, and accepted disputer payout.
Explorer transaction URLs use `https://testnet.explorer.provable.com/transaction/`
followed by the exact transaction ID above.

Full wallet IDs, exact public inputs, record fingerprints, and request/response
order are preserved in the browser journal imported into root LOG.md.

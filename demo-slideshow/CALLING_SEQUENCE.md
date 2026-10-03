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
All wallet requests specify fee `1000000` microcredits. Voting-right, confirm,
deny, private award and private refund requests set `privateFee=true`; assertion,
dispute and public bond-award requests set `privateFee=false`.

The frontend is the caller of the top-level execution. Its audit journal logs
that request, the normalized parameters, Shield's temporary request ID, and
terminal status. Nested registry operations happen inside the execution and
are verified from the accepted transaction body; they are not additional
frontend wallet clicks. Network fee transitions belong to `credits.aleo`.

## Captured run

Capture has started with real public Testnet reads. Wallet signing is currently
waiting on native Computer Use permissions on m24. No new signed execution or
accepted demo transaction is claimed here until its evidence is added.
See LOG.md for the ordered observed records, including blocked attempts.

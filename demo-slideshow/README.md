# Dark Optimistic Oracle demo: viewing and verification

This folder contains a 16-slide capture of actual Aleo Testnet operations from
the published frontend, recorded on 2026-10-03 as run `demo-20261003`.
It is reproducible evidence for the exercised paths, not proof that every
possible protocol behavior is correct or a replacement for a security audit.

## View the slideshow

Download or clone this repository, keep this folder intact, and open
[index.html](index.html) in a browser. Scroll down through the numbered slides;
no wallet, server, or new transaction is required to view them. Opening HTML
as source on GitHub is not the slideshow: download it together with its images.
Alternatively open [DEMO_SLIDESHOW.pdf](DEMO_SLIDESHOW.pdf) in a PDF viewer and
use full-screen/presentation mode. Individual `slideN.jpg`/`slideN.png` files
are the original captures. Both presentations have step captions.

## Trace the calls

- [DEMO_SCREENPLAY.md](DEMO_SCREENPLAY.md): where to click and what each step does.
- [CALLING_SEQUENCE.md](CALLING_SEQUENCE.md): entry points, nested registry
  operations, public inputs, deadlines, accepted IDs, and recorded exceptions.
- [../LOG.md](../LOG.md): authoritative consolidated experiment journal,
  including ordered browser exports, human explanations and normalized JSON.
- [AUDIT_EXPORT.md](AUDIT_EXPORT.md) and
  [AUDIT_PRIVATE_FINAL.md](AUDIT_PRIVATE_FINAL.md): captured browser journal
  snapshots. Intermediate checkpoint exports are consolidated in root LOG.md.
  Snapshots may overlap; do not count duplicate entries as additional calls.
- [../AUDIT.md](../AUDIT.md): findings and fixes, including the creation-bond
  UI mismatch discovered in this experiment.

Search LOG.md for the slide's `DOO-*` marker, assertion ID, wallet request ID,
or chain transaction ID. Match entries by callId and timestamp within their
snapshot; counters can restart across frontend reloads. Distinguish request,
submitted, and terminal response: wallet approval alone is not acceptance.
Concurrent read responses may arrive in a different order from their requests.

For each accepted transaction, open
`https://testnet.explorer.provable.com/transaction/<transaction-ID>` using the
exact ID from the calling sequence or log. Verify Testnet, accepted status,
program/function, block, available public inputs and nested transitions.
Then compare the following mapping readback to the expected state. Explorer
does not expose private record plaintext, and screenshots do not establish
every private input; the log retains redacted fingerprints, not secret records.

Reads use `https://api.provable.com/v2` (fallback
`https://api.explorer.provable.com/v2`); check the endpoint on each actual entry.
Shield's transaction-submission endpoint is not exposed by the wallet adapter.
Wallet record reads are wallet operations, not blockchain executions. Connecting,
hashing claim text and downloading logs are not Aleo transactions either.

## What was demonstrated

The capture exercises public creation and undisputed payout, a matching
dispute, private voting-right purchase, confirm and deny, aggregate tally
readback, winning voter awards, confirmed asserter payout, unused-right refund,
and denied-assertion disputer payout. Registry and credits calls prepare private
DOOR and fee records. Assertion 2026100306 confirmed; the Verity-linked assertion
2026100305 had 1 confirm and 2 deny votes and was rejected after voting closed.
For the market settlement using that rejection, see
[the companion guide](../../predmkt/demo-slideshow/README.md) in the sibling checkout
or [the predmkt repository](https://github.com/dark-optimistic-oracle/predmkt/tree/main/demo-slideshow).

The mismatched dispute for assertion 2026100302 was rejected, not successful.
Its creation used an unintended 100000000-unit bond; the UI was fixed to expose
that value, and 90% was recovered through the correct undisputed payout. The
10% protocol fee remains spent. Earlier slide captions describe their checkpoint
in time; later slides and the consolidated journal record the private extension.

## Review limits and completeness

All roles use one controlled QA account. This demonstrates transaction wiring
and exercised contract branches, not independent consensus or real-world truth.
One winning denying receipt remains unclaimed; a losing confirming receipt was
not submitted. Administrative, upgrade, adversarial and every boundary-condition
path are not all captured here. The frontend's 18 unit tests, lint and production
build passed at completion; those complement, but do not replace, chain evidence.
Private keys, wallet credentials and private record plaintext are excluded.
Use the logs to audit the actual sequence, including rejected calls, rather than
interpreting a planned screenplay step as proof it ran.

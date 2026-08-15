# Repository agent instructions

## Record experiments and Aleo calls

Treat `LOG.md` as part of every experiment, QA run, integration test, deployment check, or sequence of Aleo reads and transactions.

- Update `LOG.md` before declaring the work complete, and include it in the same commit as related fixes or documentation.
- Explain the purpose, ordered operations, and result in plain language. An auditor should not need to interpret raw JSON to understand what happened.
- For every call, record the network and endpoint, program and function or mapping, public parameters, wallet request ID when available, transaction ID when available, result, and relevant final on-chain state.
- Preserve exact call order. State clearly when a request was cancelled, rejected, blocked, timed out, or never submitted. Never invent missing evidence.
- For browser calls, use **Download audit LOG.md** and merge the relevant exported entries, including their human-readable explanations and normalized JSON, into the repository log.
- Never log private keys, seed phrases, wallet passwords, passphrases, `.env` contents, private record plaintext, or other secret inputs. Use redacted fingerprints or public addresses only.
- Before committing, verify that `LOG.md` changed whenever calls were actually made. If no call occurred, do not fabricate one; record a failed or cancelled attempt only when it explains the observed state.
- When the logging workflow changes, update `README.md` and `DEVELOP.md` too.

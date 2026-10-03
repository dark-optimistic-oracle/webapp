// Preserve a downloaded frontend journal verbatim, with an idempotent digest.
// This imports evidence only; the operator must still review, commit and push.
import { readFile, appendFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const [exportPath, logPath] = process.argv.slice(2);
if (!exportPath || !logPath) throw new Error('Usage: node import_audit_log.mjs EXPORT.md LOG.md');
const source = await readFile(exportPath, 'utf8');
if (!source.includes('aleo-browser-audit/v1') || !source.includes('Generated automatically')) {
  throw new Error('Expected an exported frontend audit journal.');
}
if (/APrivateKey1|AViewKey1|\b(?:mnemonic|seed_phrase|wallet_password|private_key)\s*[=:]/i.test(source) ||
    /owner\s*:\s*aleo\w+\.private/.test(source)) {
  throw new Error('Possible secret input detected. Review the export without committing it.');
}
const digest = createHash('sha256').update(source).digest('hex');
const current = await readFile(logPath, 'utf8');
if (current.includes(`audit-export-sha256: ${digest}`)) {
  console.log('This exact export is already retained.');
} else {
  // Demote generated headings so the journal is a chapter in the existing log.
  const chapter = source.replace(/^(#{1,5}) /gm, '$1# ');
  await appendFile(logPath, `\n\n## Imported frontend journal\n\n<!-- audit-export-sha256: ${digest} -->\n\n${chapter}\n`);
  console.log('Imported journal. Review, stage LOG.md, commit and push before completion.');
}

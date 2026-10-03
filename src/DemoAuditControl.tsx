import { useState } from 'react';
import { buildAleoAuditMarkdown, getAleoDemoContext, setAleoDemoStep } from './aleoAudit';

/** Visible only for explicitly tagged demo runs; captures the step before a click. */
export default function DemoAuditControl() {
  const context = getAleoDemoContext();
  const [step, setStep] = useState(context?.step ?? 'DOO-01');
  const [preview, setPreview] = useState('');
  if (!context) return null;
  return <aside aria-label="Demo audit markers" style={{ padding: '1rem', border: '1px solid #38786b', borderRadius: 12 }}>
    <label>Demo step
      <input value={step} maxLength={64} onChange={(event) => {
        const next = event.target.value;
        if (!/^[A-Za-z0-9_-]*$/.test(next)) return;
        setStep(next);
        setAleoDemoStep(next || 'UNLABELLED');
      }} />
    </label>
    <p>Run {context.run}. Set the screenplay step before each Aleo action.</p>
    <button type="button" onClick={() => setPreview(buildAleoAuditMarkdown())}>View demo audit log</button>
    {preview && <>
      <button type="button" onClick={() => setPreview('')}>Close audit preview</button>
      <textarea aria-label="Demo audit log" readOnly rows={12} value={preview} style={{ width: '100%', marginTop: 12 }} />
    </>}
  </aside>;
}

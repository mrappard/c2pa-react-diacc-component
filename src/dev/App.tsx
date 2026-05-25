import { useState } from 'react'
import { DIACCManifest } from '../components/Diacc/Diacc'
import type { VerificationOutcome } from 'c2pa-react-component-types'

import diaccExample from '../../examples/diacc-pctf-example.json'

const examples: { label: string; data: VerificationOutcome }[] = [
  { label: 'DIACC PCTF Conformance', data: diaccExample as unknown as VerificationOutcome },
]

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const example = examples[selectedIndex]

  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto', fontFamily: 'sans-serif', padding: '0 1rem' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>DIACC Component - Dev Playground</h1>
      <p style={{ color: '#64748b', marginTop: 0, marginBottom: '2rem' }}>
        DIACC PCTF conformance plugin for c2pa-react-component
      </p>

      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label htmlFor="example-select" style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>
          Example:
        </label>
        <select
          id="example-select"
          value={selectedIndex}
          onChange={e => setSelectedIndex(Number(e.target.value))}
          style={{ padding: '6px 12px', fontSize: '14px', borderRadius: '6px', border: '1px solid #d1d5db', background: '#fff' }}
        >
          {examples.map((ex, i) => (
            <option key={i} value={i}>{ex.label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {([1, 2, 3] as const).map((l) => (
          <div key={l}>
            <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '13px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Level {l}
            </p>
            <DIACCManifest manifest={example.data} level={l} />
          </div>
        ))}
      </div>
    </div>
  )
}

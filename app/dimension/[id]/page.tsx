'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useReflections } from '@/lib/hooks'
import { DIMENSIONS } from '@/lib/data'
import Nav from '@/components/Nav'

export default function DimensionPage() {
  const { id } = useParams()
  const router = useRouter()
  const { reflections, saveReflection } = useReflections()
  const dim = DIMENSIONS.find(d => d.id === id)
  const idx = DIMENSIONS.indexOf(dim!)
  const next = DIMENSIONS[idx + 1]
  const prev = DIMENSIONS[idx - 1]
  const dark = [3, 6].includes(idx)
  const bg = dark ? '#080808' : idx % 2 === 0 ? '#ffffff' : '#faf8f4'
  const textColor = dark ? '#ffffff' : '#080808'

  const [answers, setAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    if (reflections[id as string]) {
      setAnswers(reflections[id as string])
    }
  }, [reflections, id])

  const handleChange = (qi: number, val: string) => {
    const updated = { ...answers, [qi]: val }
    setAnswers(updated)
    saveReflection(id as string, updated)
  }

  if (!dim) return <div>Dimension not found</div>

  return (
    <div style={{ fontFamily: 'Palatino Linotype, serif', background: bg, minHeight: '100vh' }}>
      <Nav />
      <div style={{ paddingTop: 60 }}>
        <div style={{ padding: '64px 32px 0', maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(72px,12vw,140px)',
            fontWeight: 900, lineHeight: 1, color: dark ? 'rgba(255,255,255,0.06)' : '#f5f2ec',
            marginBottom: -20 }}>{dim.num}</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(40px,7vw,80px)',
            fontWeight: 900, lineHeight: 0.95, color: textColor }}>
            {dim.name}.<br /><em style={{ fontWeight: 400 }}>Elevated.</em>
          </div>
          <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: dark ? 'rgba(255,255,255,0.35)' : '#888', marginTop: 16, marginBottom: 40 }}>
            {dim.sub}
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 32px 80px' }}>
          <div style={{ background: dark ? 'rgba(255,255,255,0.06)' : '#f5f2ec',
            borderLeft: `4px solid ${dark ? 'rgba(255,255,255,0.25)' : '#080808'}`,
            padding: '32px 36px', marginBottom: 36 }}>
            <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: dark ? 'rgba(255,255,255,0.35)' : '#888', marginBottom: 14 }}>
              The Honest Truth About This Dimension
            </div>
            <p style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 'clamp(15px,1.7vw,18px)',
              fontWeight: 300, lineHeight: 1.9, fontStyle: 'italic',
              color: dark ? 'rgba(255,255,255,0.75)' : '#1c1c1c', marginBottom: 0 }}>{dim.truth}</p>
          </div>

          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(17px,2.2vw,24px)',
            fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: textColor,
            borderLeft: `3px solid ${dark ? 'rgba(255,255,255,0.25)' : '#080808'}`,
            padding: '16px 28px', margin: '36px 0' }}>
            "Every minute you invest in a life misaligned with your values is a minute borrowed from the life you actually want to be building."
          </div>

          <div style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#f5f2ec', padding: '36px 40px', marginTop: 40 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(18px,2.2vw,24px)',
              fontStyle: 'italic', fontWeight: 400, color: textColor, marginBottom: 28 }}>
              {dim.name}: Your Honest Reflection
            </div>
            {dim.questions.map((q, qi) => (
              <div key={qi} style={{ marginBottom: 28, paddingBottom: 28,
                borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#ccc5b8'}` }}>
                <span style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: dark ? 'rgba(255,255,255,0.4)' : '#888', marginBottom: 8, display: 'block' }}>
                  Reflection {qi + 1}
                </span>
                <p style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 'clamp(15px,1.7vw,18px)',
                  fontStyle: 'italic', fontWeight: 300, lineHeight: 1.9,
                  color: dark ? 'rgba(255,255,255,0.7)' : '#1c1c1c', marginBottom: 10 }}>{q}</p>
                <textarea rows={3} value={answers[qi] || ''} onChange={e => handleChange(qi, e.target.value)}
                  placeholder="Write freely — this reflection is for you alone."
                  style={{ width: '100%', border: 'none',
                    borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : '#ccc5b8'}`,
                    background: 'transparent', resize: 'none', outline: 'none',
                    fontFamily: 'Palatino Linotype, serif', fontSize: 15, fontWeight: 300,
                    fontStyle: 'italic', color: dark ? 'rgba(255,255,255,0.8)' : '#1c1c1c',
                    lineHeight: 2, padding: '8px 0' }}
                  onInput={e => {
                    const t = e.target as HTMLTextAreaElement
                    t.style.height = 'auto'
                    t.style.height = t.scrollHeight + 'px'
                  }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              {prev && (
                <button onClick={() => router.push(`/dimension/${prev.id}`)} style={{
                  fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.26em', textTransform: 'uppercase', padding: '14px 32px',
                  background: 'transparent', color: textColor,
                  border: `2px solid ${dark ? 'rgba(255,255,255,0.3)' : '#080808'}`, cursor: 'pointer'
                }}>← {prev.name}</button>
              )}
            </div>
            <button onClick={() => next ? router.push(`/dimension/${next.id}`) : router.push('/journey')}
              style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
                letterSpacing: '0.26em', textTransform: 'uppercase', padding: '14px 32px',
                background: next ? '#080808' : 'transparent',
                color: next ? '#ffffff' : textColor,
                border: `2px solid ${dark ? 'rgba(255,255,255,0.3)' : '#080808'}`, cursor: 'pointer' }}>
              {next ? `${next.name} →` : 'Complete Journey →'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 4, marginTop: 32, flexWrap: 'wrap' }}>
            {DIMENSIONS.map(d => (
              <div key={d.id} onClick={() => router.push(`/dimension/${d.id}`)}
                style={{ width: 28, height: 4, borderRadius: 2, cursor: 'pointer',
                  background: d.id === id ? (dark ? '#ffffff' : '#080808') : (dark ? 'rgba(255,255,255,0.15)' : '#ccc5b8'),
                  transition: 'background 0.2s' }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import { useReflections } from '@/lib/hooks'
import { DIMENSIONS } from '@/lib/data'
import Nav from '@/components/Nav'

export default function PracticePage() {
  const { reflections } = useReflections()
  const [tab, setTab] = useState('daily')
  const [focus, setFocus] = useState('')
  const [weeklyNotes, setWeeklyNotes] = useState('')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const remaining = 1440 - (time.getHours() * 60 + time.getMinutes())
  const today = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div style={{ fontFamily: 'Palatino Linotype, serif', background: '#ffffff', minHeight: '100vh' }}>
      <Nav />
      <div style={{ paddingTop: 60 }}>
        <div style={{ background: '#080808', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
              {today}
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px,5vw,60px)',
              fontWeight: 900, color: '#ffffff', lineHeight: 0.95 }}>
              Practice<br /><em style={{ fontWeight: 400 }}>Hub.</em>
            </div>
            <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 16, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>
              {remaining.toLocaleString()} minutes remaining in your day. Invest them deliberately.
            </div>
          </div>
        </div>

        <div style={{ background: '#f5f2ec', borderBottom: '1px solid #ccc5b8' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 32px', display: 'flex' }}>
            {['daily', 'weekly', 'quarterly'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase', background: 'none', border: 'none',
                cursor: 'pointer', padding: '16px 24px', color: tab === t ? '#080808' : '#888',
                borderBottom: tab === t ? '2px solid #080808' : '2px solid transparent'
              }}>
                {t === 'daily' ? 'Daily Practice' : t === 'weekly' ? 'Weekly Review' : 'Quarterly Assessment'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 32px' }}>
          {tab === 'daily' && (
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px,4vw,52px)',
                fontWeight: 900, lineHeight: 1.0, color: '#080808', marginBottom: 12 }}>
                One Decision.<br /><em style={{ fontWeight: 400 }}>One Action. Today.</em>
              </div>
              <p style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 17, fontWeight: 300,
                lineHeight: 1.9, color: '#1c1c1c', marginBottom: 36 }}>
                Before the demands of the day own your attention — fifteen minutes. One question.
                One decision. One action your elevated self would make and your drifting self would avoid.
              </p>
              <div style={{ background: '#f5f2ec', padding: '36px 40px' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(17px,2.2vw,24px)',
                  fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: '#080808',
                  borderLeft: '3px solid #080808', padding: '16px 28px', margin: '0 0 28px' }}>
                  "What is the one choice I will make today that moves me toward the life I declared?"
                </div>
                <label style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 8, display: 'block' }}>
                  My focus for today
                </label>
                <textarea rows={3} value={focus} onChange={e => setFocus(e.target.value)}
                  placeholder="Name it specifically. What will you do, decide, or protect today?"
                  style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc5b8',
                    background: 'transparent', resize: 'none', outline: 'none',
                    fontFamily: 'Palatino Linotype, serif', fontSize: 16, fontWeight: 300,
                    fontStyle: 'italic', color: '#1c1c1c', lineHeight: 2, padding: '8px 0' }} />
              </div>
            </div>
          )}

          {tab === 'weekly' && (
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px,4vw,52px)',
                fontWeight: 900, lineHeight: 1.0, color: '#080808', marginBottom: 12 }}>
                Review. Recalibrate.<br /><em style={{ fontWeight: 400 }}>Recommit.</em>
              </div>
              <p style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 17, fontWeight: 300,
                lineHeight: 1.9, color: '#1c1c1c', marginBottom: 36 }}>
                Every week, before the new week begins — thirty minutes to review the past seven days.
                Small drifts caught early remain small.
              </p>
              <div style={{ margin: '36px 0' }}>
                {DIMENSIONS.map(d => {
                  const filled = Object.values(reflections[d.id] || {}).filter((v: any) => v.trim()).length
                  const pct = Math.round((filled / d.questions.length) * 100)
                  return (
                    <div key={d.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 50px',
                      gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #ccc5b8' }}>
                      <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
                        letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888' }}>
                        {d.num} {d.name}
                      </div>
                      <div style={{ height: 3, background: '#ccc5b8', borderRadius: 2 }}>
                        <div style={{ height: 3, background: pct === 100 ? '#080808' : '#4a4a4a',
                          borderRadius: 2, width: `${pct}%` }}></div>
                      </div>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700,
                        color: '#080808', textAlign: 'right' }}>{pct}%</div>
                    </div>
                  )
                })}
              </div>
              <div style={{ background: '#f5f2ec', padding: '32px 36px', marginTop: 16 }}>
                <label style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 8, display: 'block' }}>
                  Weekly reflection notes
                </label>
                <textarea rows={4} value={weeklyNotes} onChange={e => setWeeklyNotes(e.target.value)}
                  placeholder="What moved this week? What stalled? What would you do differently?"
                  style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc5b8',
                    background: 'transparent', resize: 'none', outline: 'none',
                    fontFamily: 'Palatino Linotype, serif', fontSize: 16, fontWeight: 300,
                    fontStyle: 'italic', color: '#1c1c1c', lineHeight: 2, padding: '8px 0' }} />
              </div>
            </div>
          )}

          {tab === 'quarterly' && (
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px,4vw,52px)',
                fontWeight: 900, lineHeight: 1.0, color: '#080808', marginBottom: 12 }}>
                Measure. Revise.<br /><em style={{ fontWeight: 400 }}>Recommit at Depth.</em>
              </div>
              <p style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 17, fontWeight: 300,
                lineHeight: 1.9, color: '#1c1c1c', marginBottom: 36 }}>
                Every three months — return to the full program. Rate all ten dimensions.
                Compare to where you began. Revise your Manifesto as your clarity deepens.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, margin: '36px 0' }}>
                {DIMENSIONS.map(d => {
                  const filled = Object.values(reflections[d.id] || {}).filter((v: any) => v.trim()).length
                  const pct = Math.round((filled / d.questions.length) * 100)
                  return (
                    <div key={d.id} style={{ padding: '20px 16px',
                      background: pct === 100 ? '#080808' : '#faf8f4', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 900,
                        color: pct === 100 ? '#ffffff' : '#080808', lineHeight: 1, marginBottom: 4 }}>{pct}%</div>
                      <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 8,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: pct === 100 ? 'rgba(255,255,255,0.5)' : '#888', marginBottom: 2 }}>{d.num}</div>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: 12, fontWeight: 700,
                        color: pct === 100 ? '#ffffff' : '#1c1c1c' }}>{d.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
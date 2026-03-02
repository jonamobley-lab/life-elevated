'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useReflections, useProfile } from '@/lib/hooks'
import { DIMENSIONS } from '@/lib/data'
import Nav from '@/components/Nav'

export default function DashboardPage() {
  const router = useRouter()
  const { reflections } = useReflections()
  const { profile } = useProfile()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const elapsed = time.getHours() * 60 + time.getMinutes()
  const remaining = 1440 - elapsed
  const completedDims = DIMENSIONS.filter(d =>
    Object.values(reflections[d.id] || {}).some((v: any) => v.trim())
  ).length
  const pct = Math.round((completedDims / DIMENSIONS.length) * 100)

  return (
    <div style={{ fontFamily: 'Palatino Linotype, serif', background: '#ffffff', minHeight: '100vh' }}>
      <Nav />
      <div style={{ paddingTop: 60 }}>
        <div style={{ background: '#080808', padding: '64px 52px 56px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
              Welcome back
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px,5vw,60px)',
              fontWeight: 900, lineHeight: 0.95, color: '#ffffff', marginBottom: 8 }}>
              {profile?.name || 'Leader'}.
            </div>
            <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 18, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.55)', marginBottom: 40 }}>
              Your elevated life is built one intentional choice at a time.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)' }}>
              {[
                { n: '1,440', l: 'Minutes in your day' },
                { n: elapsed.toLocaleString(), l: 'Minutes invested so far' },
                { n: remaining.toLocaleString(), l: 'Minutes remaining today' }
              ].map((s, i) => (
                <div key={i} style={{ padding: '28px 24px', background: 'rgba(0,0,0,0.4)' }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px,4vw,44px)',
                    fontWeight: 900, color: '#ffffff', lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
                  <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 500,
                    letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '52px 32px' }}>
          <div style={{ background: '#f5f2ec', padding: '32px 36px', marginBottom: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 48, fontWeight: 900, color: '#080808', lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#888', marginTop: 4 }}>Journey Complete</div>
            </div>
            <div style={{ flex: 1, maxWidth: 340 }}>
              <div style={{ height: 4, background: '#ccc5b8', borderRadius: 2, marginBottom: 8 }}>
                <div style={{ height: 4, background: '#080808', borderRadius: 2, width: `${pct}%`, transition: 'width 0.6s ease' }}></div>
              </div>
              <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 14, fontStyle: 'italic', color: '#888' }}>
                {completedDims} of {DIMENSIONS.length} dimensions explored
              </div>
            </div>
            <button onClick={() => router.push('/journey')} style={{
              fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.26em', textTransform: 'uppercase', padding: '14px 32px',
              background: '#080808', color: '#ffffff', border: '2px solid #080808', cursor: 'pointer'
            }}>Continue Journey</button>
          </div>

          <div style={{ borderTop: '3px solid #080808', padding: '28px 0 0' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(18px,2.5vw,26px)',
              fontStyle: 'italic', fontWeight: 400, marginBottom: 16, color: '#080808' }}>
              "Every minute is either invested or surrendered. There is no neutral."
            </div>
            <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 15, color: '#4a4a4a',
              lineHeight: 1.8, marginBottom: 28 }}>
              The daily practice is fifteen minutes — before the demands of the day own your attention.
              One question. One decision. One action your elevated self would make.
            </div>
            <button onClick={() => router.push('/practice')} style={{
              fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.26em', textTransform: 'uppercase', padding: '14px 32px',
              background: '#080808', color: '#ffffff', border: '2px solid #080808', cursor: 'pointer'
            }}>Open Practice Hub</button>
          </div>
        </div>
      </div>
    </div>
  )
}
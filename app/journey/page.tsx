'use client'
import { useRouter } from 'next/navigation'
import { useReflections } from '@/lib/hooks'
import { DIMENSIONS } from '@/lib/data'
import Nav from '@/components/Nav'

export default function JourneyPage() {
  const router = useRouter()
  const { reflections } = useReflections()
  const completedDims = DIMENSIONS.filter(d =>
    Object.values(reflections[d.id] || {}).some((v: any) => v.trim())
  ).length

  const parts = [
    {
      num: '01', title: 'The Reckoning', sub: 'Where you actually are. Not where you tell people you are.',
      desc: 'A clear-eyed confrontation with the gap between the life you are performing and the life you are actually living. The seven patterns of drift. The real cost of misalignment.',
      action: null
    },
    {
      num: '02', title: 'The Framework', sub: 'The architecture of an elevated life.',
      desc: 'Three structural principles that govern how transformation actually works. The ten dimensions that define the full terrain of a realized life.',
      action: null
    },
    {
      num: '03', title: 'The Dimensions', sub: 'Ten dimensions. One integrated life.',
      desc: 'Work through each of the ten dimensions with complete honesty. Your reflections are saved privately and form the foundation of your Manifesto.',
      action: 'dimensions'
    },
    {
      num: '04', title: 'The Manifesto', sub: 'Where intention becomes declaration.',
      desc: 'The culmination of the program. Your personal declaration of who you are choosing to become and the life you are committed to building.',
      action: 'manifesto'
    }
  ]

  return (
    <div style={{ fontFamily: 'Palatino Linotype, serif', background: '#ffffff', minHeight: '100vh' }}>
      <Nav />
      <div style={{ paddingTop: 60 }}>
        <div style={{ background: '#080808', padding: '56px 32px 48px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(44px,7vw,80px)',
              fontWeight: 900, lineHeight: 0.92, color: '#ffffff' }}>
              Life.<br /><em style={{ fontWeight: 400 }}>Elevated.</em>
            </div>
            <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 17, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.55)', marginTop: 20 }}>
              A four-part transformation program. Work at your pace. Return as often as the work requires.
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 32px' }}>
          {parts.map((part, i) => {
            const locked = part.action === 'manifesto' && completedDims < 10
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 24,
                padding: '32px 0', borderBottom: '1px solid #ccc5b8', alignItems: 'start' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 52, fontWeight: 900,
                  lineHeight: 1, color: '#ccc5b8' }}>{part.num}</div>
                <div>
                  <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: locked ? '#ccc5b8' : '#888', marginBottom: 6, fontWeight: 700 }}>
                    Part {i + 1}
                  </div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px,3vw,32px)',
                    fontWeight: 700, color: locked ? '#ccc5b8' : '#080808', marginBottom: 4 }}>{part.title}</div>
                  <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 15, fontStyle: 'italic',
                    color: '#888', marginBottom: 12 }}>{part.sub}</div>
                  <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 15, color: '#4a4a4a',
                    lineHeight: 1.8, marginBottom: 20 }}>{part.desc}</div>

                  {part.action === 'dimensions' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, marginBottom: 20 }}>
                      {DIMENSIONS.map(d => {
                        const done = Object.values(reflections[d.id] || {}).some((v: any) => v.trim())
                        return (
                          <div key={d.id} onClick={() => router.push(`/dimension/${d.id}`)}
                            style={{ padding: '12px 10px', background: done ? '#080808' : '#faf8f4',
                              cursor: 'pointer', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 8,
                              color: done ? 'rgba(255,255,255,0.5)' : '#888', letterSpacing: '0.15em', marginBottom: 2 }}>{d.num}</div>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: 12, fontWeight: 700,
                              color: done ? '#ffffff' : '#080808' }}>{d.name}</div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {part.action && !locked && (
                    <button onClick={() => router.push(part.action === 'dimensions' ? `/dimension/${DIMENSIONS[0].id}` : '/manifesto')}
                      style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
                        letterSpacing: '0.26em', textTransform: 'uppercase', padding: '14px 32px',
                        background: '#080808', color: '#ffffff', border: '2px solid #080808', cursor: 'pointer' }}>
                      {part.action === 'dimensions'
                        ? `${completedDims === 0 ? 'Begin' : 'Continue'} the Dimensions`
                        : 'Craft Your Manifesto'}
                    </button>
                  )}
                  {locked && (
                    <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9,
                      letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ccc5b8' }}>
                      Complete all ten dimensions to unlock
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
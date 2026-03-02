'use client'
import { useRouter } from 'next/navigation'
import { useManifesto } from '@/lib/hooks'
import Nav from '@/components/Nav'

const ELEMENTS = [
  {
    title: 'Element One: The Life I Am Done Tolerating',
    prompt: 'Name, specifically and without softening, the aspects of your current life you are no longer willing to accept as permanent. The patterns. The defaults. The quiet neglects. Make it real.',
    placeholder: 'Write without softening. This is your honest starting line.'
  },
  {
    title: 'Element Two: The Values I Will Not Compromise',
    prompt: 'Name the three to five principles that are non-negotiable in the life you are building. The values you are willing to be inconvenienced and financially disadvantaged to protect.',
    placeholder: 'Name them precisely. Then commit to them completely.'
  },
  {
    title: 'Element Three: The Life I Am Committed to Building',
    prompt: 'Describe the elevated life in specific, personal terms. Write it in the present tense, as though it is already true. Make it specific enough to recognize.',
    placeholder: 'Write in the present tense. Be specific enough to recognize this life when you are living it.'
  },
  {
    title: 'Element Four: The Leader I Am Becoming',
    prompt: 'Describe the leader on the other side of this transformation. Not in terms of titles or results — in terms of character, presence, and impact.',
    placeholder: 'Write in the present tense. Describe the leader you are becoming, not the one you are performing.'
  },
  {
    title: 'Element Five: My Commitment',
    prompt: 'Write a single statement — your commitment to yourself. The private promise that this work represents a genuine turning point. Make it true.',
    placeholder: 'I commit to...'
  }
]

export default function ManifestoPage() {
  const router = useRouter()
  const { elements, saveManifesto } = useManifesto()

  const handleChange = (i: number, val: string) => {
    const updated = [...elements]
    updated[i] = val
    saveManifesto(updated)
  }

  return (
    <div style={{ fontFamily: 'Palatino Linotype, serif', background: '#ffffff', minHeight: '100vh' }}>
      <Nav />
      <div style={{ paddingTop: 60 }}>
        <div style={{ background: '#080808', padding: '64px 32px 56px' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
              Part Four — The Commitment
              <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }}></span>
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(44px,8vw,80px)',
              fontWeight: 900, lineHeight: 0.92, color: '#ffffff' }}>
              The<br /><em style={{ fontWeight: 400 }}>Manifesto.</em>
            </div>
            <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 17, fontStyle: 'italic',
              color: 'rgba(255,255,255,0.55)', marginTop: 20, maxWidth: 600 }}>
              This is where intention becomes declaration. Where reflection becomes commitment.
              Where the journey from drift to elevation becomes irreversible.
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '52px 32px 80px' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(20px,2.8vw,30px)',
            fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55, color: '#080808',
            borderLeft: '3px solid #080808', padding: '16px 28px', margin: '0 0 48px' }}>
            "The moment you write down who you are committed to becoming, you make it harder to pretend you do not know. That is the point."
          </div>

          {ELEMENTS.map((el, i) => (
            <div key={i} style={{ background: '#f5f2ec', padding: '36px 40px', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(18px,2.2vw,22px)',
                fontStyle: 'italic', fontWeight: 400, color: '#080808', marginBottom: 16 }}>
                {el.title}
              </div>
              <p style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 'clamp(15px,1.7vw,18px)',
                fontWeight: 300, lineHeight: 1.9, fontStyle: 'italic', color: '#4a4a4a', marginBottom: 16 }}>
                {el.prompt}
              </p>
              <textarea rows={4} value={elements[i] || ''} onChange={e => handleChange(i, e.target.value)}
                placeholder={el.placeholder}
                style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc5b8',
                  background: 'transparent', resize: 'none', outline: 'none',
                  fontFamily: 'Palatino Linotype, serif', fontSize: 16, fontWeight: 300,
                  fontStyle: 'italic', color: '#1c1c1c', lineHeight: 2, padding: '8px 0' }}
                onInput={e => {
                  const t = e.target as HTMLTextAreaElement
                  t.style.height = 'auto'
                  t.style.height = t.scrollHeight + 'px'
                }} />
            </div>
          ))}

          <div style={{ border: '2px solid #080808', padding: '48px 44px', marginTop: 48, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.28em', textTransform: 'uppercase', color: '#888', marginBottom: 20 }}>
              My Declaration of Elevation
            </div>
            <p style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 'clamp(17px,2vw,21px)',
              fontStyle: 'italic', fontWeight: 300, color: '#4a4a4a', lineHeight: 2,
              maxWidth: 580, margin: '0 auto 32px' }}>
              I have seen clearly where I am. I have named honestly what must change. I have defined
              with precision what I am building toward. From this day forward, I am the architect of
              this life — not its passenger. I choose intention over drift. Alignment over reaction.
              Elevation over adequacy.
            </p>
            <div style={{ width: 180, height: 1, background: '#080808', margin: '0 auto 10px' }}></div>
            <div style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 8,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888' }}>
              Signature · Date
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => router.push('/dashboard')} style={{
              fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.26em', textTransform: 'uppercase', padding: '14px 32px',
              background: '#080808', color: '#ffffff', border: '2px solid #080808', cursor: 'pointer'
            }}>Return to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  )
}
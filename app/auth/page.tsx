'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async () => {
    setErr('')
    if (!email || !pass) { setErr('Please complete all fields.'); return }
    if (mode === 'signup' && !name) { setErr('Please enter your name.'); return }
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email, password: pass,
        options: { data: { name } }
      })
      if (error) { setErr(error.message); setLoading(false); return }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
      if (error) { setErr('Invalid email or password.'); setLoading(false); return }
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontFamily: 'Gill Sans MT, Arial, sans-serif', fontSize: 9, fontWeight: 600,
          letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
          Elevate Your Results
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(44px,8vw,72px)',
          fontWeight: 900, lineHeight: 0.92, color: '#ffffff' }}>Life.</div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(38px,7vw,64px)',
          fontWeight: 400, fontStyle: 'italic', color: '#ffffff' }}>Elevated.</div>
        <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)', margin: '24px auto' }}></div>
        <div style={{ fontFamily: 'Palatino Linotype, serif', fontSize: 15, fontStyle: 'italic',
          color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
          A Complete Framework for Designing<br />the Life You Are Capable of Living
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: '40px 44px', maxWidth: 420, width: '100%' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #ccc5b8', marginBottom: 32 }}>
          {(['login', 'signup'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              fontFamily: 'Gill Sans MT, Arial, sans-serif', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase', background: 'none', border: 'none',
              cursor: 'pointer', padding: '12px 20px',
              color: mode === m ? '#080808' : '#888',
              borderBottom: mode === m ? '2px solid #080808' : '2px solid transparent',
              marginBottom: -1
            }}>
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {mode === 'signup' && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontFamily: 'Gill Sans MT, Arial, sans-serif', fontSize: 9, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 8, display: 'block' }}>
              Your Name
            </label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="First name"
              style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc5b8', outline: 'none',
                fontFamily: 'Palatino Linotype, serif', fontSize: 16, padding: '8px 0', background: 'transparent' }} />
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: 'Gill Sans MT, Arial, sans-serif', fontSize: 9, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 8, display: 'block' }}>
            Email
          </label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
            style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc5b8', outline: 'none',
              fontFamily: 'Palatino Linotype, serif', fontSize: 16, padding: '8px 0', background: 'transparent' }} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ fontFamily: 'Gill Sans MT, Arial, sans-serif', fontSize: 9, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888', marginBottom: 8, display: 'block' }}>
            Password
          </label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
            style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc5b8', outline: 'none',
              fontFamily: 'Palatino Linotype, serif', fontSize: 16, padding: '8px 0', background: 'transparent' }} />
        </div>

        {err && <div style={{ fontSize: 12, color: '#c0392b', marginBottom: 16, fontFamily: 'Gill Sans MT, sans-serif',
          letterSpacing: '0.08em' }}>{err}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', fontFamily: 'Gill Sans MT, Arial, sans-serif', fontSize: 9, fontWeight: 700,
          letterSpacing: '0.26em', textTransform: 'uppercase', padding: '14px 32px',
          background: '#080808', color: '#ffffff', border: '2px solid #080808', cursor: loading ? 'wait' : 'pointer'
        }}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Enter Your Journey' : 'Begin the Journey'}
        </button>

        <div style={{ marginTop: 24, fontFamily: 'Palatino Linotype, serif', fontSize: 13, fontStyle: 'italic',
          color: '#888', textAlign: 'center', lineHeight: 1.7 }}>
          Your reflections are saved privately and securely.<br />No one else can access your journal.
        </div>
      </div>
    </div>
  )
}

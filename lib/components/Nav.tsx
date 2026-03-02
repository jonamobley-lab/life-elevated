'use client'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const navItems = [
  { href: '/dashboard', label: 'Home' },
  { href: '/journey', label: 'Journey' },
  { href: '/practice', label: 'Practice' },
]

export default function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, height: 60,
      background: '#ffffff', borderBottom: '1px solid #ccc5b8',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 900 }}>Life.</span>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, fontStyle: 'italic', fontWeight: 400 }}>Elevated.</span>
        <span style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 8, color: '#888',
          letterSpacing: '0.2em', textTransform: 'uppercase', marginLeft: 8, alignSelf: 'center' }}>
          by Elevate Your Results
        </span>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {navItems.map(item => (
          <button key={item.href} onClick={() => router.push(item.href)} style={{
            fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase', background: 'none', border: 'none',
            cursor: 'pointer', padding: '3px 0',
            color: pathname === item.href ? '#080808' : '#888',
            borderBottom: pathname === item.href ? '2px solid #080808' : '2px solid transparent'
          }}>
            {item.label}
          </button>
        ))}
        <div style={{ width: 1, height: 16, background: '#ccc5b8' }}></div>
        <button onClick={handleLogout} style={{ fontFamily: 'Gill Sans MT, sans-serif', fontSize: 9,
          fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>
    </nav>
  )
}
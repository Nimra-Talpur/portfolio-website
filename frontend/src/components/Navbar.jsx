import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: scrolled ? 'rgba(13,13,13,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.35s ease'
    }}>
      <nav style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>

        {/* Logo */}
        <a href="#hero" style={{
          fontFamily: 'var(--font-display)', fontSize: '1.4rem',
          fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em'
        }}>
          N<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop nav */}
        <ul style={{
          display: 'flex', gap: '0.25rem',
          listStyle: 'none', margin: 0, padding: 0
        }} className="nav-desktop">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} style={{
                padding: '0.5rem 1rem', borderRadius: '20px',
                fontSize: '0.875rem', color: 'var(--text-secondary)',
                transition: 'color 0.2s, background 0.2s',
                display: 'block'
              }}
              onMouseEnter={e => {
                e.target.style.color = 'var(--text)'
                e.target.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.target.style.color = 'var(--text-secondary)'
                e.target.style.background = 'transparent'
              }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="nav-cta" style={{
          padding: '0.5rem 1.25rem',
          backgroundColor: 'var(--accent)', color: '#fff',
          borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600,
          fontFamily: 'var(--font-display)',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Hire me
        </a>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger"
          style={{
            display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text)', padding: '4px'
          }} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {menuOpen
              ? <><line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
              : <><line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: '#111', borderTop: '1px solid var(--border)',
          padding: '1rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem'
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              padding: '0.75rem 0', fontSize: '1rem',
              color: 'var(--text-secondary)',
              borderBottom: '1px solid var(--border)'
            }}>{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} style={{
            marginTop: '0.75rem', padding: '0.75rem',
            backgroundColor: 'var(--accent)', color: '#fff',
            borderRadius: '8px', textAlign: 'center',
            fontWeight: 600, fontFamily: 'var(--font-display)'
          }}>Hire me</a>
        </div>
      )}

      <style>{`
        @media (max-width: 680px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </header>
  )
}
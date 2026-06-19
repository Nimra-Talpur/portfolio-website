import { useEffect, useState } from 'react'
import myPhoto from '../assets/profile.jpeg'

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const roles = ['Full Stack Developer', 'MERN Stack Dev', 'Problem Solver']
  const [roleIdx, setRoleIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setRoleIdx(r => (r + 1) % roles.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? 45 : 80)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx])

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 2rem', position: 'relative', overflow: 'hidden',
      backgroundColor: 'var(--bg)'
    }}>
      {/* Background */}
      <div className="grid-bg" />
      <div className="orb orb-1" style={{ top: '-80px', right: '-60px' }} />
      <div className="orb orb-2" style={{ bottom: '80px', left: '-80px' }} />
      <div className="orb orb-3" style={{ top: '40%', right: '30%' }} />

      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: '3rem', alignItems: 'center',
        position: 'relative', zIndex: 1,
        paddingTop: '5rem'
      }} className="hero-grid">

        {/* Text */}
        <div>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: '1px solid var(--border)', borderRadius: '20px',
            padding: '0.35rem 1rem', marginBottom: '2rem',
            backgroundColor: 'rgba(255,255,255,0.03)'
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              boxShadow: '0 0 8px var(--accent)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              Available for opportunities
            </span>
          </div>

          <p style={{
            fontSize: '0.85rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent)',
            fontWeight: 600, marginBottom: '0.75rem',
            fontFamily: 'var(--font-display)'
          }}>Hello! 👋</p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 800, lineHeight: 1.08,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            I'm <span style={{ color: 'var(--accent)' }}>Nimra</span>,<br />
            <span style={{ color: 'var(--text)' }}>{displayed}</span>
            <span style={{
              color: 'var(--accent)', fontWeight: 300,
              animation: 'blink 1s step-end infinite'
            }}>|</span>
          </h1>

          <p style={{
            fontSize: '1rem', color: 'var(--text-secondary)',
            maxWidth: '440px', lineHeight: 1.8, marginBottom: '2.5rem'
          }}>
            Building clean, performant web apps from database to interface. Currently on my full stack internship journey.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#work" style={{
              padding: '0.85rem 2rem',
              backgroundColor: 'var(--accent)', color: '#fff',
              borderRadius: '30px', fontSize: '0.9rem', fontWeight: 700,
              fontFamily: 'var(--font-display)',
              boxShadow: '0 0 24px rgba(255,107,43,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 0 36px rgba(255,107,43,0.5)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 0 24px rgba(255,107,43,0.35)'
            }}>
              Portfolio ↗
            </a>
            <a href="#contact" style={{
              padding: '0.85rem 2rem',
              border: '1px solid var(--border)', color: 'var(--text)',
              borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600,
              fontFamily: 'var(--font-display)',
              transition: 'border-color 0.2s, background 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'transparent'
            }}>
              Hire me
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '2.5rem', marginTop: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { num: '10+', label: 'Projects built' },
              { num: '3+', label: 'Months experience' },
              { num: '100%', label: 'Dedication' }
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)' }}>{s.num}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo circle */}
        <div className="hero-photo" style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent) 0%, #ff9500 100%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            overflow: 'hidden', position: 'relative',
            boxShadow: '0 0 60px rgba(255,107,43,0.3)'
          }}>
        
             <img
              src={myPhoto}
             alt="Nimra"
                style={{
               width: '100%',
                height: '100%',
                objectFit: 'cover',
               objectPosition: 'top'
  }}
/>
          
            
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 8px var(--accent)} 50%{box-shadow:0 0 16px var(--accent)} }
        @media (max-width: 720px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo { display: none !important; }
        }
      `}</style>
    </section>
  )
}
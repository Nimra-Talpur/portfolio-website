import { useEffect, useState, useRef } from 'react'
import myPhoto from '../assets/profile.jpeg'

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const imgRef = useRef(null)
  const [imgVisible, setImgVisible] = useState(false)

  const roles = ['Full Stack Developer', 'MERN Stack Dev', 'Problem Solver']

  // Typing animation
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

  // Image reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => setImgVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--bg)'
    }}>
      {/* Background */}
      <div className="grid-bg" />
      <div className="orb orb-1" style={{ top: '-80px', right: '-60px' }} />
      <div className="orb orb-2" style={{ bottom: '80px', left: '-80px' }} />

      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '4rem',
        alignItems: 'center',
        paddingTop: '5rem'
      }} className="hero-grid">

        {/* ── LEFT: text ── */}
        <div>
          {/* Available badge */}
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
            <span style={{
              fontSize: '0.8rem', color: 'var(--text-secondary)',
              letterSpacing: '0.05em'
            }}>Available for opportunities</span>
          </div>

          <p style={{
            fontSize: '0.85rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--accent)',
            fontWeight: 600, marginBottom: '0.75rem',
            fontFamily: 'var(--font-display)'
          }}>Hello! 👋</p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
            marginBottom: '1rem'
          }}>
            I'm <span style={{ color: 'var(--accent)' }}>Nimra Talpur</span>,<br />
            <span>{displayed}</span>
            <span style={{
              color: 'var(--accent)',
              animation: 'blink 1s step-end infinite'
            }}>|</span>
          </h1>

          <p style={{
            fontSize: '1rem', color: 'var(--text-secondary)',
            maxWidth: '420px', lineHeight: 1.8, marginBottom: '2.5rem'
          }}>
            Building clean, performant web apps from database to interface.
            Currently on my full stack internship journey.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#work" style={{
              padding: '0.85rem 2rem',
              backgroundColor: 'var(--accent)', color: '#fff',
              borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600,
              fontFamily: 'var(--font-display)',
              boxShadow: '0 0 24px rgba(255,107,43,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 36px rgba(255,107,43,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(255,107,43,0.35)'
            }}>
              View work ↗
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
            display: 'flex', gap: '2.5rem',
            marginTop: '3rem', flexWrap: 'wrap'
          }}>
            {[
              { num: '10+', label: 'Projects built' },
              { num: '3+', label: 'Months experience' },
              { num: '100%', label: 'Dedication' }
            ].map(s => (
              <div key={s.label}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem', fontWeight: 600,
                  color: 'var(--text)', lineHeight: 1
                }}>{s.num}</p>
                <p style={{
                  fontSize: '0.73rem', color: 'var(--text-secondary)',
                  marginTop: '0.2rem'
                }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: photo card ── */}
        <div ref={imgRef} className="hero-photo-wrap" style={{
          position: 'relative',
          flexShrink: 0,
          width: '260px'
        }}>
          {/* Top-left corner bracket */}
          <div style={{
            position: 'absolute',
            top: '-10px', left: '-10px',
            width: '36px', height: '36px',
            borderTop: '2px solid var(--accent)',
            borderLeft: '2px solid var(--accent)',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translate(0,0)' : 'translate(6px,6px)',
            transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s',
            zIndex: 2,
            pointerEvents: 'none'
          }} />

          {/* Bottom-right corner bracket */}
          <div style={{
            position: 'absolute',
            bottom: '-10px', right: '-10px',
            width: '36px', height: '36px',
            borderBottom: '2px solid var(--accent)',
            borderRight: '2px solid var(--accent)',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translate(0,0)' : 'translate(-6px,-6px)',
            transition: 'opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s',
            zIndex: 2,
            pointerEvents: 'none'
          }} />

          {/* Main photo card — hover triggers zoom on img */}
          <div
            onMouseEnter={e => {
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1.07)'
            }}
            onMouseLeave={e => {
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1)'
            }}
            style={{
              width: '260px',
              height: '360px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              clipPath: imgVisible
                ? 'inset(0% 0% 0% 0% round 16px)'
                : 'inset(0% 0% 100% 0% round 16px)',
              transition: 'clip-path 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s'
            }}
          >
            <img
              src={myPhoto}
              alt="Nimra Talpur"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                transform: 'scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
              }}
            />

            {/* Bottom gradient overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(13,13,13,0.75), transparent)',
              pointerEvents: 'none'
            }} />

            {/* Shimmer sweep on load */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
              transform: imgVisible ? 'translateX(200%)' : 'translateX(-100%)',
              transition: 'transform 0.9s ease 0.4s',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Floating name tag */}
          <div style={{
            position: 'absolute',
            bottom: '16px', left: '16px', right: '16px',
            backgroundColor: 'rgba(13,13,13,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '0.65rem 0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 1.1s, transform 0.5s ease 1.1s',
            zIndex: 3,
            pointerEvents: 'none'
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem', fontWeight: 600,
                color: 'var(--text)', lineHeight: 1
              }}>Nimra Talpur</p>
              <p style={{
                fontSize: '0.7rem', color: 'var(--text-secondary)',
                marginTop: '3px'
              }}>Full Stack Dev</p>
            </div>
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4ade80',
              boxShadow: '0 0 8px #4ade80'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse {
          0%,100%{ box-shadow: 0 0 8px var(--accent); }
          50%{ box-shadow: 0 0 18px var(--accent); }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-photo-wrap {
            width: 100% !important;
            display: flex;
            justify-content: center;
          }
          .hero-photo-wrap > div:nth-child(3) {
            width: 220px !important;
            height: 300px !important;
          }
        }
      `}</style>
    </section>
  )
}
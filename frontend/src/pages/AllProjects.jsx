import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALL_PROJECTS, ProjectRow } from '../components/Projects'
import Footer from '../components/Footer'

export default function AllProjects() {
  const navigate = useNavigate()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

      {/* Page hero */}
      <div style={{
        padding: '8rem 2rem 3rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="orb orb-1" style={{ top: '-80px', right: '-60px', opacity: 0.5 }} />
        <div className="grid-bg" />

        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: '1px solid var(--border)',
              borderRadius: '20px', padding: '0.45rem 1rem',
              color: 'var(--text-secondary)', fontSize: '0.82rem',
              fontFamily: 'var(--font-body)', cursor: 'pointer',
              marginBottom: '2rem',
              transition: 'border-color 0.2s, color 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            ← Back to home
          </button>

          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--accent)',
            marginBottom: '0.5rem', fontWeight: 500,
            fontFamily: 'var(--font-body)'
          }}>All work</p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap', gap: '1rem'
          }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 600, color: 'var(--text)',
              letterSpacing: '-0.01em', lineHeight: 1.05,
              margin: 0
            }}>All Projects</h1>
            <p style={{
              fontSize: '0.88rem', color: 'var(--text-secondary)',
              fontFamily: 'var(--font-body)'
            }}>
              {ALL_PROJECTS.length} projects total
            </p>
          </div>
        </div>
      </div>

      {/* All projects list */}
      <div style={{ padding: '2rem 2rem 5rem' }}>
        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto'
        }}>
          {ALL_PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
          <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 680px) {
          .project-inner {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  )
}
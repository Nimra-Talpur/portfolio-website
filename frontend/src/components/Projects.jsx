import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Projects() {
  const [projects, setProjects] = useState([])

useEffect(() => {
  axios.get('http://localhost:5000/api/projects')
    .then(res => {
      console.log('Projects received:', res.data)
      setProjects(res.data)
    })
    .catch(err => console.log('Error:', err))
}, [])

  return (
    <section id="work" style={{
      padding: 'var(--section-pad)',
      position: 'relative', overflow: 'hidden'
    }}>
      <div className="orb orb-2" style={{ top: '10%', right: '-100px', opacity: 0.6 }} />

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>My work</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Selected Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="reveal" style={{
            padding: '4rem 2rem', border: '1px dashed rgba(255,107,43,0.3)',
            borderRadius: '16px', textAlign: 'center',
            background: 'rgba(255,107,43,0.03)'
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.5rem' }}>No projects yet</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Add projects via the backend API to see them here.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}>
            {projects.map((project, i) => (
              <div key={project._id} className="reveal" style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px', padding: '1.75rem',
                transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s',
                cursor: 'default'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(255,107,43,0.4)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,107,43,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{
                    fontSize: '0.7rem', fontFamily: 'var(--font-display)',
                    color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em'
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-secondary)', fontSize: '0.75rem',
                        transition: 'border-color 0.2s, color 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
                        GH
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        backgroundColor: 'var(--accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '0.8rem',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        ↗
                      </a>
                    )}
                  </div>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                  fontWeight: 700, color: 'var(--text)', marginBottom: '0.6rem'
                }}>{project.title}</h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.techStack.map((tech, j) => (
                    <span key={j} style={{
                      fontSize: '0.72rem', padding: '0.25rem 0.65rem',
                      backgroundColor: 'var(--accent-muted)',
                      border: '1px solid rgba(255,107,43,0.2)',
                      borderRadius: '20px', color: 'var(--accent)',
                      fontWeight: 500, letterSpacing: '0.03em'
                    }}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
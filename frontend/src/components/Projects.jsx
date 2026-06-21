import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const [entered, setEntered] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setEntered(true), index * 150)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} style={{ position: 'relative' }}>

      {/* Animated top border line */}
      <div style={{
        height: '1px',
        backgroundColor: 'var(--accent)',
        width: entered ? '100%' : '0%',
        transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s`,
        marginBottom: '0'
      }} />

      {/* Row content */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '2.5rem 0',
          backgroundColor: hovered ? 'rgba(255,107,43,0.04)' : 'transparent',
          transition: 'background-color 0.3s ease',
          opacity: entered ? 1 : 0,
          transform: entered
            ? 'translateX(0) translateY(0)'
            : 'translateX(-60px) translateY(10px)',
          transition: `
            opacity 0.7s ease ${index * 0.15}s,
            transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s,
            background-color 0.3s ease
          `
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }} className="project-inner">

          {/* LEFT */}
          <div>
            {/* Big index number */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 600,
                color: hovered ? 'var(--accent)' : 'rgba(255,255,255,0.07)',
                lineHeight: 1,
                transition: 'color 0.35s ease',
                userSelect: 'none'
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: '0.68rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--accent)',
                fontFamily: 'var(--font-body)', fontWeight: 500,
              }}>Project</span>
            </div>

            {/* Title */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                fontWeight: 600,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                margin: 0
              }}>
                {project.title}
              </h2>
              {/* Underline wipe */}
              <div style={{
                position: 'absolute',
                bottom: '-3px', left: 0,
                height: '1.5px',
                width: hovered ? '100%' : '0%',
                backgroundColor: 'var(--accent)',
                transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)'
              }} />
            </div>

            {/* Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.techStack.map((tech, j) => (
                <span key={j} style={{
                  padding: '0.28rem 0.75rem',
                  border: `1px solid ${hovered ? 'rgba(255,107,43,0.35)' : 'var(--border)'}`,
                  borderRadius: '30px',
                  fontSize: '0.73rem',
                  color: hovered ? 'var(--text)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  transition: 'border-color 0.3s, color 0.3s'
                }}>{tech}</span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ paddingTop: '0.5rem' }}>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.85,
              marginBottom: '1.75rem'
            }}>{project.description}</p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer"
                  style={{
                    padding: '0.55rem 1.3rem',
                    border: '1px solid var(--border)',
                    borderRadius: '30px', fontSize: '0.82rem',
                    color: 'var(--text)', fontFamily: 'var(--font-body)',
                    transition: 'border-color 0.2s, color 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text)'
                  }}>
                  GitHub ↗
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer"
                  style={{
                    padding: '0.55rem 1.3rem',
                    backgroundColor: 'var(--accent)',
                    borderRadius: '30px', fontSize: '0.82rem',
                    color: '#fff', fontFamily: 'var(--font-body)',
                    boxShadow: '0 0 16px rgba(255,107,43,0.25)',
                    transition: 'opacity 0.2s, transform 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = '0.85'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}>
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.log('Error:', err))
  }, [])

  return (
    <section id="work" style={{
      padding: '5rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="orb orb-2" style={{ top: '10%', right: '-100px', opacity: 0.45 }} />

      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.73rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--accent)',
            marginBottom: '0.4rem', fontWeight: 500,
            fontFamily: 'var(--font-body)'
          }}>My work</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600, color: 'var(--text)'
          }}>Selected Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div style={{
            padding: '3rem 2rem',
            border: '1px dashed rgba(255,107,43,0.3)',
            borderRadius: '16px', textAlign: 'center'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem', color: 'var(--text)',
              marginBottom: '0.4rem'
            }}>No projects yet</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Seed the database to see projects here.
            </p>
          </div>
        ) : (
          <div>
            {projects.map((p, i) => (
              <ProjectRow key={p._id} project={p} index={i} />
            ))}
            {/* Final bottom line */}
            <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 680px) {
          .project-inner {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  )
}
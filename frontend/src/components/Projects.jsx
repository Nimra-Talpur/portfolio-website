import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export const ALL_PROJECTS = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A full stack personal portfolio built with the MERN stack. Features a contact form, animated UI, scroll-based interactions, and a clean dark theme.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '2',
    title: 'Eldora Skin',
    description: 'A luxury skincare e-commerce platform with product catalog, user authentication, cart system, and an AI-powered skin analyzer using OpenCV and DeepFace.',
    techStack: ['Python', 'Flask', 'PostgreSQL', 'OpenCV'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '3',
    title: 'Task Manager App',
    description: 'A productivity app with drag-and-drop task boards, priority labels, due dates, and real-time status updates. Built with a RESTful backend.',
    techStack: ['React', 'Node.js', 'MongoDB', 'CSS3'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'A real-time weather app with location search, 7-day forecast, animated weather icons, and dynamic backgrounds based on conditions.',
    techStack: ['React', 'OpenWeather API', 'CSS3'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '5',
    title: 'E-Commerce Store',
    description: 'A full-featured online store with product filtering, cart management, checkout flow, and admin dashboard for inventory management.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '6',
    title: 'Blog Platform',
    description: 'A markdown-based blogging platform with rich text editor, categories, tags, comment system and user authentication.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Markdown'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '7',
    title: 'Chat Application',
    description: 'A real-time messaging app with private rooms, online status indicators, typing indicators, and emoji support using Socket.io.',
    techStack: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '8',
    title: 'Recipe Finder',
    description: 'A recipe discovery app with ingredient-based search, dietary filters, nutrition info, save favorites, and step-by-step cooking mode.',
    techStack: ['React', 'Spoonacular API', 'CSS3'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '9',
    title: 'Student Grade Tracker',
    description: 'A web app for students to log grades, calculate GPA, track progress over semesters, and generate performance reports.',
    techStack: ['React', 'Flask', 'PostgreSQL', 'Chart.js'],
    githubLink: '',
    liveLink: ''
  },
  {
    id: '10',
    title: 'Expense Tracker',
    description: 'A personal finance tracker with income/expense logging, category breakdowns, monthly summaries, and visual charts.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Recharts'],
    githubLink: '',
    liveLink: ''
  }
]

function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const [entered, setEntered] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setEntered(true), index * 120)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{
        height: '1px',
        backgroundColor: 'var(--accent)',
        width: entered ? '100%' : '0%',
        transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
      }} />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '2.5rem 0',
          backgroundColor: hovered ? 'rgba(255,107,43,0.04)' : 'transparent',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateX(0)' : 'translateX(-50px)',
          transition: `
            opacity 0.65s ease ${index * 0.12}s,
            transform 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s,
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
            <div style={{
              display: 'flex', alignItems: 'baseline',
              gap: '0.75rem', marginBottom: '0.75rem'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                color: hovered ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
                lineHeight: 1,
                transition: 'color 0.35s ease',
                userSelect: 'none'
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: '0.68rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'var(--accent)',
                fontFamily: 'var(--font-body)', fontWeight: 500
              }}>Project</span>
            </div>

            <div style={{
              position: 'relative',
              display: 'inline-block',
              marginBottom: '1.25rem'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
                fontWeight: 600,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                margin: 0
              }}>
                {project.title}
              </h2>
              <div style={{
                position: 'absolute',
                bottom: '-3px', left: 0,
                height: '1.5px',
                width: hovered ? '100%' : '0%',
                backgroundColor: 'var(--accent)',
                transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)'
              }} />
            </div>

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
                    transition: 'border-color 0.2s, color 0.2s',
                    textDecoration: 'none'
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
                    transition: 'opacity 0.2s, transform 0.2s',
                    textDecoration: 'none'
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

export { ProjectRow }

export default function Projects() {
  const navigate = useNavigate()
  const preview = ALL_PROJECTS.slice(0, 3)

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

        <div>
          {preview.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
          <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
        </div>

        {/* See More button */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          marginTop: '3rem'
        }}>
          <button
            onClick={() => navigate('/projects')}
            style={{
              padding: '0.9rem 2.5rem',
              border: '1px solid var(--border)',
              borderRadius: '30px',
              backgroundColor: 'transparent',
              color: 'var(--text)',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.background = 'rgba(255,107,43,0.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            See all projects
            <span style={{ fontSize: '1rem' }}>→</span>
          </button>
        </div>
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
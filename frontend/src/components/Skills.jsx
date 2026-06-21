import { useEffect, useRef, useState } from 'react'

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
    }}>{children}</div>
  )
}

export default function Skills() {
  const skills = [
    { category: 'Frontend', items: ['React', 'HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design', 'Vite'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Middleware', 'Authentication'] },
    { category: 'Database', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'CRUD Operations'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'npm'] }
  ]

  const [hoveredPill, setHoveredPill] = useState(null)

  return (
    <section id="skills" style={{
      padding: '6rem 2rem',
      backgroundColor: '#0a0a0a',
      position: 'relative', overflow: 'hidden'
    }}>
      <div className="orb orb-1" style={{ bottom: '-100px', left: '-100px', opacity: 0.4 }} />

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <AnimatedSection delay={0}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 500, fontFamily: 'var(--font-body)' }}>What I know</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--text)', marginBottom: '4rem' }}>Skills & Tools</h2>
        </AnimatedSection>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {skills.map((group, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: '2rem',
                padding: '2.5rem 0',
                borderTop: '1px solid var(--border)',
                alignItems: 'start'
              }} className="skill-row">

                {/* Category */}
                <div>
                  <p style={{
                    fontSize: '0.72rem', letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--text-secondary)',
                    fontWeight: 500, fontFamily: 'var(--font-body)',
                    paddingTop: '0.3rem'
                  }}>{group.category}</p>
                </div>

                {/* Animated pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.items.map((skill, j) => {
                    const key = `${i}-${j}`
                    const isHovered = hoveredPill === key
                    return (
                      <span key={j}
                        onMouseEnter={() => setHoveredPill(key)}
                        onMouseLeave={() => setHoveredPill(null)}
                        style={{
                          padding: '0.45rem 1.1rem',
                          border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
                          borderRadius: '30px',
                          fontSize: '0.85rem',
                          color: isHovered ? 'var(--accent)' : 'var(--text)',
                          background: isHovered ? 'var(--accent-muted)' : 'transparent',
                          fontFamily: 'var(--font-body)',
                          cursor: 'default',
                          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                          transition: 'all 0.2s ease',
                          opacity: 0,
                          animation: `fadeSlideIn 0.4s ease forwards`,
                          animationDelay: `${i * 0.1 + j * 0.06}s`
                        }}>
                        {skill}
                      </span>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 560px) {
          .skill-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </section>
  )
}
export default function Skills() {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'REST APIs', 'Middleware', 'Authentication']
    },
    {
      category: 'Database',
      items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'CRUD Operations']
    },
    {
      category: 'Tools & Workflow',
      items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'npm']
    }
  ]

  return (
    <section id="skills" style={{
      padding: 'var(--section-pad)',
      backgroundColor: '#0a0a0a',
      position: 'relative', overflow: 'hidden'
    }}>
      <div className="orb orb-1" style={{ bottom: '-100px', left: '-100px', opacity: 0.4 }} />

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <p style={{
            fontSize: '0.75rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--accent)',
            marginBottom: '0.5rem', fontWeight: 500,
            fontFamily: 'var(--font-body)'
          }}>What I work with</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 600, color: 'var(--text)',
            letterSpacing: '0.01em'
          }}>Skills & Tools</h2>
        </div>

        {/* Skill rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {skills.map((group, i) => (
            <div key={i} className="reveal" style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: '1.5rem',
              alignItems: 'start',
              padding: '2rem 0',
              borderTop: '1px solid var(--border)'
            }} className="reveal skill-row">
              {/* Category label */}
              <p style={{
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                paddingTop: '0.2rem',
                fontFamily: 'var(--font-body)'
              }}>
                {group.category}
              </p>

              {/* Pills */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '0.5rem'
              }}>
                {group.items.map((skill, j) => (
                  <span key={j} style={{
                    padding: '0.4rem 1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '30px',
                    fontSize: '0.85rem',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                    cursor: 'default'
                  }}
                  onMouseEnter={e => {
                    e.target.style.borderColor = 'var(--accent)'
                    e.target.style.color = 'var(--accent)'
                    e.target.style.background = 'var(--accent-muted)'
                  }}
                  onMouseLeave={e => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.color = 'var(--text)'
                    e.target.style.background = 'transparent'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .skill-row { grid-template-columns: 1fr !important; gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  )
}
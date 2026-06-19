export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem',
      backgroundColor: '#0a0a0a'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)' }}>
          N<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Built with MERN Stack · {new Date().getFullYear()} · Nimra
        </span>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          {['GitHub', 'LinkedIn'].map(s => (
            <a key={s} href="#" style={{
              fontSize: '0.8rem', color: 'var(--text-secondary)',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
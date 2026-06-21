import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

function RevealText({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <div style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity 0.5s ease ${delay}s`
      }}>{children}</div>
    </div>
  )
}

function MagneticButton({ children, onClick, type = 'button', disabled, style }) {
  const ref = useRef(null)
  const onMouseMove = (e) => {
    const btn = ref.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }
  return (
    <button ref={ref} type={type} disabled={disabled}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s'
      }}>
      {children}
    </button>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '1rem 0',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === name ? 'var(--accent)' : 'var(--border)'}`,
    fontSize: '0.95rem', color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  })

  return (
    <section id="contact" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-1" style={{ top: '-60px', right: '-60px', opacity: 0.35 }} />

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Big heading reveal */}
        <div style={{ marginBottom: '5rem' }}>
          <RevealText delay={0}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem', fontWeight: 500, fontFamily: 'var(--font-body)' }}>Let's talk</p>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
              Have an idea?<br />
              <span style={{ color: 'var(--accent)' }}>Let's build it.</span>
            </h2>
          </RevealText>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '6rem', alignItems: 'start'
        }} className="contact-grid">

          {/* Left info */}
          <div>
            <RevealText delay={0.2}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
                Open to internship opportunities, freelance projects, and interesting collaborations. I respond within 24 hours.
              </p>
            </RevealText>

            {[
              { icon: '📧', label: 'nimra@email.com' },
              { icon: '📍', label: 'Hyderabad, Pakistan' },
              { icon: '💼', label: 'Open to work' }
            ].map((item, i) => (
              <RevealText key={i} delay={0.25 + i * 0.08}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    backgroundColor: 'var(--accent-muted)',
                    border: '1px solid rgba(255,107,43,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', flexShrink: 0
                  }}>{item.icon}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                </div>
              </RevealText>
            ))}
          </div>

          {/* Form — underline style */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-grid">
              <div>
                <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                  style={inputStyle('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                  style={inputStyle('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)} />
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows="4"
                placeholder="What's on your mind?"
                style={{ ...inputStyle('message'), resize: 'none' }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)} />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <MagneticButton type="submit" disabled={loading} style={{
                padding: '1rem 2.5rem',
                backgroundColor: 'var(--accent)',
                color: '#fff', border: 'none',
                borderRadius: '30px',
                fontSize: '0.9rem', fontWeight: 600,
                fontFamily: 'var(--font-display)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 0 24px rgba(255,107,43,0.3)'
              }}>
                {loading ? 'Sending...' : 'Send message →'}
              </MagneticButton>
            </div>

            {status === 'success' && (
              <p style={{ fontSize: '0.875rem', color: '#4ade80', marginTop: '1rem' }}>✅ Sent! I'll reply within 24 hours.</p>
            )}
            {status === 'error' && (
              <p style={{ fontSize: '0.875rem', color: '#f87171', marginTop: '1rem' }}>❌ Something went wrong. Try again.</p>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  )
}
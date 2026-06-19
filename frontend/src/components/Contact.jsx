import { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

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

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.1rem',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '10px', fontSize: '0.9rem',
    color: 'var(--text)', fontFamily: 'var(--font-body)',
    outline: 'none', transition: 'border-color 0.2s'
  }

  return (
    <section id="contact" style={{
      padding: 'var(--section-pad)',
      position: 'relative', overflow: 'hidden'
    }}>
      <div className="orb orb-1" style={{ top: '-60px', right: '-60px', opacity: 0.4 }} />

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem', alignItems: 'start'
        }}>
          {/* Left */}
          <div className="reveal">
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>Let's talk</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Get in touch</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '340px', marginBottom: '2rem' }}>
              Open to internship opportunities, freelance projects, and interesting collaborations. I respond within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: '📧', label: 'nimra@email.com' },
                { icon: '📍', label: 'Pakistan' },
                { icon: '💼', label: 'Open to work' }
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    backgroundColor: 'var(--accent-muted)',
                    border: '1px solid rgba(255,107,43,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', flexShrink: 0
                  }}>{item.icon}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="reveal" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid">
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows="5"
                placeholder="What's on your mind?"
                style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              padding: '0.9rem 2rem', alignSelf: 'flex-start',
              backgroundColor: 'var(--accent)', color: '#fff',
              border: 'none', borderRadius: '30px',
              fontSize: '0.9rem', fontWeight: 700,
              fontFamily: 'var(--font-display)', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 0 20px rgba(255,107,43,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 32px rgba(255,107,43,0.5)' }}}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 20px rgba(255,107,43,0.3)' }}>
              {loading ? 'Sending...' : 'Send message →'}
            </button>

            {status === 'success' && <p style={{ fontSize: '0.875rem', color: '#4ade80' }}>✅ Message sent — I'll reply soon!</p>}
            {status === 'error' && <p style={{ fontSize: '0.875rem', color: '#f87171' }}>❌ Something went wrong. Please try again.</p>}

            <style>{`
              @media (max-width: 480px) { .form-grid { grid-template-columns: 1fr !important; } }
            `}</style>
          </form>
        </div>
      </div>
    </section>
  )
}
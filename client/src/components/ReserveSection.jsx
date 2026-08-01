/**
 * ReserveSection — Section 7: Reserve Your VYRON X
 * VYRON X: Exclusive reservation CTA with form
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ReserveSection = () => {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', country: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reserve-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Submission failed');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #2A2A32',
    padding: '1rem 0',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '1rem',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    color: '#8B8FA8',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.25rem',
  };

  return (
    <section
      ref={sectionRef}
      id="reserve"
      style={{ background: '#0D0D12', paddingTop: '8rem', paddingBottom: '8rem', position: 'relative', overflow: 'hidden' }}
    >
      <div className="container">
      <div className="reserve-content" style={{ opacity: 0 }}>
        {/* Background electric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,102,255,0.06) 0%, transparent 60%)' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#0066FF]" />
                <span className="section-label">Reservation</span>
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  lineHeight: '1.0',
                  marginBottom: '2rem',
                }}
              >
                SECURE YOUR VYRON X
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#8B8FA8',
                  marginBottom: '3rem',
                }}
              >
                Production is limited to 250 units worldwide. A fully refundable reservation secures your position in the delivery queue. First deliveries begin Q3 2026.
              </p>

              {/* Reservation details */}
              <div className="space-y-0">
                {[
                  { label: 'Production Units', value: '250 Worldwide' },
                  { label: 'Reservation Deposit', value: '$25,000 USD' },
                  { label: 'First Deliveries', value: 'Q3 2026' },
                  { label: 'Starting Price', value: '$2,400,000 USD' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-4"
                    style={{ borderBottom: '1px solid #2A2A32' }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        color: '#8B8FA8',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '1rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        color: '#ffffff',
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-start justify-center h-full gap-6">
                  <div
                    className="h-px w-16 bg-[#0066FF]"
                    style={{ animation: 'none' }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      lineHeight: '1.0',
                    }}
                  >
                    RESERVATION RECEIVED
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1rem',
                      lineHeight: '1.8',
                      color: '#8B8FA8',
                    }}
                  >
                    Welcome to the VYRON X family. Our team will contact you within 48 hours to confirm your reservation and discuss configuration options.
                  </p>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      color: '#0066FF',
                      textTransform: 'uppercase',
                    }}
                  >
                    Confirmation sent to {form.email}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#0066FF'}
                      onBlur={e => e.target.style.borderBottomColor = '#2A2A32'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#0066FF'}
                      onBlur={e => e.target.style.borderBottomColor = '#2A2A32'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Country of Delivery</label>
                    <input
                      type="text"
                      required
                      placeholder="United States"
                      value={form.country}
                      onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = '#0066FF'}
                      onBlur={e => e.target.style.borderBottomColor = '#2A2A32'}
                    />
                  </div>

                  <div className="pt-4">
                    {error && (
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.8rem',
                          color: '#ff5555',
                          marginBottom: '1rem',
                          padding: '0.75rem 1rem',
                          border: '1px solid rgba(255,85,85,0.3)',
                          background: 'rgba(255,85,85,0.08)',
                        }}
                      >
                        {error}
                      </div>
                    )}
                    <button type="submit" disabled={submitting} className="btn-vyron w-full justify-center" style={{ padding: '1.25rem 2.5rem', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'wait' : 'pointer' }}>
                      <span>{submitting ? 'Submitting...' : 'Secure My Allocation'}</span>
                      <span style={{ fontSize: '1.1rem' }}>{submitting ? '…' : '→'}</span>
                    </button>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.75rem',
                        color: '#8B8FA8',
                        marginTop: '1rem',
                        lineHeight: '1.6',
                      }}
                    >
                      Allocation is subject to availability. Your deposit is fully refundable prior to production confirmation. VYRON X reserves the right to adjust specifications.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReserveSection;

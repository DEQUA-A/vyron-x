/**
 * Footer — VYRON X
 * Electric Obsidian: Minimal, data-rich footer
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: '#0A0A0C', borderTop: '1px solid #2A2A32', paddingTop: '4rem', paddingBottom: '3rem' }}
    >
      <div className="container">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-1 mb-4">
              <span
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em', fontSize: '1.5rem', color: '#ffffff' }}
              >
                VYRON
              </span>
              <span
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em', fontSize: '1.5rem', color: '#0066FF' }}
              >
                X
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                lineHeight: '1.7',
                color: '#8B8FA8',
              }}
            >
              The future of electric performance. Engineered for those who demand the extraordinary.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Vehicle',
              links: ['Performance', 'Technology', 'Interior', 'Configure'],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Press', 'Investors'],
            },
            {
              title: 'Support',
              links: ['Contact', 'Dealers', 'Service', 'Warranty'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.8rem',
                        color: '#8B8FA8',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={e => e.target.style.color = '#ffffff'}
                      onMouseLeave={e => e.target.style.color = '#8B8FA8'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid #2A2A32' }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: '#8B8FA8',
              textTransform: 'uppercase',
            }}
          >
            © {year} VYRON X Electric Performance Division. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: '#8B8FA8',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.color = '#0066FF'}
                onMouseLeave={e => e.target.style.color = '#8B8FA8'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


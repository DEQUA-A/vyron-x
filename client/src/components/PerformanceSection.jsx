/**
 * PerformanceSection — Section 5: Key Performance Stats
 * VYRON X: Full-bleed cinematic stats with GlitchText
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchText from './GlitchText';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '1.7', unit: 'sec', label: '0 to 100 km/h', sublabel: 'Faster than a blink' },
  { value: '380', unit: 'km/h', label: 'Top Speed', sublabel: 'Electronically limited' },
  { value: '1800', unit: 'hp', label: 'Peak Power', sublabel: 'Quad-motor combined' },
  { value: '620', unit: 'km', label: 'Range', sublabel: 'WLTP certified' },
];

const PerformanceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.perf-stat',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      );

      gsap.fromTo('.perf-divider',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="specs"
      style={{ background: '#0D0D12', paddingTop: '8rem', paddingBottom: '8rem', position: 'relative', overflow: 'hidden' }}
    >
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#0066FF]" />
            <span className="section-label">Performance Figures</span>
          </div>
          <GlitchText
            speed={0.8}
            enableShadows={true}
            enableOnHover={true}
            className="text-left"
          >
            THE NUMBERS
          </GlitchText>
        </div>

        {/* Electric divider */}
        <div
          className="perf-divider h-px mb-16"
          style={{ background: 'linear-gradient(90deg, #0066FF, transparent)', transform: 'scaleX(0)' }}
        />

        {/* Titanium rule */}
        <div className="titanium-rule mb-16" />

      {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className="perf-stat"
              style={{
                opacity: 0,
                padding: '2.5rem 0',
                borderRight: i < stats.length - 1 ? '1px solid #2A2A32' : 'none',
                paddingRight: i < stats.length - 1 ? '2.5rem' : '0',
                paddingLeft: i > 0 ? '2.5rem' : '0',
              }}
            >
              {/* Value */}
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                  letterSpacing: '0.02em',
                  lineHeight: '0.9',
                  color: '#ffffff',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.value}
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '0.3em',
                    letterSpacing: '0.1em',
                    color: '#0066FF',
                    marginLeft: '0.3em',
                    fontWeight: 600,
                  }}
                >
                  {stat.unit}
                </span>
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.875rem',
                  letterSpacing: '0.08em',
                  color: '#C8CDD8',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem',
                }}
              >
                {stat.label}
              </div>

              {/* Sublabel */}
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem',
                  color: '#8B8FA8',
                  fontStyle: 'italic',
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-[#2A2A32] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '1.1rem',
                letterSpacing: '0.05em',
                color: '#C8CDD8',
                marginBottom: '0.25rem',
              }}
            >
              All figures are manufacturer-tested under controlled conditions.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                color: '#8B8FA8',
              }}
            >
              WLTP range tested at 22°C. Performance figures may vary.
            </p>
          </div>
          <a href="#reserve" className="btn-vyron flex-shrink-0" onClick={e => e.preventDefault()}>
            <span>Request Full Specs</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;

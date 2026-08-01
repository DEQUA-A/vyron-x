/**
 * InteriorSection — Section 6: Interior Experience
 * VYRON X: Luxury cockpit, materials, driver interface
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const interiorFeatures = [
  {
    number: '01',
    title: 'DRIVER COCKPIT',
    description: 'The VYRON X interior is designed around the driver. A 14-inch curved OLED display wraps the steering column. Every control is within reach without moving your hands from the wheel.',
  },
  {
    number: '02',
    title: 'MATERIALS',
    description: 'Full-grain Nappa leather, Alcantara headliner, exposed carbon fiber trim, and machined aluminum controls. Every surface is hand-finished by master craftspeople in our atelier.',
  },
  {
    number: '03',
    title: 'AMBIENT SYSTEM',
    description: '64-color ambient lighting with 128 individually addressable zones. The system responds to driving mode, music, and navigation — creating an environment that matches your intent.',
  },
  {
    number: '04',
    title: 'SOUND SYSTEM',
    description: 'A 1,200-watt Burmester 4D surround system with 22 speakers and acoustic resonance panels. Engineered in partnership with Burmester Audiosysteme for reference-grade reproduction.',
  },
];

const InteriorSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.interior-feature',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      );

      gsap.fromTo('.interior-image',
        { opacity: 0, scale: 1.04, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0)',
          duration: 1.2, ease: 'power3.inOut',
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
      id="interior"
      style={{ background: '#0A0A0C', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Image */}
          <div
            className="interior-image relative overflow-hidden"
            style={{ aspectRatio: '4/5', background: '#1A1A1F', clipPath: 'inset(0 100% 0 0)' }}
          >
            <img
              src="/vyron-interior_2a1a4e3e.jpg"
              alt="VYRON X Interior"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.85 }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,10,12,0.7) 0%, transparent 60%)' }}
            />
            <div className="absolute bottom-6 left-6">
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: '#0066FF',
                  textTransform: 'uppercase',
                }}
              >
                Interior / Cockpit
              </span>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, #0066FF, transparent)' }}
            />
          </div>

          {/* Right: Content */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#0066FF]" />
              <span className="section-label">Interior</span>
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '0.04em',
                color: '#ffffff',
                lineHeight: '1.0',
                marginBottom: '3rem',
              }}
            >
              THE COCKPIT OF THE FUTURE
            </h2>

            <div className="space-y-0">
              {interiorFeatures.map((feature, i) => (
                <div
                  key={feature.number}
                  className="interior-feature"
                  style={{
                    opacity: 0,
                    padding: '1.5rem 0',
                    borderBottom: i < interiorFeatures.length - 1 ? '1px solid #2A2A32' : 'none',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        color: '#0066FF',
                        paddingTop: '0.2rem',
                        flexShrink: 0,
                      }}
                    >
                      {feature.number}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Rajdhani', sans-serif",
                          fontSize: '0.875rem',
                          letterSpacing: '0.15em',
                          color: '#ffffff',
                          textTransform: 'uppercase',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.875rem',
                          lineHeight: '1.7',
                          color: '#8B8FA8',
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorSection;

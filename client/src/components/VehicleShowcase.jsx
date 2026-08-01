/**
 * VehicleShowcase — Section 3: Interactive Vehicle Presentation
 * VYRON X: Exterior, Aerodynamics, Materials, Engineering
 * Uses GSAP ScrollTrigger + image reveal animations
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const views = [
  {
    id: 'exterior',
    label: 'EXTERIOR',
    title: 'SCULPTED BY PHYSICS',
    description: 'The VYRON X exterior is a masterclass in aerodynamic sculpture. Every surface, every crease, every vent exists for a reason. The active front splitter adjusts 40mm in 80ms. The rear wing deploys at 120 km/h with 1,200 kg of downforce.',
    specs: [
      { label: 'Drag Coefficient', value: '0.28 Cd' },
      { label: 'Downforce', value: '1,200 kg' },
      { label: 'Body Material', value: 'Carbon Fiber' },
    ],
  },
  {
    id: 'aerodynamics',
    label: 'AERODYNAMICS',
    title: 'AIR IS THE ENGINE',
    description: 'Active aerodynamics respond to speed, cornering load, and braking demand. The underbody venturi tunnel generates ground effect at speeds above 200 km/h. The system processes 50 sensor inputs per second to optimize airflow in real time.',
    specs: [
      { label: 'Active Elements', value: '7 Surfaces' },
      { label: 'Response Time', value: '80ms' },
      { label: 'Max Downforce', value: '1,800 kg' },
    ],
  },
  {
    id: 'materials',
    label: 'MATERIALS',
    title: 'AEROSPACE GRADE',
    description: 'The monocoque chassis is woven from T1100 carbon fiber — the same grade used in aerospace structural applications. The suspension components are forged from grade-5 titanium. Every fastener is aerospace-certified. Weight: 1,180 kg.',
    specs: [
      { label: 'Chassis', value: 'T1100 Carbon' },
      { label: 'Suspension', value: 'Grade-5 Ti' },
      { label: 'Dry Weight', value: '1,180 kg' },
    ],
  },
  {
    id: 'engineering',
    label: 'ENGINEERING',
    title: 'QUAD-MOTOR MASTERY',
    description: 'Four independent electric motors — one per wheel — enable torque vectoring with 0.001° precision. The active differential can redirect 100% of torque to a single wheel in 2ms. The result is a car that corners like it is on rails.',
    specs: [
      { label: 'Motors', value: '4 × 450 hp' },
      { label: 'Torque Vector', value: '0.001° Precision' },
      { label: 'Response', value: '2ms' },
    ],
  },
];

const VehicleShowcase = () => {
  const sectionRef = useRef(null);
  const [activeView, setActiveView] = useState(0);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo('.showcase-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo('.showcase-tabs',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleViewChange = (index) => {
    if (index === activeView) return;

    // Animate out
    gsap.to(contentRef.current, {
      opacity: 0, x: -20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setActiveView(index);
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  };

  const current = views[activeView];

  return (
    <section
      ref={sectionRef}
      id="performance"
      style={{ background: '#0D0D12', paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      <div className="container">
        {/* Header */}
        <div className="showcase-header mb-12" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#0066FF]" />
            <span className="section-label">Vehicle Showcase</span>
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '0.04em',
              color: '#ffffff',
              lineHeight: '1.0',
            }}
          >
            EVERY DETAIL ENGINEERED
          </h2>
        </div>

        {/* Tab navigation */}
        <div className="showcase-tabs flex flex-wrap gap-0 mb-12 border-b border-[#2A2A32]" style={{ opacity: 0 }}>
          {views.map((view, i) => (
            <button
              key={view.id}
              onClick={() => handleViewChange(i)}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: '0.15em',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                padding: '1rem 1.5rem',
                background: 'transparent',
                border: 'none',
                borderBottom: i === activeView ? '2px solid #0066FF' : '2px solid transparent',
                color: i === activeView ? '#ffffff' : '#8B8FA8',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                marginBottom: '-1px',
              }}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Visual panel */}
          <div
            ref={imageRef}
            className="relative overflow-hidden"
            style={{ aspectRatio: '16/10', background: '#111116' }}
          >
            {/* Background image */}
            <img
              src="/vyron-side-profile_92a3bd99.jpg"
              alt="VYRON X Vehicle"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.85 }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(10,10,12,0.5) 0%, rgba(10,10,12,0.1) 100%)' }}
            />

            {/* Active view label */}
            <div className="absolute top-6 left-6">
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: '#0066FF',
                  textTransform: 'uppercase',
                }}
              >
                {current.label}
              </span>
            </div>

            {/* Large background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  color: 'rgba(255,255,255,0.04)',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {current.label}
              </span>
            </div>

            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, #0066FF, transparent 70%)' }}
            />
          </div>

          {/* Text content */}
          <div ref={contentRef}>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '0.04em',
                color: '#ffffff',
                lineHeight: '1.0',
                marginBottom: '1.5rem',
              }}
            >
              {current.title}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#8B8FA8',
                marginBottom: '2.5rem',
              }}
            >
              {current.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-0 border-t border-[#2A2A32]">
              {current.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className="py-5"
                  style={{
                    borderRight: i < current.specs.length - 1 ? '1px solid #2A2A32' : 'none',
                    paddingLeft: i > 0 ? '1.5rem' : '0',
                    paddingRight: i < current.specs.length - 1 ? '1.5rem' : '0',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: '#8B8FA8',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {spec.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: '#ffffff',
                    }}
                  >
                    {spec.value}
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

export default VehicleShowcase;

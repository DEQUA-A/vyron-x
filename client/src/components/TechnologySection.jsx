/**
 * TechnologySection — Section 4: Technology Experience
 * VYRON X: Immersive tech data visualization with animated counters
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    id: 'battery',
    label: 'BATTERY SYSTEM',
    title: 'SOLID-STATE ENERGY',
    value: '120',
    unit: 'kWh',
    description: 'Next-generation solid-state battery cells with 40% higher energy density than conventional lithium-ion. Thermal management maintains optimal temperature within ±0.5°C across all conditions.',
    details: [
      { label: 'Cell Type', value: 'Solid-State' },
      { label: 'Charge Rate', value: '350 kW' },
      { label: '10→80%', value: '11 min' },
      { label: 'Range', value: '620 km' },
    ],
  },
  {
    id: 'powertrain',
    label: 'POWERTRAIN',
    title: 'QUAD-MOTOR ARCHITECTURE',
    value: '1800',
    unit: 'hp',
    description: 'Four permanent magnet synchronous motors — one per wheel — with individual torque vectoring. Peak combined output of 1,800 hp and 2,400 Nm of torque, available instantly from 0 rpm.',
    details: [
      { label: 'Motors', value: '4 × PMSM' },
      { label: 'Peak Torque', value: '2,400 Nm' },
      { label: '0–100 km/h', value: '1.7 s' },
      { label: 'Top Speed', value: '380 km/h' },
    ],
  },
  {
    id: 'chassis',
    label: 'CHASSIS',
    title: 'CARBON MONOCOQUE',
    value: '1180',
    unit: 'kg',
    description: 'The VYRON X monocoque is woven from T1100 carbon fiber — the same material used in aerospace structural applications. The result is a chassis that is 60% lighter than steel with 3× the torsional rigidity.',
    details: [
      { label: 'Material', value: 'T1100 CF' },
      { label: 'Torsional Rigidity', value: '65,000 Nm/°' },
      { label: 'Suspension', value: 'Active Adaptive' },
      { label: 'Brakes', value: 'Carbon Ceramic' },
    ],
  },
  {
    id: 'ai',
    label: 'INTELLIGENCE',
    title: 'VYRON AI SYSTEM',
    value: '1000',
    unit: 'Hz',
    description: 'The VYRON AI processes 1,000 sensor readings per second to optimize suspension, torque vectoring, aerodynamics, and energy recovery simultaneously. It learns your driving style over time.',
    details: [
      { label: 'Sensors', value: '240 Points' },
      { label: 'Processing', value: '1,000 Hz' },
      { label: 'Latency', value: '< 1ms' },
      { label: 'OTA Updates', value: 'Lifetime' },
    ],
  },
];

const AnimatedCounter = ({ target, unit, trigger }) => {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;
    const num = parseInt(target.replace(/,/g, ''), 10);
    const duration = 1800;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger, target]);

  const formatted = value.toLocaleString();
  return (
    <span>
      {formatted}
      <span style={{ fontSize: '0.4em', marginLeft: '0.2em', color: '#0066FF' }}>{unit}</span>
    </span>
  );
};

const TechnologySection = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [counterTrigger, setCounterTrigger] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            onEnter: () => setCounterTrigger(true),
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTabChange = (i) => {
    if (i === activeTab) return;
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActiveTab(i);
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
    });
  };

  const current = technologies[activeTab];

  return (
    <section
      ref={sectionRef}
      id="technology"
      style={{
        background: '#0A0A0C',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="tech-header mb-16" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#0066FF]" />
            <span className="section-label">Technology</span>
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
            ENGINEERED WITHOUT COMPROMISE
          </h2>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-0 mb-12 border-b border-[#2A2A32]">
          {technologies.map((tech, i) => (
            <button
              key={tech.id}
              onClick={() => handleTabChange(i)}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: '0.15em',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                padding: '1rem 1.5rem',
                background: 'transparent',
                border: 'none',
                borderBottom: i === activeTab ? '2px solid #0066FF' : '2px solid transparent',
                color: i === activeTab ? '#ffffff' : '#8B8FA8',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                marginBottom: '-1px',
              }}
            >
              {tech.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Big number + description */}
          <div>
            {/* Animated counter */}
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(5rem, 14vw, 11rem)',
                letterSpacing: '0.02em',
                lineHeight: '0.9',
                color: '#ffffff',
                marginBottom: '0.5rem',
              }}
            >
              <AnimatedCounter
                target={current.value}
                unit={current.unit}
                trigger={counterTrigger}
              />
            </div>

            <h3
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.15em',
                color: '#0066FF',
                textTransform: 'uppercase',
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
              }}
            >
              {current.description}
            </p>
          </div>

          {/* Right: Detail grid */}
          <div>
            <div className="grid grid-cols-2 gap-0">
              {current.details.map((detail, i) => (
                <div
                  key={detail.label}
                  className="p-6"
                  style={{
                    borderTop: '1px solid #2A2A32',
                    borderRight: i % 2 === 0 ? '1px solid #2A2A32' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      color: '#8B8FA8',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {detail.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: '#ffffff',
                    }}
                  >
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div className="mt-8 space-y-4">
              {[
                { label: 'Performance', value: 98 },
                { label: 'Efficiency', value: 94 },
                { label: 'Safety', value: 100 },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#8B8FA8', textTransform: 'uppercase' }}>
                      {bar.label}
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#0066FF' }}>
                      {bar.value}%
                    </span>
                  </div>
                  <div className="h-px bg-[#2A2A32] relative overflow-hidden">
                    <div
                      className="h-full bg-[#0066FF]"
                      style={{ width: `${bar.value}%`, transition: 'width 1.5s cubic-bezier(0.23, 1, 0.32, 1)' }}
                    />
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

export default TechnologySection;

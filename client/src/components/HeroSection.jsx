/**
 * HeroSection — Section 1: Cinematic Hero Experience
 * VYRON X: Electric Obsidian design direction
 * 
 * Sequence:
 * 0.0s — darkness, loading indicator
 * 0.5s — Three.js scene fades in
 * 1.2s — electric line sweeps across
 * 1.6s — "THE FUTURE OF" reveals
 * 2.0s — "ELECTRIC PERFORMANCE" reveals
 * 2.4s — subtext + CTA fade in
 * 2.8s — scroll indicator appears
 */
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CursorGrid from './CursorGrid';

gsap.registerPlugin(ScrollTrigger);

// Lazy load Three.js scene for performance
const HeroScene = lazy(() => import('./HeroScene'));

const HeroSection = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const electricLineRef = useRef(null);
  const labelRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Scene fade in
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 1.4,
        ease: 'power2.inOut',
      }, 0.2);

      // Electric line sweep
      tl.fromTo(electricLineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
        0.8
      );

      // Label
      tl.fromTo(labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.0
      );

      // Headline line 1 — clip-path reveal
      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' },
        1.2
      );

      // Headline line 2
      tl.fromTo(line2Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' },
        1.5
      );

      // Subtext
      tl.fromTo(subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        2.0
      );

      // CTA
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        2.3
      );

      // Scroll indicator
      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        2.8
      );

      // Scroll-driven parallax on hero content
      gsap.to('.hero-content', {
        y: -120,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', background: '#0A0A0C' }}
    >
      {/* Three.js Canvas */}
      <Suspense fallback={null}>
        <HeroScene onReady={() => setSceneReady(true)} />
      </Suspense>

      {/* Hero background image — visible before Three.js loads */}
      <div
        className="absolute inset-0 z-5"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }}
      />

      {/* CursorGrid overlay — electric blue cells */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
        <div className="w-full h-full pointer-events-auto">
          <CursorGrid
            cellSize={80}
            color="#0066FF"
            radius={160}
            falloff="smooth"
            holdTime={300}
            fadeDuration={1000}
            lineWidth={1.0}
            maxOpacity={0.6}
            fillOpacity={0.05}
            gridOpacity={0.03}
            clickPulse={true}
            pulseSpeed={500}
          />
        </div>
      </div>

      {/* Dark overlay for cinematic entrance */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20"
        style={{ background: '#0A0A0C', pointerEvents: 'none' }}
      />

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0 z-15 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,12,0.85) 0%, rgba(10,10,12,0.3) 50%, rgba(10,10,12,0.6) 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-15 pointer-events-none"
        style={{ height: '30%', background: 'linear-gradient(to top, #0A0A0C, transparent)' }}
      />

      {/* Electric energy glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 z-15 pointer-events-none"
        style={{
          width: '50%',
          height: '40%',
          background: 'radial-gradient(ellipse at 20% 100%, rgba(0,102,255,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Technical annotation — top right */}
      <div className="absolute top-24 right-8 z-30 hidden lg:flex flex-col items-end gap-2 pointer-events-none">
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: '#2A2A32' }}>
          QUAD-MOTOR / 1800 HP
        </span>
        <div className="h-px w-24 bg-[#2A2A32]" />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: '#2A2A32' }}>
          0–100 KM/H: 1.7S
        </span>
        <div className="h-px w-16 bg-[#2A2A32]" />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: '#2A2A32' }}>
          RANGE: 620 KM
        </span>
      </div>

      {/* Hero Content */}
      <div className="hero-content absolute inset-0 z-30 flex flex-col justify-center pointer-events-none">
        <div className="container">
          <div className="max-w-3xl">
            {/* Section label */}
            <div ref={labelRef} style={{ opacity: 0 }} className="flex items-center gap-3 mb-6">
              <div ref={electricLineRef} className="h-px bg-[#0066FF] w-12" style={{ transformOrigin: 'left center' }} />
              <span className="section-label">Model Year 2026</span>
            </div>

            {/* Main headline */}
            <div className="overflow-hidden mb-2">
              <h1
                ref={line1Ref}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3.5rem, 9vw, 9rem)',
                  letterSpacing: '0.04em',
                  lineHeight: '0.95',
                  color: '#ffffff',
                  clipPath: 'inset(0 100% 0 0)',
                }}
              >
                THE FUTURE OF
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1
                ref={line2Ref}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3.5rem, 9vw, 9rem)',
                  letterSpacing: '0.04em',
                  lineHeight: '0.95',
                  clipPath: 'inset(0 100% 0 0)',
                }}
                className="text-[#0066FF]"
              >
                ELECTRIC PERFORMANCE
              </h1>
            </div>

            {/* Subtext */}
            <p
              ref={subtextRef}
              style={{
                opacity: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                lineHeight: '1.7',
                color: '#8B8FA8',
                maxWidth: '480px',
              }}
              className="mb-10"
            >
              1,800 horsepower. Zero to 100 in 1.7 seconds.
              <br />
              The VYRON X does not compromise. It obliterates limits.
            </p>

            {/* CTA */}
            <div ref={ctaRef} style={{ opacity: 0 }} className="flex items-center gap-6 pointer-events-auto">
              <a href="#performance" className="btn-vyron">
                <span>Explore VYRON X</span>
                <span style={{ fontSize: '1.1rem' }}>→</span>
              </a>
              <a
                href="#reserve"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  letterSpacing: '0.12em',
                  fontSize: '0.8rem',
                  color: '#8B8FA8',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid #2A2A32',
                  paddingBottom: '2px',
                  transition: 'color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={e => { e.target.style.color = '#ffffff'; e.target.style.borderColor = '#0066FF'; }}
                onMouseLeave={e => { e.target.style.color = '#8B8FA8'; e.target.style.borderColor = '#2A2A32'; }}
              >
                Reserve Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{ opacity: 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span
          style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8B8FA8' }}
        >
          SCROLL
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#0066FF] to-transparent animate-pulse" />
      </div>

      {/* Corner specs */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-end gap-1 pointer-events-none">
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#2A2A32' }}>
          VX-2026 / HYPERCAR
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#2A2A32' }}>
          ELECTRIC PERFORMANCE DIVISION
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
// Hero background image
const HERO_BG = '/vyron-hero-bg_62ae9d04.jpg';

/**
 * CinematicBanner — Full-viewport dramatic break
 * VYRON X: Full-bleed vehicle image with oversized typography
 * Creates the "film sequence" rhythm break between sections
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CinematicBanner = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to('.cinematic-bg', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Text reveal
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      // Overlay fade
      gsap.fromTo(overlayRef.current,
        { opacity: 0.3 },
        {
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '80vh', minHeight: '500px' }}
    >
      {/* Background image with parallax */}
      <div
        className="cinematic-bg absolute inset-0"
        style={{
          backgroundImage: 'url(/vyron-hero-bg_62ae9d04.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          top: '-15%',
          bottom: '-15%',
        }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: 'rgba(10,10,12,0.5)' }}
      />

      {/* Electric glow from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(0,102,255,0.2) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ opacity: 0 }}
      >
        {/* Spec annotation above */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-16 bg-[#0066FF]" />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#0066FF', textTransform: 'uppercase' }}>
            VX-2026 / 1800 HP / 380 KM/H
          </span>
          <div className="h-px w-16 bg-[#0066FF]" />
        </div>

        {/* Oversized headline */}
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(5rem, 18vw, 16rem)',
            letterSpacing: '0.04em',
            lineHeight: '0.9',
            color: '#ffffff',
            textShadow: '0 0 80px rgba(0,102,255,0.3)',
          }}
        >
          VELOCITY
        </h2>

        {/* Subline */}
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
            letterSpacing: '0.3em',
            color: '#8B8FA8',
            textTransform: 'uppercase',
            marginTop: '1.5rem',
          }}
        >
          Not just fast. Inevitable.
        </p>
      </div>

      {/* Bottom titanium rule */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,143,168,0.4), rgba(200,205,216,0.7), rgba(139,143,168,0.4), transparent)' }}
      />
    </section>
  );
};

export default CinematicBanner;

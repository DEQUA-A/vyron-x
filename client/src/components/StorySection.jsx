/**
 * StorySection — Section 2: Brand Storytelling
 * VYRON X: Scroll-driven narrative — Vision → Design → Engineering → Performance
 * Uses GSAP ScrollTrigger + ScrollFloat component for cinematic text reveals
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    number: '01',
    title: 'VISION',
    headline: 'WHERE OBSESSION MEETS VELOCITY',
    body: 'VYRON X was born from a single conviction: that electric performance should feel like nothing else on earth. Not just fast — inevitable. Every line, every system, every decision was made in service of one experience: the moment you press the accelerator and the world collapses behind you.',
    accent: 'The vision is not a car. It is a statement.',
  },
  {
    number: '02',
    title: 'DESIGN',
    headline: 'FORM FOLLOWS FORCE',
    body: 'The VYRON X body is not styled — it is solved. Every surface is a function: channeling air, managing heat, generating downforce. The carbon fiber monocoque was sculpted in computational fluid dynamics before a single physical prototype was built. Beauty is the byproduct of engineering done right.',
    accent: 'Aerodynamics at 300 km/h generate 1,200 kg of downforce.',
  },
  {
    number: '03',
    title: 'ENGINEERING',
    headline: 'PRECISION AT THE MOLECULAR LEVEL',
    body: 'The quad-motor powertrain delivers 1,800 hp with torque vectoring accurate to 0.001°. The active suspension reads road surface 1,000 times per second. The battery pack, developed in partnership with aerospace partners, charges from 10% to 80% in 11 minutes.',
    accent: 'Every component is engineered to aerospace tolerance.',
  },
  {
    number: '04',
    title: 'PERFORMANCE',
    headline: 'NUMBERS THAT REWRITE PHYSICS',
    body: 'Zero to 100 km/h in 1.7 seconds. A top speed of 380 km/h. A range of 620 km on a single charge. These are not targets — they are the result of refusing to accept the boundaries of what electric performance can be.',
    accent: '1.7 seconds. The future arrives faster than you expect.',
  },
];

const StorySection = () => {
  const sectionRef = useRef(null);
  const chapterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      chapterRefs.current.forEach((chapter, i) => {
        if (!chapter) return;

        const number = chapter.querySelector('.chapter-number');
        const line = chapter.querySelector('.chapter-line');
        const title = chapter.querySelector('.chapter-title');
        const body = chapter.querySelector('.chapter-body');
        const accent = chapter.querySelector('.chapter-accent');
        const image = chapter.querySelector('.chapter-image');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse',
          }
        });

        tl.fromTo(number,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
          '-=0.3'
        )
        .fromTo(title,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(body,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(accent,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

        if (image) {
          tl.fromTo(image,
            { opacity: 0, scale: 1.05, clipPath: 'inset(0 100% 0 0)' },
            { opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' },
            0
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
    style={{ background: '#0A0A0C', paddingTop: '8rem', paddingBottom: '8rem', position: 'relative' }}
    >
      {/* Section intro with ScrollFloat */}
      <div className="container mb-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-[#0066FF]" />
          <span className="section-label">The Story</span>
        </div>
        <ScrollFloat
          animationDuration={1.2}
          ease="back.inOut(2)"
          scrollStart="center bottom+=30%"
          scrollEnd="bottom bottom-=30%"
          stagger={0.025}
          containerClassName="mb-0"
          textClassName=""
        >
          THE VYRON X STORY
        </ScrollFloat>
      </div>

        {/* Titanium rule */}
        <div className="titanium-rule mb-16" />

      {/* Story chapters */}
      <div className="container">
        {chapters.map((chapter, i) => (
          <div
            key={chapter.number}
            ref={el => chapterRefs.current[i] = el}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 last:mb-0 ${
              i % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}
          >
            {/* Text content */}
            <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
              {/* Chapter number */}
              <div className="chapter-number flex items-baseline gap-3 mb-4" style={{ opacity: 0 }}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    color: '#0066FF',
                  }}
                >
                  {chapter.number}
                </span>
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    color: '#8B8FA8',
                    textTransform: 'uppercase',
                  }}
                >
                  {chapter.title}
                </span>
              </div>

              {/* Electric line */}
              <div
                className="chapter-line h-px bg-[#0066FF] mb-6"
                style={{ width: '60px', transform: 'scaleX(0)', transformOrigin: 'left center' }}
              />

              {/* Headline */}
              <h2
                className="chapter-title mb-6"
                style={{
                  opacity: 0,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  letterSpacing: '0.04em',
                  lineHeight: '1.0',
                  color: '#ffffff',
                }}
              >
                {chapter.headline}
              </h2>

              {/* Body */}
              <p
                className="chapter-body mb-6"
                style={{
                  opacity: 0,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#8B8FA8',
                }}
              >
                {chapter.body}
              </p>

              {/* Accent */}
              <p
                className="chapter-accent"
                style={{
                  opacity: 0,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.875rem',
                  letterSpacing: '0.08em',
                  color: '#0066FF',
                  borderLeft: '2px solid #0066FF',
                  paddingLeft: '1rem',
                  fontStyle: 'italic',
                }}
              >
                {chapter.accent}
              </p>
            </div>

            {/* Visual panel */}
            <div className={`chapter-image relative overflow-hidden ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
              style={{ aspectRatio: '16/10', background: '#1A1A1F', clipPath: 'inset(0 100% 0 0)' }}
            >
              <div
                className="absolute inset-0 carbon-texture"
                style={{ background: '#111116' }}
              />
              {/* Carbon fiber texture overlay */}
              <div
                className="absolute inset-0 carbon-panel"
                style={{ opacity: 0.7 }}
              />
              {/* Chapter visual number */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ zIndex: 1 }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(8rem, 20vw, 16rem)',
                    color: 'rgba(255,255,255,0.03)',
                    letterSpacing: '0.02em',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {chapter.number}
                </span>
              </div>
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '0.7rem',
                    letterSpacing: '0.25em',
                    color: '#0066FF',
                    textTransform: 'uppercase',
                  }}
                >
                  {chapter.title}
                </span>
              </div>
              {/* Electric accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, #0066FF, transparent)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StorySection;

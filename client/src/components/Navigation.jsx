/**
 * Navigation — VYRON X
 * Electric Obsidian: Minimal, transparent, transitions to solid on scroll
 * Hairline bottom border appears on scroll
 */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 2.0 }
      );
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = ['Performance', 'Technology', 'Interior', 'Configure'];

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0C]/95 backdrop-blur-xl border-b border-[#2A2A32]'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="/vyron-logo_b3e76512.png"
            alt="VYRON X"
            className="w-8 h-8 object-contain"
          />
          <div className="flex items-baseline gap-1">
            <span
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
              className="text-white text-xl"
            >
              VYRON
            </span>
            <span
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
              className="text-[#0066FF] text-xl"
            >
              X
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.12em' }}
              className="text-[#8B8FA8] hover:text-white text-sm font-500 uppercase transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#reserve"
            className="btn-vyron text-xs"
          >
            <span>Reserve Now</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-[#0A0A0C]/98 backdrop-blur-xl border-t border-[#2A2A32] px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.12em' }}
              className="text-[#C8CDD8] text-base font-500 uppercase py-2 border-b border-[#1A1A1F]"
            >
              {link}
            </a>
          ))}
          <a href="#reserve" className="btn-vyron text-xs mt-2 justify-center">
            <span>Reserve Now</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

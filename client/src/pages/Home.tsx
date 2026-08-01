/**
 * Home — VYRON X Main Page
 * Electric Obsidian design direction
 * Assembles all sections with Lenis smooth scroll + GSAP ScrollTrigger
 */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StorySection from '@/components/StorySection';
import VehicleShowcase from '@/components/VehicleShowcase';
import TechnologySection from '@/components/TechnologySection';
import PerformanceSection from '@/components/PerformanceSection';
import InteriorSection from '@/components/InteriorSection';
import ReserveSection from '@/components/ReserveSection';
import Footer from '@/components/Footer';
import CinematicBanner from '@/components/CinematicBanner';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: '#0A0A0C', overflowX: 'hidden' }}
    >
      <Navigation />
      <HeroSection />
      <StorySection />
      <VehicleShowcase />
      <TechnologySection />
      <PerformanceSection />
      <CinematicBanner />
      <InteriorSection />
      <ReserveSection />
      <Footer />
    </div>
  );
}

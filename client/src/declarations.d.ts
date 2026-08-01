// Allow importing .jsx files without explicit type declarations
declare module '*.jsx' {
  import type { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}

declare module '@/components/Navigation' {
  import type { FC } from 'react';
  const Navigation: FC;
  export default Navigation;
}

declare module '@/components/HeroSection' {
  import type { FC } from 'react';
  const HeroSection: FC;
  export default HeroSection;
}

declare module '@/components/HeroScene' {
  import type { FC } from 'react';
  const HeroScene: FC<{ onReady?: () => void }>;
  export default HeroScene;
}

declare module '@/components/StorySection' {
  import type { FC } from 'react';
  const StorySection: FC;
  export default StorySection;
}

declare module '@/components/VehicleShowcase' {
  import type { FC } from 'react';
  const VehicleShowcase: FC;
  export default VehicleShowcase;
}

declare module '@/components/TechnologySection' {
  import type { FC } from 'react';
  const TechnologySection: FC;
  export default TechnologySection;
}

declare module '@/components/PerformanceSection' {
  import type { FC } from 'react';
  const PerformanceSection: FC;
  export default PerformanceSection;
}

declare module '@/components/InteriorSection' {
  import type { FC } from 'react';
  const InteriorSection: FC;
  export default InteriorSection;
}

declare module '@/components/ReserveSection' {
  import type { FC } from 'react';
  const ReserveSection: FC;
  export default ReserveSection;
}

declare module '@/components/Footer' {
  import type { FC } from 'react';
  const Footer: FC;
  export default Footer;
}

declare module '@/components/CinematicBanner' {
  import type { FC } from 'react';
  const CinematicBanner: FC;
  export default CinematicBanner;
}

declare module '@/components/ScrollFloat' {
  import type { FC, ReactNode } from 'react';
  const ScrollFloat: FC<{
    children: ReactNode;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    containerClassName?: string;
    textClassName?: string;
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
  }>;
  export default ScrollFloat;
}

declare module '@/components/GlitchText' {
  import type { FC, ReactNode } from 'react';
  const GlitchText: FC<{
    children: ReactNode;
    speed?: number;
    enableShadows?: boolean;
    enableOnHover?: boolean;
    className?: string;
  }>;
  export default GlitchText;
}

declare module '@/components/CursorGrid' {
  import type { FC } from 'react';
  const CursorGrid: FC<{
    cellSize?: number;
    color?: string;
    radius?: number;
    falloff?: string;
    holdTime?: number;
    fadeDuration?: number;
    lineWidth?: number;
    maxOpacity?: number;
    fillOpacity?: number;
    gridOpacity?: number;
    cellRadius?: number;
    clickPulse?: boolean;
    pulseSpeed?: number;
    className?: string;
  }>;
  export default CursorGrid;
}

import React, { useState, useEffect, useRef } from 'react';
import { BriefcaseMedical, Flower2, GraduationCap, Home } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { computeServiceCardScrollFocus } from '../utils/serviceCardScrollEffect';

interface ServicesProps {
  lang: Language;
  onSelectService: (serviceName: string) => void;
  onOpenDetail?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ lang, onSelectService, onOpenDetail }) => {
  const t = translations[lang].services;
  const [isTouchPaused, setIsTouchPaused] = useState(false);
  const [hoveredCardKey, setHoveredCardKey] = useState<string | null>(null);
  const [scrollTrackState, setScrollTrackState] = useState<{
    trackTop: number;
    trackHeight: number;
    viewportHeight: number;
    reducedMotion: boolean;
  }>({
    trackTop: 9999,
    trackHeight: 460,
    viewportHeight: 900,
    reducedMotion: false,
  });

  const trackContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId: number | null = null;

    const updateScrollMetrics = () => {
      rafId = null;
      if (!trackContainerRef.current) return;
      const rect = trackContainerRef.current.getBoundingClientRect();
      setScrollTrackState({
        trackTop: rect.top,
        trackHeight: rect.height || 460,
        viewportHeight: window.innerHeight || 900,
        reducedMotion: mediaQuery.matches,
      });
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScrollMetrics);
      }
    };

    updateScrollMetrics();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const serviceCards = [
    {
      id: 'checkup',
      icon: BriefcaseMedical,
      title: t.checkupTitle,
      desc: t.checkupDesc,
      price: t.checkupPrice,
      serviceName: 'Khám tổng quát',
    },
    {
      id: 'spa',
      icon: Flower2,
      title: t.spaTitle,
      desc: t.spaDesc,
      price: t.spaPrice,
      serviceName: 'Spa & tắm',
    },
    {
      id: 'training',
      icon: GraduationCap,
      title: t.trainingTitle,
      desc: t.trainingDesc,
      price: t.trainingPrice,
      serviceName: 'Huấn luyện',
    },
    {
      id: 'boarding',
      icon: Home,
      title: t.boardingTitle,
      desc: t.boardingDesc,
      price: t.boardingPrice,
      serviceName: 'Lưu trú',
    },
  ];

  // Helper to render a single service card
  const renderCard = (srv: (typeof serviceCards)[0], isDuplicate = false, cardIndex = 0) => {
    const Icon = srv.icon;
    const cardKey = `${srv.id}-${isDuplicate ? 'dup' : 'orig'}-${cardIndex}`;
    const isCardActive = hoveredCardKey === cardKey;

    const focusMetrics = scrollTrackState.reducedMotion
      ? { progress: 0, scale: 1, opacity: 1, blurPx: 0, translateY: 0 }
      : computeServiceCardScrollFocus(
          scrollTrackState.trackTop,
          scrollTrackState.trackHeight,
          scrollTrackState.viewportHeight,
          cardIndex
        );

    const appliedScale = isCardActive ? 1 : focusMetrics.scale;
    const appliedOpacity = isCardActive ? 1 : focusMetrics.opacity;
    const appliedBlur = isCardActive ? 0 : focusMetrics.blurPx;
    const appliedTranslateY = isCardActive ? -6 : focusMetrics.translateY;

    return (
      <div
        key={cardKey}
        data-testid={!isDuplicate ? `service-card-${srv.id}` : undefined}
        data-scroll-scale={appliedScale}
        data-scroll-blur={appliedBlur}
        aria-hidden={isDuplicate ? 'true' : undefined}
        tabIndex={isDuplicate ? -1 : 0}
        onMouseEnter={() => setHoveredCardKey(cardKey)}
        onMouseLeave={() => setHoveredCardKey((prev) => (prev === cardKey ? null : prev))}
        onFocus={() => setHoveredCardKey(cardKey)}
        onBlur={() => setHoveredCardKey((prev) => (prev === cardKey ? null : prev))}
        className="shrink-0 rounded-[32px] p-8 sm:p-[48px] flex flex-col justify-between border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
        style={{
          width: 'var(--marquee-card-width)',
          minHeight: '440px',
          backgroundColor: 'color-mix(in srgb, var(--surface-2) 94%, var(--bg))',
          color: 'var(--text)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow)',
          transform: `translate3d(0, ${appliedTranslateY}px, 0) scale(${appliedScale})`,
          opacity: appliedOpacity,
          filter: appliedBlur > 0.08 ? `blur(${appliedBlur}px)` : 'none',
          transition:
            'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms cubic-bezier(0.16, 1, 0.3, 1), filter 240ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="space-y-6">
          {/* 1. Icon Tile: 74px rounded square (20px radius) in solid --primary with --on-primary icon */}
          <div
            className="w-[74px] h-[74px] rounded-[20px] flex items-center justify-center shadow-sm shrink-0"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)',
            }}
          >
            <Icon className="w-9 h-9" />
          </div>

          {/* 2. Title: Baloo 2, 36px, weight 600 */}
          <h3 className="card-title text-2xl sm:text-3xl lg:text-[36px] font-semibold leading-[1.2] pt-1" style={{ color: 'var(--text)' }}>
            {srv.title}
          </h3>

          {/* 3. Description: Nunito, 20px, muted color, max 3 lines */}
          <p className="font-body text-base sm:text-lg lg:text-[20px] leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
            {srv.desc}
          </p>
        </div>

        {/* 4. Price Pill Button with Paw Icon */}
        <div className="pt-8">
          <button
            tabIndex={isDuplicate ? -1 : 0}
            onClick={(e) => {
              e.stopPropagation();
              onSelectService(srv.serviceName);
            }}
            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 py-3.5 px-7 text-[16px] shadow-md group focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
            aria-label={`Book service ${srv.title} - ${srv.price}`}
          >
            {/* Small paw icon */}
            <svg
              className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c-2.4 0-4.3 1.7-4.3 3.8 0 1.2.6 2.2 1.6 2.8.7.4 1.7.6 2.7.6s2-.2 2.7-.6c1-.6 1.6-1.6 1.6-2.8 0-2.1-1.9-3.8-4.3-3.8zm-5.5-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.8-4.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6.6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            <span>{srv.price}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="services"
      className="py-16 lg:py-24 relative overflow-hidden select-none bg-transparent"
    >
      {/* Dynamic CSS variable for Marquee Card Width */}
      <style>{`
        :root {
          --marquee-card-width: 85vw;
        }
        @media (min-width: 768px) {
          :root {
            --marquee-card-width: clamp(320px, 40vw, 750px);
          }
        }
      `}</style>

      {/* Unified 3-Line Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        <div className="space-y-2.5 max-w-2xl">
          <span
            className="block uppercase font-bold"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--primary)',
            }}
          >
            {lang === 'vi' ? 'DỊCH VỤ THÚ CƯNG' : 'PET SERVICES'}
          </span>

          <h2
            className="section-title font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--primary)',
            }}
          >
            {t.title}
          </h2>

          <p
            className="text-[18px] leading-relaxed font-normal"
            style={{ color: 'var(--text-muted)' }}
          >
            {lang === 'vi'
              ? 'Khám định kỳ, tiêm chủng, spa thảo mộc và khách sạn lưu trú chuẩn quốc tế cho từng bé.'
              : 'Preventive checkups, vaccinations, herbal spa and boarding suites for each pet.'}
          </p>
        </div>
      </div>

      {/* Full Viewport Width Auto-Sliding Infinite Marquee Track */}
      <div
        ref={trackContainerRef}
        className="w-full overflow-x-auto lg:overflow-hidden relative py-4 scrollbar-none"
        onTouchStart={() => setIsTouchPaused(true)}
        onTouchEnd={() => setIsTouchPaused(false)}
      >
        <div
          className={`animate-marquee gap-[20px] md:gap-[50px] ${
            isTouchPaused ||
            (!scrollTrackState.reducedMotion &&
              scrollTrackState.trackTop < scrollTrackState.viewportHeight * 0.34)
              ? 'animate-marquee-paused'
              : ''
          }`}
        >
          {/* First Set of 4 Cards (Accessible for Screen Readers) */}
          {serviceCards.map((srv, idx) => renderCard(srv, false, idx))}

          {/* Second Duplicate Set of 4 Cards (Infinite Loop Seamless Transition - aria-hidden) */}
          {serviceCards.map((srv, idx) => renderCard(srv, true, idx))}
        </div>
      </div>
    </section>
  );
};


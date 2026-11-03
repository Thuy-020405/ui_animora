import React from 'react';
import { Star } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { CONTACT_INFO } from '../config/contact';

interface HeroProps {
  lang: Language;
  darkMode?: boolean;
  onOpenConsultation: () => void;
}

const PawIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 13.5c-2.6 0-4.6 1.8-4.6 4.1 0 1.3.7 2.4 1.8 3 .8.4 1.8.6 2.8.6s2-.2 2.8-.6c1.1-.6 1.8-1.7 1.8-3 0-2.3-2-4.1-4.6-4.1zm-5.8-3.8c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2-1-2.2-2.2-2.2zm11.6 0c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2-1-2.2-2.2-2.2zm-9.1-4.6c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2-1-2.2-2.2-2.2zm6.6 0c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2-1-2.2-2.2-2.2z" />
  </svg>
);

export const Hero: React.FC<HeroProps> = ({ lang, darkMode = false, onOpenConsultation }) => {
  const t = translations[lang].hero;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex items-center min-h-[clamp(580px,86vh,860px)] pt-[calc(var(--nav-h)+24px)] pb-[clamp(115px,calc(10vw+48px),195px)]"
      style={{
        background: darkMode
          ? 'linear-gradient(180deg, rgba(58, 18, 29, 0.75) 0%, rgba(74, 26, 39, 0.92) 100%)'
          : 'linear-gradient(180deg, rgba(255, 244, 232, 0.4) 0%, rgba(244, 182, 194, 0.34) 65%, rgba(244, 182, 194, 0.52) 100%)',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. Left Curly Apricot Puppy + Decorative Bottom-Left Paw Print (z-10)     */}
      {/* ========================================================================= */}
      <div
        className="pointer-events-none select-none lg:absolute lg:inset-y-0 lg:left-0 lg:w-[58%] flex items-end justify-center z-10"
        aria-hidden="true"
      >
        {/* Bottom-left tilted Paw Print Icon (matching reference layout, above wave) */}
        <div
          className="hidden sm:block absolute left-[9%] lg:left-[13%] bottom-[22%] opacity-45 transition-transform duration-700 animate-float-slow z-20"
          style={{
            color: 'var(--text)',
            transform: 'rotate(-16deg)',
          }}
        >
          <PawIcon className="w-14 h-14 lg:w-16 lg:h-16" />
        </div>

        {/* Cute Corgi Puppy Cutout (Tucked cleanly behind the bottom natural wave) */}
        <img
          src="/assets/aistudio/cute_dog_transparent.png"
          alt="Animora Pet Care Spa Cute Corgi Puppy"
          className="hidden lg:block h-[92%] max-h-[760px] w-auto object-contain object-bottom translate-x-[2%] translate-y-[18px] animate-hero-zoom"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. Right Content Column (Matching Reference Layout & Proportions, z-15)   */}
      {/* ========================================================================= */}
      <div className="shared-container w-full relative z-15 flex flex-col lg:flex-row items-center justify-end">
        {/* Mobile Puppy Preview (<1024px) */}
        <div className="lg:hidden w-full flex justify-center mb-4">
          <img
            src="/assets/aistudio/cute_dog_transparent.png"
            alt="Animora Pet Care Spa Cute Corgi Puppy"
            className="h-[280px] sm:h-[340px] w-auto object-contain object-bottom"
          />
        </div>

        {/* Right Text & Actions Block */}
        <div className="w-full lg:w-[53%] xl:w-[50%] ml-auto flex flex-col items-start lg:items-end space-y-6 max-w-[640px] animate-fade-up">
          {/* Headline with 2 Decorative Background Paw Prints */}
          <div className="relative w-full text-left">
            {/* Top-left paw print behind first word of headline */}
            <div
              className="pointer-events-none absolute -top-5 -left-6 sm:-left-8 opacity-18"
              style={{
                color: 'var(--text)',
                transform: 'rotate(-16deg)',
              }}
              aria-hidden="true"
            >
              <PawIcon className="w-13 h-13 sm:w-16 sm:h-16" />
            </div>

            {/* Right-middle paw print behind second half of headline */}
            <div
              className="pointer-events-none absolute top-6 sm:top-8 right-[6%] sm:right-[9%] opacity-12"
              style={{
                color: 'var(--text)',
                transform: 'rotate(16deg)',
              }}
              aria-hidden="true"
            >
              <PawIcon className="w-13 h-13 sm:w-16 sm:h-16" />
            </div>

            <h1
              className="relative z-10 font-heading font-bold tracking-tight [text-wrap:balance] leading-[1.12] pt-[0.08em]"
              style={{
                fontSize: 'clamp(34px, 4.1vw, 60px)',
                color: 'var(--text)',
              }}
            >
              {t.title}
            </h1>
          </div>

          {/* Subline (Right-aligned on desktop, bold keyword "is safe" / "an toàn") */}
          <p
            className="w-full text-left lg:text-right leading-relaxed font-normal [text-wrap:balance]"
            style={{
              fontSize: 'clamp(16px, 1.45vw, 21px)',
              color: 'var(--text)',
            }}
          >
            {t.subtitleBefore}
            <span
              className="font-extrabold mx-1"
              style={{ color: 'var(--text)' }}
            >
              {t.subtitleBold}
            </span>
            {t.subtitleAfter}
          </p>

          {/* 2 Side-by-Side Rounded Rectangular Buttons with Paw Icons */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-3.5 pt-1">
            {/* Outline Call Button */}
            <a
              href={CONTACT_INFO.phoneHref}
              className="h-[54px] sm:h-[56px] px-6 sm:px-7 rounded-[10px] flex items-center justify-center gap-3 text-sm sm:text-[15px] font-semibold border transition-all duration-200 hover:scale-[1.02] shrink-0"
              style={{
                borderColor: 'var(--text)',
                color: 'var(--text)',
                backgroundColor: 'color-mix(in srgb, var(--surface) 55%, transparent)',
              }}
            >
              <PawIcon className="w-5 h-5 shrink-0" />
              <span className="whitespace-nowrap">{t.btnCall}</span>
            </a>

            {/* Filled Primary Schedule Button */}
            <button
              type="button"
              data-testid="hero-book-btn"
              onClick={onOpenConsultation}
              className="h-[54px] sm:h-[56px] px-7 sm:px-8 rounded-[10px] flex items-center justify-center gap-3 text-sm sm:text-[15px] font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] hover:opacity-95 whitespace-nowrap cursor-pointer"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
              }}
            >
              <PawIcon className="w-5 h-5 shrink-0" />
              <span>{t.btnBook}</span>
            </button>
          </div>

          {/* Unboxed Right-Aligned Social Proof */}
          <div className="w-full flex flex-col items-start lg:items-end text-left lg:text-right pt-2 space-y-2">
            <p
              className="text-sm sm:text-base font-normal"
              style={{ color: 'var(--text-muted)' }}
            >
              {t.socialProofText}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Natural Multi-Layered Organic Bottom Wave (z-20, in front of puppy)    */}
      {/* ========================================================================= */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute left-0 -bottom-[1px] w-full h-[clamp(65px,9.5vw,150px)] pointer-events-none z-20 block"
      >
        {/* Wave Layer 1 (Back Ripple): Soft Blush Pink */}
        <path
          d="M0,48 C200,118 420,124 640,78 C860,32 1060,2 1240,26 C1330,40 1400,58 1440,46 L1440,160 L0,160 Z"
          fill={darkMode ? '#F4B6C2' : '#E895A5'}
          fillOpacity={darkMode ? 0.18 : 0.38}
        >
          <animate
            attributeName="d"
            dur="11s"
            repeatCount="indefinite"
            values="
              M0,48 C200,118 420,124 640,78 C860,32 1060,2 1240,26 C1330,40 1400,58 1440,46 L1440,160 L0,160 Z;
              M0,58 C210,106 430,134 650,86 C870,40 1070,10 1250,20 C1335,34 1405,52 1440,40 L1440,160 L0,160 Z;
              M0,48 C200,118 420,124 640,78 C860,32 1060,2 1240,26 C1330,40 1400,58 1440,46 L1440,160 L0,160 Z
            "
          />
        </path>

        {/* Wave Layer 2 (Mid Ripple): Warm Coral-Pink */}
        <path
          d="M0,60 C195,126 415,132 635,88 C855,44 1055,6 1238,32 C1328,48 1398,66 1440,54 L1440,160 L0,160 Z"
          fill={darkMode ? '#F4B6C2' : '#F4B6C2'}
          fillOpacity={darkMode ? 0.28 : 0.62}
        >
          <animate
            attributeName="d"
            dur="9s"
            repeatCount="indefinite"
            values="
              M0,60 C195,126 415,132 635,88 C855,44 1055,6 1238,32 C1328,48 1398,66 1440,54 L1440,160 L0,160 Z;
              M0,68 C205,116 425,140 645,94 C865,50 1065,12 1245,26 C1332,42 1402,60 1440,48 L1440,160 L0,160 Z;
              M0,60 C195,126 415,132 635,88 C855,44 1055,6 1238,32 C1328,48 1398,66 1440,54 L1440,160 L0,160 Z
            "
          />
        </path>

        {/* Wave Layer 3 (Main Foreground Wave): Blends seamlessly into var(--bg) */}
        <path
          d="M0,72 C200,136 420,142 640,98 C860,54 1060,12 1240,40 C1330,56 1400,74 1440,64 L1440,160 L0,160 Z"
          fill="var(--bg)"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,72 C200,136 420,142 640,98 C860,54 1060,12 1240,40 C1330,56 1400,74 1440,64 L1440,160 L0,160 Z;
              M0,80 C210,126 415,148 635,104 C855,60 1065,18 1235,34 C1325,50 1395,68 1440,58 L1440,160 L0,160 Z;
              M0,72 C200,136 420,142 640,98 C860,54 1060,12 1240,40 C1330,56 1400,74 1440,64 L1440,160 L0,160 Z
            "
          />
        </path>

        {/* Delicate Crest Highlight Line along the Main Wave */}
        <path
          d="M0,72 C200,136 420,142 640,98 C860,54 1060,12 1240,40 C1330,56 1400,74 1440,64"
          fill="none"
          stroke={darkMode ? '#F4B6C2' : '#D98292'}
          strokeOpacity={darkMode ? 0.42 : 0.38}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,72 C200,136 420,142 640,98 C860,54 1060,12 1240,40 C1330,56 1400,74 1440,64;
              M0,80 C210,126 415,148 635,104 C855,60 1065,18 1235,34 C1325,50 1395,68 1440,58;
              M0,72 C200,136 420,142 640,98 C860,54 1060,12 1240,40 C1330,56 1400,74 1440,64
            "
          />
        </path>
      </svg>
    </section>
  );
};

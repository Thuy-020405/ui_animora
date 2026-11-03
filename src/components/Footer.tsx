import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, User, Phone, Mail, Copy, Check } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../data/translations';
import { CONTACT_INFO } from '../config/contact';
import { PawBubbleLayer } from './PawBubbleLayer';

interface FooterProps {
  lang: Language;
  darkMode?: boolean;
  onNavigate?: (page: PageId) => void;
  onShowToast?: (text: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, darkMode, onNavigate, onShowToast }) => {
  const navT = translations[lang].nav;
  const footerT = translations[lang].footer;

  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);

  const handleCopy = async (value: string, field: 'phone' | 'email') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      }
    } catch {
      // Fallback if clipboard API is restricted
    }
    setCopiedField(field);
    onShowToast?.(footerT.copiedToast);
    window.setTimeout(() => {
      setCopiedField((prev) => (prev === field ? null : prev));
    }, 2200);
  };

  // Background paw bubbles toggle state
  const [bubblesEnabled, setBubblesEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const saved = localStorage.getItem('animora_paw_bubbles_enabled');
      if (saved !== null) {
        return saved === 'true';
      }
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return !prefersReduced;
    } catch {
      return true;
    }
  });

  const handleToggleBubbles = () => {
    const next = !bubblesEnabled;
    setBubblesEnabled(next);
    localStorage.setItem('animora_paw_bubbles_enabled', String(next));
    window.dispatchEvent(
      new CustomEvent('animora_bubble_toggle', { detail: { enabled: next } })
    );
  };

  // Fit-text font size for wordmark
  const [wordmarkFontSize, setWordmarkFontSize] = useState<number | null>(null);

  // Scroll entrance observers - initialized to true so content is never blank
  const [partAInView, setPartAInView] = useState(true);
  const [headlineInView, setHeadlineInView] = useState(true);
  const [infoInView, setInfoInView] = useState(true);

  const partARef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Fit-text calculation for "Animora"
  useEffect(() => {
    const calculateFontSize = () => {
      const containerWidth = partARef.current?.clientWidth || window.innerWidth;
      if (!containerWidth) return;

      // Measure the natural width of "Animora" at 100px font-size using off-screen canvas
      let measuredWidth = 0;
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.font = '800 100px "Baloo 2", system-ui, sans-serif';
          measuredWidth = ctx.measureText('Animora').width;
        }
      } catch {
        // Fallback below
      }

      // DOM fallback measurement
      if (!measuredWidth || measuredWidth < 50) {
        const span = document.createElement('span');
        span.style.fontFamily = '"Baloo 2", system-ui, sans-serif';
        span.style.fontWeight = '800';
        span.style.fontSize = '100px';
        span.style.letterSpacing = '-0.02em';
        span.style.whiteSpace = 'nowrap';
        span.style.position = 'absolute';
        span.style.visibility = 'hidden';
        span.textContent = 'Animora';
        document.body.appendChild(span);
        measuredWidth = span.getBoundingClientRect().width;
        document.body.removeChild(span);
      }

      if (measuredWidth > 0 && containerWidth > 0) {
        // Calculate font size so text width exactly equals container/viewport width
        const targetSize = (containerWidth / measuredWidth) * 100;
        setWordmarkFontSize(targetSize);
      }
    };

    calculateFontSize();

    // Re-calculate after custom fonts have fully loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        calculateFontSize();
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      calculateFontSize();
    });

    if (partARef.current) {
      resizeObserver.observe(partARef.current);
    }

    window.addEventListener('resize', calculateFontSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateFontSize);
    };
  }, []);

  // Intersection observers for scroll entrances with generous rootMargin
  useEffect(() => {
    const createObserver = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        },
        { threshold: 0, rootMargin: '100px' }
      );
    };

    const obsA = createObserver(setPartAInView);
    const obs1 = createObserver(setHeadlineInView);
    const obs3 = createObserver(setInfoInView);

    if (partARef.current) obsA.observe(partARef.current);
    if (headlineRef.current) obs1.observe(headlineRef.current);
    if (infoRef.current) obs3.observe(infoRef.current);

    // Fallback timer to ensure content is never hidden if observer fails
    const timer = setTimeout(() => {
      setPartAInView(true);
      setHeadlineInView(true);
      setInfoInView(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      obsA.disconnect();
      obs1.disconnect();
      obs3.disconnect();
    };
  }, []);

  return (
    <footer className="w-full overflow-x-clip select-none">
      
      {/* ========================================================= */}
      {/* PART A: Wordmark + Peeking Kitten + Sideways Wave          */}
      {/* Height: clamp(420px, 58vh, 680px) | Under 860px: clamp(320px, 46vh, 440px) */}
      {/* ========================================================= */}
      <div
        ref={partARef}
        className="group relative w-full overflow-hidden pt-[30px] sm:pt-[42px] h-[clamp(350px,50vh,470px)] sm:h-[clamp(470px,63vh,690px)] flex flex-col justify-between bg-transparent"
      >
        {/* Layer 1: Giant Full-Width Wordmark "Animora" (High visibility, crisp contrast, touches both edges) */}
        <div
          className="relative z-10 w-full text-center px-0 pointer-events-none"
          style={{
            paddingTop: '0.08em',
            overflow: 'visible',
            whiteSpace: 'nowrap',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
          }}
        >
          <span
            className="inline-block font-heading font-extrabold"
            style={{
              fontSize: wordmarkFontSize ? `${wordmarkFontSize}px` : '24vw',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: 'var(--footer-wordmark)',
              textShadow: 'var(--footer-wordmark-shadow)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
            }}
          >
            Animora
          </span>

          <style>{`
            :root, :root[data-theme="light"] {
              --footer-wordmark: #DE7A90;
              --footer-wordmark-shadow: 0 6px 20px rgba(107, 31, 46, 0.12);
            }
            :root[data-theme="dark"] {
              --footer-wordmark: #A24158;
              --footer-wordmark-shadow: 0 6px 24px rgba(0, 0, 0, 0.38);
            }
          `}</style>
        </div>

        {/* Layer 2: Waving Puppy & Kitten Duo (z-20, tucked cleanly behind z-30 wave crest) */}
        <div
          className="absolute bottom-[4px] sm:bottom-[10px] lg:bottom-[14px] z-20 pointer-events-auto flex items-end justify-center w-full px-4"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className={`flex items-end justify-center gap-4 sm:gap-10 lg:gap-16 transition-all duration-800 ease-out transform ${
              partAInView ? 'translate-y-0 opacity-100' : 'translate-y-[80px] opacity-0'
            }`}
          >
            {/* 1. Waving Puppy */}
            <div className="animate-pets-bob transition-transform duration-300 hover:-translate-y-3 cursor-pointer">
              <img
                src="/assets/aistudio/peek_dog_waving_transparent.png"
                alt={lang === 'vi' ? 'Chú chó con vẫy chân chào' : 'Puppy waving paw'}
                className="h-[195px] sm:h-[280px] lg:h-[355px] max-h-[66vh] w-auto object-contain block mx-auto animate-paw-wave"
                style={{
                  filter: 'var(--pet-filter, none)',
                }}
              />
            </div>

            {/* 2. Waving Kitten */}
            <div
              className="animate-pets-bob transition-transform duration-300 hover:-translate-y-3 cursor-pointer"
              style={{ animationDelay: '0.6s' }}
            >
              <img
                src="/assets/aistudio/peek_kitten_clean_1200.png"
                alt={lang === 'vi' ? 'Mèo con vẫy chân chào' : 'Kitten waving paw'}
                className="h-[195px] sm:h-[280px] lg:h-[355px] max-h-[66vh] w-auto object-contain block mx-auto animate-paw-wave"
                style={{
                  animationDelay: '0.4s',
                  filter: 'var(--pet-filter, none)',
                }}
              />
            </div>
          </div>
          <style>{`
            html[data-theme="dark"] img[alt*="chào"],
            html[data-theme="dark"] img[alt*="waving"] {
              filter: brightness(0.92) !important;
            }
          `}</style>
        </div>

        {/* Layer 3: Multi-layered Natural Organic Wave SVG (z-30) + 4-Paw Walking Trail Decoration */}
        <div
          className="absolute bottom-0 left-0 right-0 z-30 w-full overflow-hidden -mb-[1px] h-[110px] sm:h-[150px] lg:h-[185px] pointer-events-none"
          aria-hidden="true"
        >
          {/* 4 Cream Paw-Print Icons walking diagonally across the wave */}
          <div className="absolute inset-0 pointer-events-none z-35 overflow-hidden">
            {/* Paw 1 */}
            <div
              className={`absolute animate-paw-trail text-[#FFF4E8]/20 transition-opacity duration-700 ${
                partAInView ? 'opacity-20' : 'opacity-0'
              }`}
              style={{
                left: '8%',
                bottom: '14%',
                transform: 'rotate(-20deg)',
                animationDelay: '0.1s',
              }}
            >
              <svg className="w-10 h-10 sm:w-12 sm:h-12 fill-current" viewBox="0 0 24 24">
                <path d="M12 14c-2.4 0-4.3 1.7-4.3 3.8 0 1.2.6 2.2 1.6 2.8.7.4 1.7.6 2.7.6s2-.2 2.7-.6c1-.6 1.6-1.6 1.6-2.8 0-2.1-1.9-3.8-4.3-3.8zm-5.5-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.8-4.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6.6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>

            {/* Paw 2 */}
            <div
              className={`absolute animate-paw-trail text-[#FFF4E8]/20 transition-opacity duration-700 ${
                partAInView ? 'opacity-20' : 'opacity-0'
              }`}
              style={{
                left: '22%',
                bottom: '22%',
                transform: 'rotate(15deg)',
                animationDelay: '0.3s',
              }}
            >
              <svg className="w-11 h-11 sm:w-14 sm:h-14 fill-current" viewBox="0 0 24 24">
                <path d="M12 14c-2.4 0-4.3 1.7-4.3 3.8 0 1.2.6 2.2 1.6 2.8.7.4 1.7.6 2.7.6s2-.2 2.7-.6c1-.6 1.6-1.6 1.6-2.8 0-2.1-1.9-3.8-4.3-3.8zm-5.5-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.8-4.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6.6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>

            {/* Paw 3 */}
            <div
              className={`absolute animate-paw-trail text-[#FFF4E8]/20 transition-opacity duration-700 ${
                partAInView ? 'opacity-20' : 'opacity-0'
              }`}
              style={{
                left: '78%',
                bottom: '20%',
                transform: 'rotate(-10deg)',
                animationDelay: '0.5s',
              }}
            >
              <svg className="w-10 h-10 sm:w-13 sm:h-13 fill-current" viewBox="0 0 24 24">
                <path d="M12 14c-2.4 0-4.3 1.7-4.3 3.8 0 1.2.6 2.2 1.6 2.8.7.4 1.7.6 2.7.6s2-.2 2.7-.6c1-.6 1.6-1.6 1.6-2.8 0-2.1-1.9-3.8-4.3-3.8zm-5.5-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.8-4.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6.6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>

            {/* Paw 4 */}
            <div
              className={`absolute animate-paw-trail text-[#FFF4E8]/20 transition-opacity duration-700 ${
                partAInView ? 'opacity-20' : 'opacity-0'
              }`}
              style={{
                left: '88%',
                bottom: '28%',
                transform: 'rotate(24deg)',
                animationDelay: '0.7s',
              }}
            >
              <svg className="w-12 h-12 sm:w-15 sm:h-15 fill-current" viewBox="0 0 24 24">
                <path d="M12 14c-2.4 0-4.3 1.7-4.3 3.8 0 1.2.6 2.2 1.6 2.8.7.4 1.7.6 2.7.6s2-.2 2.7-.6c1-.6 1.6-1.6 1.6-2.8 0-2.1-1.9-3.8-4.3-3.8zm-5.5-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.8-4.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6.6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </div>
          </div>

          {/* Multi-layered Sculptural Organic Wave SVG */}
          <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            {/* Wave Layer 1: Soft Blush Pink Ripple (Back) */}
            <path
              d="M0,68 C190,128 350,122 490,70 C630,18 780,10 940,46 C1100,82 1270,98 1440,32 L1440,160 L0,160 Z"
              fill="#F4B6C2"
              fillOpacity={darkMode ? 0.18 : 0.45}
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
                  M0,68 C190,128 350,122 490,70 C630,18 780,10 940,46 C1100,82 1270,98 1440,32 L1440,160 L0,160 Z;
                  M0,56 C210,114 380,110 520,58 C660,10 810,6 970,38 C1130,70 1300,86 1440,44 L1440,160 L0,160 Z;
                  M0,68 C190,128 350,122 490,70 C630,18 780,10 940,46 C1100,82 1270,98 1440,32 L1440,160 L0,160 Z
                "
              />
            </path>

            {/* Wave Layer 2: Warm Rose Mid-Ripple */}
            <path
              d="M0,82 C170,138 330,132 475,78 C615,26 770,16 930,54 C1090,92 1265,110 1440,42 L1440,160 L0,160 Z"
              fill={darkMode ? '#4A1A27' : '#D47A8B'}
              fillOpacity={darkMode ? 0.6 : 0.38}
            >
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                  M0,82 C170,138 330,132 475,78 C615,26 770,16 930,54 C1090,92 1265,110 1440,42 L1440,160 L0,160 Z;
                  M0,70 C195,126 360,122 500,68 C640,16 795,12 955,44 C1115,82 1285,98 1440,54 L1440,160 L0,160 Z;
                  M0,82 C170,138 330,132 475,78 C615,26 770,16 930,54 C1090,92 1265,110 1440,42 L1440,160 L0,160 Z
                "
              />
            </path>

            {/* Wave Layer 3: Main Foreground Natural Wave (var(--footer-bg)) */}
            <path
              d="M0,95 C180,148 340,142 480,88 C620,34 760,24 920,62 C1080,100 1260,118 1440,54 L1440,160 L0,160 Z"
              style={{ fill: 'var(--footer-bg)' }}
            >
              <animate
                attributeName="d"
                dur="12s"
                repeatCount="indefinite"
                values="
                  M0,95 C180,148 340,142 480,88 C620,34 760,24 920,62 C1080,100 1260,118 1440,54 L1440,160 L0,160 Z;
                  M0,82 C200,136 370,132 510,78 C650,22 800,18 960,54 C1120,92 1290,108 1440,66 L1440,160 L0,160 Z;
                  M0,95 C180,148 340,142 480,88 C620,34 760,24 920,62 C1080,100 1260,118 1440,54 L1440,160 L0,160 Z
                "
              />
            </path>

            {/* Subtle Crest Highlight Line */}
            <path
              d="M0,95 C180,148 340,142 480,88 C620,34 760,24 920,62 C1080,100 1260,118 1440,54"
              fill="none"
              stroke="#F4B6C2"
              strokeOpacity={darkMode ? 0.38 : 0.28}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            >
              <animate
                attributeName="d"
                dur="12s"
                repeatCount="indefinite"
                values="
                  M0,95 C180,148 340,142 480,88 C620,34 760,24 920,62 C1080,100 1260,118 1440,54;
                  M0,82 C200,136 370,132 510,78 C650,22 800,18 960,54 C1120,92 1290,108 1440,66;
                  M0,95 C180,148 340,142 480,88 C620,34 760,24 920,62 C1080,100 1260,118 1440,54
                "
              />
            </path>
          </svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PART B: Footer Body (Background --footer-bg, Cream Text)   */}
      {/* ========================================================= */}
      <div
        className="relative z-30 -mt-[2px] pt-12 pb-0 overflow-hidden"
        style={{
          backgroundColor: 'var(--footer-bg)',
          color: '#FFF4E8',
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* 1. Headline */}
          <div
            ref={headlineRef}
            className={`relative text-center max-w-3xl mx-auto pt-4 transition-all duration-700 ${
              headlineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2
              className="font-heading font-bold [text-wrap:balance] leading-[1.15] tracking-tight px-4 sm:px-8"
              style={{
                fontSize: 'clamp(28px, 4.5vw, 56px)',
                color: '#FFF4E8',
              }}
            >
              {lang === 'vi'
                ? 'Gặp gỡ đội ngũ chăm sóc đứng sau niềm vui của bé cưng'
                : "Meet the pet care team behind your pet's happiness"}
            </h2>
          </div>

          {/* First Thin Divider Line with Fading Ends */}
          <div
            className="w-full h-[1px] my-8"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255, 244, 232, 0.3) 20%, rgba(255, 244, 232, 0.3) 80%, transparent)',
            }}
          />

          {/* 3. Info Row (Brand Story + Navigation Links + Contact Column) */}
          <div
            ref={infoRef}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start transition-all duration-700 delay-200 ${
              infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Left Column: Brand story & description */}
            <div className="lg:col-span-5 space-y-4 max-w-[460px] mx-auto lg:mx-0 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#F4B6C2] bg-white shadow-md flex items-center justify-center shrink-0">
                  <img
                    src="/src/assets/images/animora_pet_logo_1793179870995.jpg"
                    alt="Animora Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-heading text-2xl font-bold tracking-tight text-[#FFF4E8]">
                  Animora
                </span>
              </div>

              <p className="text-[18px] text-[#FFF4E8] leading-[1.6] font-medium">
                {lang === 'vi'
                  ? 'Chúng tôi là đội ngũ nhỏ yêu nghề, xây dựng toàn bộ hoạt động xoay quanh một điều duy nhất: giúp bé cưng của bạn luôn cảm thấy an toàn.'
                  : 'We are a small team who love this work, and we built our whole practice around one thing: making your pet feel safe.'}
              </p>
            </div>

            {/* Middle Column: Navigation Links */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
              <h3 className="font-heading text-xl font-bold !text-[#FFF4E8] mb-3">
                {footerT.colExplore}
              </h3>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-3 text-center lg:text-left text-base font-semibold text-[#FFF4E8]">
                {(
                  [
                    { id: 'home', label: navT.home },
                    { id: 'about', label: navT.about },
                    { id: 'services', label: navT.services },
                    {
                      id: 'my-bookings',
                      label: lang === 'vi' ? 'Lịch hẹn của tôi' : 'My bookings',
                    },
                    { id: 'adopt', label: navT.adopt },
                    { id: 'shop', label: navT.shop },
                    { id: 'pet-profiles', label: navT.petProfiles },
                  ] as const
                ).map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      data-testid={`footer-link-${item.id}`}
                      onClick={() => onNavigate?.(item.id)}
                      className="min-h-[44px] lg:min-h-0 inline-flex items-center hover:text-[#FF7F6B] hover:underline decoration-[#FF7F6B] underline-offset-4 transition-colors focus:outline-none focus:underline cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Contact Block ("Liên hệ" / "Contact") */}
            <div className="lg:col-span-4 w-full flex flex-col items-stretch lg:items-start">
              <div className="flex items-center justify-center lg:justify-between gap-3 mb-3">
                <h3 className="font-heading text-xl font-bold !text-[#FFF4E8]">
                  {footerT.colContact}
                </h3>
                {copiedField && (
                  <span
                    role="status"
                    aria-live="polite"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FF7F6B] text-white shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {footerT.copiedToast}
                  </span>
                )}
              </div>

              <div className="w-full space-y-2">
                {/* 1. Contact Person Row */}
                <div className="group w-full min-h-[44px] flex items-center gap-3 py-1 text-[#FFF4E8] text-[18px] font-semibold leading-[1.6]">
                  <User className="w-5 h-5 shrink-0 text-[#FFF4E8] transition-colors group-hover:text-[#FF7F6B]" />
                  <div className="flex flex-wrap items-baseline gap-x-1.5">
                    <span className="text-sm font-medium text-[#FFF4E8]/80">
                      {footerT.contactPersonLabel}:
                    </span>
                    <span className="text-[18px] font-semibold leading-[1.6] text-[#FFF4E8]">
                      {CONTACT_INFO.personName}
                    </span>
                  </div>
                </div>

                {/* 2. Phone Row */}
                <div className="group w-full min-h-[44px] flex items-center justify-between gap-2 py-1 text-[#FFF4E8] text-[18px] font-semibold leading-[1.6]">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="flex-1 min-h-[44px] inline-flex items-center gap-3 text-[#FFF4E8] text-[18px] font-semibold leading-[1.6] hover:underline decoration-[#FF7F6B] underline-offset-4 focus:outline-none focus:underline"
                  >
                    <Phone className="w-5 h-5 shrink-0 text-[#FFF4E8] transition-colors group-hover:text-[#FF7F6B]" />
                    <span>{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_INFO.phoneDisplay, 'phone')}
                    aria-label="Sao chép số điện thoại"
                    title={footerT.copyPhoneAria}
                    className="w-9 h-9 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] rounded-lg inline-flex items-center justify-center text-[#FFF4E8]/85 hover:text-[#FF7F6B] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7F6B] shrink-0 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-4 h-4 text-[#FF7F6B]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* 3. Email Row */}
                <div className="group w-full min-h-[44px] flex items-center justify-between gap-2 py-1 text-[#FFF4E8] text-[18px] font-semibold leading-[1.6]">
                  <a
                    href={CONTACT_INFO.mailtoHref}
                    className="flex-1 min-w-0 min-h-[44px] inline-flex items-center gap-3 text-[#FFF4E8] text-[18px] font-semibold leading-[1.6] hover:underline decoration-[#FF7F6B] underline-offset-4 [overflow-wrap:anywhere] focus:outline-none focus:underline"
                  >
                    <Mail className="w-5 h-5 shrink-0 text-[#FFF4E8] transition-colors group-hover:text-[#FF7F6B]" />
                    <span className="[overflow-wrap:anywhere]">{CONTACT_INFO.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                    aria-label="Sao chép email"
                    title={footerT.copyEmailAria}
                    className="w-9 h-9 min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] rounded-lg inline-flex items-center justify-center text-[#FFF4E8]/85 hover:text-[#FF7F6B] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7F6B] shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-4 h-4 text-[#FF7F6B]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Second Thin Divider Line */}
          <div
            className="w-full h-[1px] mt-8 mb-4"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255, 244, 232, 0.3) 20%, rgba(255, 244, 232, 0.3) 80%, transparent)',
            }}
          />

        </div>

        {/* ========================================================= */}
        {/* 4. Fluffy Cloud Bottom Bar (Copyright + Bubbles Toggle)   */}
        {/* ========================================================= */}
        <div className="relative w-full h-[190px] overflow-hidden mt-6 flex items-end">
          {/* Drifting Layered Cloud Blobs (Back & Front Layers) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <style>{`
              :root, :root[data-theme="light"] {
                --cloud-1: #FFF4E8;
                --cloud-2: rgba(255, 255, 255, 0.85);
                --cloud-text: #3B1520;
              }
              :root[data-theme="dark"] {
                --cloud-1: #3A121D;
                --cloud-2: #4A1A27;
                --cloud-text: #FFF4E8;
              }
            `}</style>

            {/* Cloud Layer 1 (Drifting Layer) */}
            <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-cloud-drift-1 filter blur-[2px] opacity-90">
              <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="w-1/2 h-full fill-[var(--cloud-1)]">
                <path d="M0,100 Q180,30 360,90 Q540,20 720,80 Q900,10 1080,75 Q1260,30 1440,95 L1440,180 L0,180 Z" />
              </svg>
              <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="w-1/2 h-full fill-[var(--cloud-1)]">
                <path d="M0,100 Q180,30 360,90 Q540,20 720,80 Q900,10 1080,75 Q1260,30 1440,95 L1440,180 L0,180 Z" />
              </svg>
            </div>

            {/* Cloud Layer 2 (Drifting Overlay Layer) */}
            <div className="absolute bottom-0 left-0 w-[200%] h-full flex animate-cloud-drift-2 filter blur-[1px]">
              <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-1/2 h-full fill-[var(--cloud-2)]">
                <path d="M0,110 Q240,40 480,100 Q720,35 960,105 Q1200,45 1440,115 L1440,160 L0,160 Z" />
              </svg>
              <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-1/2 h-full fill-[var(--cloud-2)]">
                <path d="M0,110 Q240,40 480,100 Q720,35 960,105 Q1200,45 1440,115 L1440,160 L0,160 Z" />
              </svg>
            </div>
          </div>

          {/* Cloud Bottom Content (Copyright + Background Effects Toggle, NO Social Media Links) */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--cloud-text)] font-semibold text-sm">
            {/* Copyright */}
            <p>
              {lang === 'vi'
                ? '© 2026 Animora. Bảo lưu mọi quyền.'
                : '© 2026 Animora. All rights reserved.'}
            </p>

            {/* Background Effects (Paw bubbles) Toggle */}
            <button
              type="button"
              onClick={handleToggleBubbles}
              aria-pressed={bubblesEnabled}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border shadow-xs hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF7F6B] cursor-pointer"
              style={{
                backgroundColor: bubblesEnabled ? 'rgba(255, 127, 107, 0.18)' : 'rgba(107, 31, 46, 0.08)',
                borderColor: bubblesEnabled ? '#FF7F6B' : 'rgba(107, 31, 46, 0.15)',
                color: 'inherit',
              }}
              title={
                lang === 'vi'
                  ? (bubblesEnabled ? 'Tắt bong bóng dấu chân' : 'Bật bong bóng dấu chân')
                  : (bubblesEnabled ? 'Disable paw bubbles' : 'Enable paw bubbles')
              }
            >
              <Sparkles className={`w-3.5 h-3.5 ${bubblesEnabled ? 'text-[#FF7F6B]' : 'opacity-60'}`} />
              <span>{lang === 'vi' ? 'Hiệu ứng nền' : 'Background effects'}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  bubblesEnabled ? 'bg-[#FF7F6B] text-white' : 'bg-black/10 text-current opacity-70'
                }`}
              >
                {bubblesEnabled ? (lang === 'vi' ? 'Bật' : 'On') : (lang === 'vi' ? 'Tắt' : 'Off')}
              </span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

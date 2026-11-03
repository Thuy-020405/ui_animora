import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  PawStyle,
  getBubbleCount,
  generateBubbleSeeds,
  calculateCursorPush,
  isPointNearBubble,
  generateBurstParticles,
  BurstParticle,
} from '../utils/pawBubbles';

interface ActiveBubble {
  id: number;
  pawStyle: PawStyle;
  size: number;
  x: number; // in pixels
  y: number; // in pixels
  speed: number; // px per second
  swayDuration: number;
  swayAmplitude: number;
  swayPhase: number;
  rotDuration: number;
  rotAmplitude: number;
  rotPhase: number;
  colorType: 'pink' | 'coral' | 'wine';
  pushX: number;
  pushY: number;
  popping: boolean;
  popProgress: number; // 0 to 1
  respawnTimer: number; // ms until respawn
  particles: BurstParticle[];
}

interface PawBubbleLayerProps {
  darkMode: boolean;
  inFooter?: boolean; // When true, renders cream-colored bubbles specifically for dark burgundy footer
  reducedOpacity?: boolean; // When true (on Shop page), reduces layer opacity to 60%
}

export const PawBubbleLayer: React.FC<PawBubbleLayerProps> = ({
  darkMode,
  inFooter = false,
  reducedOpacity = false,
}) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('animora_paw_bubbles_enabled');
    if (saved !== null) {
      return saved === 'true';
    }
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !prefersReduced;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  });

  const bubblesRef = useRef<ActiveBubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const isPointerInsideRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const isFastScrollingRef = useRef(false);
  const scrollTimerRef = useRef<number | null>(null);

  // Sync toggle state from custom events (when user clicks footer toggle)
  useEffect(() => {
    const handleToggle = (e: CustomEvent<{ enabled: boolean }>) => {
      setEnabled(e.detail.enabled);
    };

    window.addEventListener('animora_bubble_toggle', handleToggle as EventListener);
    return () => {
      window.removeEventListener('animora_bubble_toggle', handleToggle as EventListener);
    };
  }, []);

  // Listen to prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initialize bubbles
  const initBubbles = useCallback(() => {
    const width = window.innerWidth;
    const height = inFooter ? 600 : window.innerHeight;
    const count = inFooter ? 8 : getBubbleCount(width, prefersReducedMotion);
    const seeds = generateBubbleSeeds(count);

    bubblesRef.current = seeds.map((s) => {
      const speed = (height + 100) / s.riseDuration; // px/sec
      return {
        id: s.id,
        pawStyle: s.pawStyle,
        size: s.size,
        x: (s.initialXPercent / 100) * width,
        y: (s.initialYPercent / 100) * height,
        speed,
        swayDuration: s.swayDuration,
        swayAmplitude: s.swayAmplitude,
        swayPhase: Math.random() * Math.PI * 2,
        rotDuration: 5 + Math.random() * 3,
        rotAmplitude: s.rotationAmplitude,
        rotPhase: Math.random() * Math.PI * 2,
        colorType: s.colorType,
        pushX: 0,
        pushY: 0,
        popping: false,
        popProgress: 0,
        respawnTimer: 0,
        particles: [],
      };
    });
  }, [inFooter, prefersReducedMotion]);

  useEffect(() => {
    initBubbles();
    const handleResize = () => {
      initBubbles();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initBubbles]);

  // Pointer move tracking for cursor avoidance
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      isPointerInsideRef.current = true;
    };

    const handlePointerLeave = () => {
      isPointerInsideRef.current = false;
      mousePosRef.current = { x: -999, y: -999 };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // Click / tap detection for popping bubbles
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const handlePointerDown = (e: PointerEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      for (let i = 0; i < bubblesRef.current.length; i++) {
        const b = bubblesRef.current[i];
        if (b.popping) continue;

        // Check proximity
        const bubbleScreenX = b.x + b.pushX;
        const bubbleScreenY = b.y + b.pushY - scrollOffsetRef.current;

        if (isPointNearBubble(clickX, clickY, bubbleScreenX, bubbleScreenY, b.size / 2)) {
          // Pop this bubble!
          b.popping = true;
          b.popProgress = 0;
          const burstColor = inFooter
            ? '#FFF4E8'
            : darkMode
            ? b.colorType === 'coral'
              ? '#FF7F6B'
              : '#F4B6C2'
            : b.colorType === 'coral'
            ? '#FF7F6B'
            : '#F4B6C2';
          b.particles = generateBurstParticles(burstColor);
          b.respawnTimer = 1200 + Math.random() * 800; // 1.2s - 2.0s
          break; // pop one per click
        }
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [enabled, prefersReducedMotion, darkMode, inFooter]);

  // Scroll parallax & fast-scroll pausing
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Parallax offset: 0.15x scroll speed
      scrollOffsetRef.current += delta * 0.15;
      // Soft clamp / decay
      scrollOffsetRef.current *= 0.92;

      // Detect fast scroll on mobile
      if (Math.abs(delta) > 50) {
        isFastScrollingRef.current = true;
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = window.setTimeout(() => {
          isFastScrollingRef.current = false;
        }, 150);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // Animation RAF loop
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    let isTabVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTimeRef.current = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const updateLoop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1); // cap dt at 100ms
      lastTimeRef.current = now;

      if (isTabVisible && !isFastScrollingRef.current && containerRef.current) {
        const height = inFooter ? 600 : window.innerHeight;
        const width = window.innerWidth;
        const bubbles = bubblesRef.current;

        for (let i = 0; i < bubbles.length; i++) {
          const b = bubbles[i];

          if (b.popping) {
            // Advance pop progress (0.25s duration)
            b.popProgress += dt / 0.25;
            b.respawnTimer -= dt * 1000;

            if (b.respawnTimer <= 0) {
              // Respawn bubble at bottom
              b.popping = false;
              b.popProgress = 0;
              b.particles = [];
              b.y = height + b.size + 20;
              b.x = Math.random() * (width - b.size * 2) + b.size;
              b.pushX = 0;
              b.pushY = 0;
            }
          } else {
            // Rise upward
            b.y -= b.speed * dt;

            // Recycle if floats past top of screen
            if (b.y < -b.size - 40) {
              b.y = height + b.size + 10;
              b.x = Math.random() * (width - b.size * 2) + b.size;
              b.pushX = 0;
              b.pushY = 0;
            }

            // Cursor push calculation (within 90px)
            if (isPointerInsideRef.current) {
              const currentScreenX = b.x + b.pushX;
              const currentScreenY = b.y + b.pushY - scrollOffsetRef.current;
              const pushResult = calculateCursorPush(
                currentScreenX,
                currentScreenY,
                mousePosRef.current.x,
                mousePosRef.current.y,
                90
              );
              // Lerp push
              b.pushX += (pushResult.pushX - b.pushX) * 0.1;
              b.pushY += (pushResult.pushY - b.pushY) * 0.1;
            } else {
              b.pushX *= 0.95;
              b.pushY *= 0.95;
            }
          }

          // Update DOM element directly with translate3d for GPU performance
          const domEl = containerRef.current.children[i] as HTMLElement | undefined;
          if (domEl) {
            if (b.popping) {
              const scale = 1 + b.popProgress * 0.3; // scale up to 1.3
              const opacity = Math.max(0, 1 - b.popProgress);
              const tx = b.x + b.pushX;
              const ty = b.y + b.pushY - scrollOffsetRef.current;
              domEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
              domEl.style.opacity = `${opacity}`;
            } else {
              const sway =
                Math.sin((now / 1000 / b.swayDuration) * Math.PI * 2 + b.swayPhase) *
                b.swayAmplitude;
              const rot =
                Math.sin((now / 1000 / b.rotDuration) * Math.PI * 2 + b.rotPhase) *
                b.rotAmplitude;
              const breathing =
                0.97 + Math.sin((now / 1000) * 1.8 + b.id) * 0.04; // 0.95 - 1.05

              const tx = b.x + b.pushX + sway;
              const ty = b.y + b.pushY - scrollOffsetRef.current;

              domEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${breathing})`;
              domEl.style.opacity = '1';
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [enabled, prefersReducedMotion, inFooter]);

  if (!enabled) {
    return null;
  }

  // Reduced motion: 6 static paw bubbles
  if (prefersReducedMotion) {
    const staticPositions = [
      { x: '12%', y: '18%', size: 36, rot: -10 },
      { x: '82%', y: '24%', size: 48, rot: 12 },
      { x: '25%', y: '52%', size: 28, rot: 8 },
      { x: '78%', y: '65%', size: 42, rot: -14 },
      { x: '16%', y: '84%', size: 52, rot: 6 },
      { x: '88%', y: '88%', size: 32, rot: -8 },
    ];

    return (
      <div
        aria-hidden="true"
        role="presentation"
        className={
          inFooter
            ? 'absolute inset-0 pointer-events-none overflow-hidden z-10'
            : 'fixed inset-0 pointer-events-none overflow-hidden z-0'
        }
      >
        {staticPositions.map((p, idx) => (
          <div
            key={idx}
            className="absolute opacity-40 transition-opacity duration-300"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            <PawBubbleSVG
              size={p.size}
              style="cat"
              colorType="pink"
              darkMode={darkMode}
              inFooter={inFooter}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      role="presentation"
      className={
        inFooter
          ? 'absolute inset-0 pointer-events-none overflow-hidden -z-1 transition-opacity duration-300'
          : 'fixed inset-0 pointer-events-none overflow-hidden -z-1 transition-opacity duration-300'
      }
      style={{
        width: inFooter ? '100%' : '100vw',
        height: inFooter ? '100%' : '100vh',
        opacity: reducedOpacity ? 0.3 : 0.6,
        ...(reducedOpacity
          ? {
              // Keep bubbles strictly in left/right viewport margins, out of header, tabs, and cards
              clipPath:
                'polygon(0% 0%, calc(50% - 620px) 0%, calc(50% - 620px) 100%, calc(50% + 620px) 100%, calc(50% + 620px) 0%, 100% 0%, 100% 100%, 0% 100%)',
            }
          : {}),
      }}
    >
      {bubblesRef.current.map((b) => (
        <div
          key={b.id}
          className="absolute top-0 left-0 will-change-transform"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            transform: `translate3d(${b.x}px, ${b.y}px, 0)`,
          }}
        >
          <PawBubbleSVG
            size={b.size}
            style={b.pawStyle}
            colorType={b.colorType}
            darkMode={darkMode}
            inFooter={inFooter}
          />

          {/* Burst Particles (3 tiny dots appearing during pop) */}
          {b.popping && (
            <div className="absolute inset-0 pointer-events-none">
              {b.particles.map((p) => {
                const px = b.size / 2 + p.dx * b.popProgress * 2;
                const py = b.size / 2 + p.dy * b.popProgress * 2;
                const popOpacity = Math.max(0, 1 - b.popProgress);
                return (
                  <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      left: `${px}px`,
                      top: `${py}px`,
                      opacity: popOpacity,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface PawBubbleSVGProps {
  size: number;
  style: PawStyle;
  colorType: 'pink' | 'coral' | 'wine';
  darkMode: boolean;
  inFooter?: boolean;
}

const PawBubbleSVG: React.FC<PawBubbleSVGProps> = ({
  size,
  style,
  colorType,
  darkMode,
  inFooter = false,
}) => {
  // Gradient and colors
  // Light mode: pink #F4B6C2 and coral #FF7F6B, fill opacity 0.18-0.35, rim rgba(107,31,46,.18), highlight rgba(255,255,255,.7)
  // Dark mode: pink #F4B6C2 at opacity 0.12-0.22 and burgundy-tinted #4A1A27 / #5E2A38 fills, rim rgba(244,182,194,.25), highlight rgba(255,244,232,.25)
  // Footer: cream #FFF4E8 at opacity 0.15-0.25

  let pawFill = '#F4B6C2';
  let pawOpacity = 0.28;
  let rimColor = 'rgba(107, 31, 46, 0.18)';
  let highlightColor = 'rgba(255, 255, 255, 0.7)';
  let innerGlow = 'rgba(255, 255, 255, 0.15)';

  if (inFooter) {
    pawFill = '#FFF4E8';
    pawOpacity = 0.22;
    rimColor = 'rgba(255, 244, 232, 0.28)';
    highlightColor = 'rgba(255, 255, 255, 0.8)';
    innerGlow = 'rgba(255, 244, 232, 0.16)';
  } else if (darkMode) {
    rimColor = 'rgba(244, 182, 194, 0.25)';
    highlightColor = 'rgba(255, 244, 232, 0.25)';
    innerGlow = 'rgba(244, 182, 194, 0.08)';

    if (colorType === 'coral') {
      pawFill = '#FF7F6B';
      pawOpacity = 0.18;
    } else if (colorType === 'wine') {
      pawFill = '#4A1A27';
      pawOpacity = 0.22;
    } else {
      pawFill = '#F4B6C2';
      pawOpacity = 0.16;
    }
  } else {
    // Light mode
    rimColor = 'rgba(107, 31, 46, 0.18)';
    highlightColor = 'rgba(255, 255, 255, 0.7)';
    innerGlow = 'rgba(255, 255, 255, 0.25)';

    if (colorType === 'coral') {
      pawFill = '#FF7F6B';
      pawOpacity = 0.32;
    } else if (colorType === 'wine') {
      pawFill = '#6B1F2E';
      pawOpacity = 0.22;
    } else {
      pawFill = '#F4B6C2';
      pawOpacity = 0.30;
    }
  }

  const gradId = `bubble-grad-${size}-${colorType}-${inFooter ? 'f' : darkMode ? 'd' : 'l'}`;
  const hlGradId = `hl-grad-${size}-${inFooter ? 'f' : darkMode ? 'd' : 'l'}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full block filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
    >
      <defs>
        {/* Subtle radial inner glow of soap bubble */}
        <radialGradient id={gradId} cx="42%" cy="42%" r="58%">
          <stop offset="0%" stopColor={innerGlow} stopOpacity="0.8" />
          <stop offset="65%" stopColor={pawFill} stopOpacity={pawOpacity * 0.4} />
          <stop offset="100%" stopColor={pawFill} stopOpacity={pawOpacity * 0.9} />
        </radialGradient>

        {/* Specular highlight in top-left */}
        <linearGradient id={hlGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={highlightColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={highlightColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. Outer Bubble Glass Body */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={`url(#${gradId})`}
        stroke={rimColor}
        strokeWidth="1.2"
      />

      {/* 2. Top-Left Glass Reflection / Specular Highlight */}
      <ellipse
        cx="34"
        cy="30"
        rx="18"
        ry="10"
        transform="rotate(-30 34 30)"
        fill={`url(#${hlGradId})`}
      />
      {/* Secondary tiny specular point */}
      <circle cx="24" cy="22" r="2.5" fill={highlightColor} opacity="0.8" />

      {/* 3. Paw Print Shape Inside */}
      <g
        fill={pawFill}
        fillOpacity={pawOpacity}
        style={{
          transformOrigin: '50px 50px',
        }}
      >
        {style === 'dog' && (
          // Dog Paw: wide heart-shaped pad, oval toe pads
          <g transform="translate(0, 2)">
            {/* Main pad */}
            <path d="M50 48 C41 48 34 54 35 64 C36 71 43 76 50 76 C57 76 64 71 65 64 C66 54 59 48 50 48 Z" />
            {/* Toe 1 (left outer) */}
            <ellipse cx="28" cy="46" rx="6.5" ry="8.5" transform="rotate(-25 28 46)" />
            {/* Toe 2 (left inner) */}
            <ellipse cx="42" cy="38" rx="6.8" ry="9.5" transform="rotate(-8 42 38)" />
            {/* Toe 3 (right inner) */}
            <ellipse cx="58" cy="38" rx="6.8" ry="9.5" transform="rotate(8 58 38)" />
            {/* Toe 4 (right outer) */}
            <ellipse cx="72" cy="46" rx="6.5" ry="8.5" transform="rotate(25 72 46)" />
          </g>
        )}

        {style === 'cat' && (
          // Cat Paw: soft 3-lobed bottom pad, circular toe beads
          <g transform="translate(0, 2)">
            {/* Main pad */}
            <path d="M50 49 C42 49 36 53 35 60 C34 68 40 74 46 75 C48 75.3 50 74.2 50 74.2 C50 74.2 52 75.3 54 75 C60 74 66 68 65 60 C64 53 58 49 50 49 Z" />
            {/* Toe 1 */}
            <circle cx="28" cy="45" r="6.5" />
            {/* Toe 2 */}
            <circle cx="41" cy="37" r="7" />
            {/* Toe 3 */}
            <circle cx="59" cy="37" r="7" />
            {/* Toe 4 */}
            <circle cx="72" cy="45" r="6.5" />
          </g>
        )}

        {style === 'round' && (
          // Rounded Simple Paw: soft bean-shaped pad, 4 round beads
          <g transform="translate(0, 1)">
            {/* Main pad */}
            <ellipse cx="50" cy="62" rx="14" ry="11" />
            {/* Toe 1 */}
            <circle cx="31" cy="46" r="6" />
            {/* Toe 2 */}
            <circle cx="43" cy="38" r="6.8" />
            {/* Toe 3 */}
            <circle cx="57" cy="38" r="6.8" />
            {/* Toe 4 */}
            <circle cx="69" cy="46" r="6" />
          </g>
        )}
      </g>
    </svg>
  );
};

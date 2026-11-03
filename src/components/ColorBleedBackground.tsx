'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '../types';

export type BleedIntensity = 'natural' | 'vibrant' | 'subtle';

interface ColorBleedBackgroundProps {
  darkMode: boolean;
  lang?: Language;
}

export const ColorBleedBackground: React.FC<ColorBleedBackgroundProps> = ({
  darkMode,
}) => {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  // Smooth mouse-follow trail
  useEffect(() => {
    let animationFrameId: number;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isPointerActive) setIsPointerActive(true);
    };

    const handleMouseLeave = () => {
      setIsPointerActive(false);
    };

    const updateLoop = () => {
      // Lerp movement for fluid water-like drift
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPointerActive]);

  // Cố định mức độ loang màu "Êm dịu" (subtle: opacity 0.6)
  const opacityMultiplier = 0.6;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700"
      style={{
        opacity: opacityMultiplier,
      }}
    >
      {/* Blob 1: Top-Left Coral Rose Aura (Hero & Nav area) */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] sm:w-[780px] sm:h-[780px] rounded-full blur-[90px] sm:blur-[130px] animate-bleed-drift-1 transition-all duration-1000"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 40% 40%, rgba(244, 182, 194, 0.22) 0%, rgba(255, 127, 107, 0.16) 45%, transparent 72%)'
            : 'radial-gradient(circle at 40% 40%, rgba(255, 127, 107, 0.32) 0%, rgba(244, 182, 194, 0.24) 45%, transparent 72%)',
        }}
      />

      {/* Blob 2: Top-Right Warm Golden Amber & Apricot (Hero right & QuickBooking) */}
      <div
        className="absolute -top-24 -right-28 w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[95px] sm:blur-[140px] animate-bleed-drift-2 transition-all duration-1000"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 60% 35%, rgba(251, 146, 60, 0.18) 0%, rgba(244, 182, 194, 0.12) 50%, transparent 72%)'
            : 'radial-gradient(circle at 60% 35%, rgba(251, 191, 36, 0.28) 0%, rgba(254, 215, 170, 0.22) 50%, transparent 72%)',
        }}
      />

      {/* Blob 3: Center-Left Lavender & Lilac Rose (About Us & Services) */}
      <div
        className="absolute top-[35%] -left-40 w-[550px] h-[550px] sm:w-[820px] sm:h-[820px] rounded-full blur-[100px] sm:blur-[150px] animate-bleed-drift-3 transition-all duration-1000"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 45% 55%, rgba(168, 85, 247, 0.18) 0%, rgba(236, 72, 153, 0.14) 50%, transparent 72%)'
            : 'radial-gradient(circle at 45% 55%, rgba(216, 180, 254, 0.3) 0%, rgba(244, 182, 194, 0.24) 50%, transparent 72%)',
        }}
      />

      {/* Blob 4: Center-Right Soft Coral & Peach (Adoption & Shop) */}
      <div
        className="absolute top-[55%] -right-36 w-[560px] h-[560px] sm:w-[860px] sm:h-[860px] rounded-full blur-[100px] sm:blur-[150px] animate-bleed-drift-4 transition-all duration-1000"
        style={{
          background: darkMode
            ? 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.17) 0%, rgba(255, 127, 107, 0.13) 48%, transparent 72%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255, 127, 107, 0.28) 0%, rgba(253, 164, 175, 0.22) 48%, transparent 72%)',
        }}
      />

      {/* Blob 5: Bottom Center Deep Wine Rose & Blush (Pet Profiles & Pre-Footer) */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[650px] h-[550px] sm:w-[1000px] sm:h-[700px] rounded-full blur-[110px] sm:blur-[160px] animate-bleed-pulse transition-all duration-1000"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse at center, rgba(244, 182, 194, 0.16) 0%, rgba(168, 85, 247, 0.13) 45%, transparent 72%)'
            : 'radial-gradient(ellipse at center, rgba(244, 182, 194, 0.34) 0%, rgba(255, 127, 107, 0.22) 45%, transparent 72%)',
        }}
      />

      {/* Dynamic Cursor Watercolor Bleed Aura (Follows cursor smoothly) */}
      {isPointerActive && (
        <div
          className="absolute rounded-full blur-[75px] sm:blur-[95px] transition-transform duration-75 pointer-events-none"
          style={{
            width: '380px',
            height: '380px',
            left: `${mousePos.x - 190}px`,
            top: `${mousePos.y - 190}px`,
            background: darkMode
              ? 'radial-gradient(circle, rgba(244, 182, 194, 0.22) 0%, rgba(255, 127, 107, 0.15) 38%, transparent 68%)'
              : 'radial-gradient(circle, rgba(255, 127, 107, 0.28) 0%, rgba(251, 191, 36, 0.2) 40%, transparent 68%)',
          }}
        />
      )}

      {/* Subtle Textured Canvas Grain Overlay (Adds fine paper texture to bleed) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.032] dark:opacity-[0.022] mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="bleedGrainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bleedGrainFilter)" />
      </svg>
    </div>
  );
};

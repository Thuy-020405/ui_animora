import React, { useEffect, useState, useRef } from 'react';

interface PawStep {
  id: number;
  x: number;
  y: number;
  angle: number;
  isLeft: boolean;
  scale: number;
  colorVar: string;
}

const STEP_DISTANCE = 38; // Minimum px between consecutive paw prints
const MIN_STEP_INTERVAL = 55; // Minimum ms between steps
const PAW_LIFESPAN_MS = 2200; // How long each paw stays on screen before cleanup
const MAX_PAWS = 26;

export const CursorPawTrail: React.FC = () => {
  const [paws, setPaws] = useState<PawStep[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastTimeRef = useRef<number>(0);
  const stepCountRef = useRef<number>(0);
  const timeoutsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTimeRef.current < MIN_STEP_INTERVAL) return;

      const { clientX: x, clientY: y } = e;

      if (!lastPosRef.current) {
        lastPosRef.current = { x, y };
        return;
      }

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance < STEP_DISTANCE) return;

      // Angle in degrees pointing along the direction of movement (+90deg so top of paw points forward)
      const moveAngleRad = Math.atan2(dy, dx);
      const angleDeg = moveAngleRad * (180 / Math.PI) + 90;

      // Alternate left and right footsteps with slight perpendicular offset
      const isLeft = stepCountRef.current % 2 === 0;
      const perpOffset = isLeft ? -7 : 7;
      const perpX = -Math.sin(moveAngleRad) * perpOffset;
      const perpY = Math.cos(moveAngleRad) * perpOffset;

      const id = stepCountRef.current++;
      lastPosRef.current = { x, y };
      lastTimeRef.current = now;

      const newPaw: PawStep = {
        id,
        x: x + perpX,
        y: y + perpY,
        angle: angleDeg + (isLeft ? -6 : 6),
        isLeft,
        scale: 0.88 + (id % 3) * 0.08,
        colorVar: id % 2 === 0 ? 'var(--coral)' : 'var(--primary)',
      };

      setPaws((prev) => {
        const next = [...prev, newPaw];
        return next.length > MAX_PAWS ? next.slice(next.length - MAX_PAWS) : next;
      });

      const timeoutId = window.setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== id));
        timeoutsRef.current.delete(timeoutId);
      }, PAW_LIFESPAN_MS);

      timeoutsRef.current.add(timeoutId);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      timeoutsRef.current.forEach((tid) => window.clearTimeout(tid));
      timeoutsRef.current.clear();
    };
  }, []);

  if (paws.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 will-change-[transform,opacity]"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            transform: `translate(-50%, -50%) rotate(${paw.angle}deg) scale(${paw.scale})`,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-cursor-paw"
            style={{ color: paw.colorVar }}
          >
            {/* Main metacarpal pad */}
            <path
              d="M12 13.2C9.6 13.2 7.5 15.1 7.5 17.4C7.5 19.2 8.9 20.4 10.6 20.4C11.3 20.4 11.7 20.1 12 20.1C12.3 20.1 12.7 20.4 13.4 20.4C15.1 20.4 16.5 19.2 16.5 17.4C16.5 15.1 14.4 13.2 12 13.2Z"
              fill="currentColor"
            />
            {/* Inner left toe */}
            <ellipse
              cx="9.5"
              cy="9.2"
              rx="1.8"
              ry="2.5"
              transform="rotate(-12 9.5 9.2)"
              fill="currentColor"
            />
            {/* Inner right toe */}
            <ellipse
              cx="14.5"
              cy="9.2"
              rx="1.8"
              ry="2.5"
              transform="rotate(12 14.5 9.2)"
              fill="currentColor"
            />
            {/* Outer left toe */}
            <ellipse
              cx="6.2"
              cy="12.2"
              rx="1.65"
              ry="2.3"
              transform="rotate(-28 6.2 12.2)"
              fill="currentColor"
            />
            {/* Outer right toe */}
            <ellipse
              cx="17.8"
              cy="12.2"
              rx="1.65"
              ry="2.3"
              transform="rotate(28 17.8 12.2)"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

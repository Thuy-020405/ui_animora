export type PawStyle = 'dog' | 'cat' | 'round';
export type BubbleSizeCategory = 'small' | 'medium' | 'large';

export interface BubbleConfig {
  id: number;
  pawStyle: PawStyle;
  sizeCategory: BubbleSizeCategory;
  size: number; // in px: 18 - 72
  initialXPercent: number; // 0 - 100%
  initialYPercent: number; // 0 - 100% (staggered start)
  riseDuration: number; // 14s - 28s (larger bubbles rise slower)
  swayDuration: number; // 4s - 7s
  swayAmplitude: number; // ~16px - 28px
  rotationAmplitude: number; // ~12deg - 20deg
  colorType: 'pink' | 'coral' | 'wine';
  highlightOffset: { x: number; y: number };
}

export interface BurstParticle {
  id: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
}

/**
 * Responsive bubble count based on screen width and reduced motion
 * Requirements: 18 desktop (>1024px), 12 tablet (640-1024px), 8 mobile (<640px), 6 if reduced motion
 */
export function getBubbleCount(width: number, prefersReducedMotion: boolean): number {
  if (prefersReducedMotion) {
    return 6;
  }
  if (width > 1024) {
    return 18;
  }
  if (width >= 640) {
    return 12;
  }
  return 8;
}

/**
 * Generate deterministic or pseudo-random bubble configs matching:
 * - 60% small (18-36px), 30% medium (37-54px), 10% large (55-72px)
 * - Rise 14-28s (larger rise slower: small ~14-19s, medium ~19-24s, large ~24-28s)
 * - Sway 4-7s, amplitude ±24px, rotation ±18°
 */
export function generateBubbleSeeds(count: number, randomFn: () => number = Math.random): BubbleConfig[] {
  const configs: BubbleConfig[] = [];
  const pawStyles: PawStyle[] = ['dog', 'cat', 'round'];
  const colorTypes: Array<'pink' | 'coral' | 'wine'> = ['pink', 'coral', 'wine'];

  for (let i = 0; i < count; i++) {
    // 60% small, 30% medium, 10% large
    const categoryRoll = randomFn();
    let sizeCategory: BubbleSizeCategory = 'small';
    let size = 24;
    let riseDuration = 16;

    if (categoryRoll < 0.6) {
      sizeCategory = 'small';
      size = Math.round(18 + randomFn() * 18); // 18 - 36px
      riseDuration = 14 + (size - 18) * 0.28 + randomFn() * 2; // ~14-19s
    } else if (categoryRoll < 0.9) {
      sizeCategory = 'medium';
      size = Math.round(37 + randomFn() * 17); // 37 - 54px
      riseDuration = 19 + (size - 37) * 0.28 + randomFn() * 2; // ~19-24s
    } else {
      sizeCategory = 'large';
      size = Math.round(55 + randomFn() * 17); // 55 - 72px
      riseDuration = 24 + (size - 55) * 0.24 + randomFn() * 2; // ~24-28s
    }

    const pawStyle = pawStyles[i % pawStyles.length];
    const colorType = colorTypes[i % colorTypes.length];
    const initialXPercent = Math.min(96, Math.max(4, (i * (100 / count) + (randomFn() * 8 - 4))));
    const initialYPercent = randomFn() * 100; // evenly spread out vertically initially
    const swayDuration = 4.2 + randomFn() * 2.8; // 4.2s - 7s
    const swayAmplitude = 18 + randomFn() * 8; // 18px - 26px (~±24px)
    const rotationAmplitude = 12 + randomFn() * 8; // 12° - 20° (~±18°)

    configs.push({
      id: i,
      pawStyle,
      sizeCategory,
      size,
      initialXPercent,
      initialYPercent,
      riseDuration,
      swayDuration,
      swayAmplitude,
      rotationAmplitude,
      colorType,
      highlightOffset: {
        x: -0.22,
        y: -0.22,
      },
    });
  }

  return configs;
}

/**
 * Calculates cursor avoidance nudge vector
 * If pointer is within maxDistance (e.g. 90px), push the bubble away smoothly.
 */
export function calculateCursorPush(
  bubbleX: number,
  bubbleY: number,
  mouseX: number,
  mouseY: number,
  maxDistance = 90
): { pushX: number; pushY: number; distance: number } {
  const dx = bubbleX - mouseX;
  const dy = bubbleY - mouseY;
  const distance = Math.hypot(dx, dy);

  if (distance < 0.001 || distance >= maxDistance) {
    return { pushX: 0, pushY: 0, distance };
  }

  // Force decreases with distance (1 at center, 0 at maxDistance)
  const factor = (1 - distance / maxDistance);
  const maxPush = 35; // max pixel push
  const pushAmount = factor * maxPush;
  const nx = dx / distance;
  const ny = dy / distance;

  return {
    pushX: nx * pushAmount,
    pushY: ny * pushAmount,
    distance,
  };
}

/**
 * Checks if a click point is within the bubble's interaction radius
 */
export function isPointNearBubble(
  clickX: number,
  clickY: number,
  bubbleX: number,
  bubbleY: number,
  radius: number
): boolean {
  const tolerance = Math.max(radius * 1.25, 28); // easier to tap on mobile
  return Math.hypot(clickX - bubbleX, clickY - bubbleY) <= tolerance;
}

/**
 * Generate 3 tiny bursting dots when a bubble pops
 */
export function generateBurstParticles(color: string): BurstParticle[] {
  return [
    { id: 1, dx: -18, dy: -14, size: 4, color },
    { id: 2, dx: 16, dy: -12, size: 3.5, color },
    { id: 3, dx: 0, dy: 16, size: 3, color },
  ];
}

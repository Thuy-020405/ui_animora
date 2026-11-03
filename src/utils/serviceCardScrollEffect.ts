export interface ScrollFocusMetrics {
  progress: number;
  scale: number;
  opacity: number;
  blurPx: number;
  translateY: number;
}

/**
 * Calculates a gentle scale-down, fade, and blur effect for service cards
 * as the user scrolls down the page past the services track.
 *
 * @param trackTop - getBoundingClientRect().top of the cards track container
 * @param trackHeight - getBoundingClientRect().height of the cards track container
 * @param viewportHeight - window.innerHeight
 * @param cardIndex - optional index (0..3) for subtle staggered depth
 */
export function computeServiceCardScrollFocus(
  trackTop: number,
  trackHeight: number,
  viewportHeight: number,
  cardIndex = 0
): ScrollFocusMetrics {
  if (viewportHeight <= 0 || trackHeight <= 0) {
    return { progress: 0, scale: 1, opacity: 1, blurPx: 0, translateY: 0 };
  }

  // Start receding gently as the user scrolls down and the track moves into the upper third of the viewport
  const startThreshold = viewportHeight * 0.34;
  // Reach full gentle recession when the track has scrolled past the top edge
  const endThreshold = -Math.max(trackHeight * 0.45, 180);

  if (trackTop >= startThreshold) {
    return { progress: 0, scale: 1, opacity: 1, blurPx: 0, translateY: 0 };
  }

  const totalDistance = startThreshold - endThreshold;
  const rawProgress = totalDistance > 0 ? (startThreshold - trackTop) / totalDistance : 0;
  // Subtle stagger per card index so cards feel organic without losing cohesion
  const staggerOffset = (cardIndex % 4) * 0.025;
  const clamped = Math.min(1, Math.max(0, rawProgress + (rawProgress > 0.02 ? staggerOffset : 0)));

  // Smoothstep easing for natural, non-jarring optical transition
  const eased = clamped * clamped * (3 - 2 * clamped);

  // Gentle scale down (from 1.0 down to 0.91)
  const scale = Number((1 - eased * 0.09).toFixed(4));
  // Gentle fade (from 1.0 down to 0.52)
  const opacity = Number((1 - eased * 0.48).toFixed(4));
  // Gentle optical blur (from 0px up to 4.2px)
  const blurPx = Number((eased * 4.2).toFixed(2));
  // Subtle downward parallax drift (from 0px to 14px)
  const translateY = Number((eased * 14).toFixed(2));

  return {
    progress: Number(eased.toFixed(4)),
    scale,
    opacity,
    blurPx,
    translateY,
  };
}

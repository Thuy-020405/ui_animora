export type SwipeDirection = 'next' | 'prev' | 'none';

export interface SwipeEvaluationInput {
  deltaX: number;
  deltaY: number;
  durationMs: number;
  distanceThresholdPx?: number;
  velocityThresholdPxPerMs?: number;
}

/**
 * Wraps an arbitrary carousel index into the valid range [0, total - 1].
 */
export function wrapCarouselIndex(index: number, total: number): number {
  if (total <= 0 || !Number.isFinite(total)) {
    return 0;
  }
  const normalized = Math.trunc(index) % total;
  return normalized < 0 ? normalized + total : normalized;
}

/**
 * Returns the next carousel index with seamless wrap-around.
 */
export function getNextCarouselIndex(currentIndex: number, total: number): number {
  return wrapCarouselIndex(currentIndex + 1, total);
}

/**
 * Returns the previous carousel index with seamless wrap-around.
 */
export function getPrevCarouselIndex(currentIndex: number, total: number): number {
  return wrapCarouselIndex(currentIndex - 1, total);
}

/**
 * Evaluates a horizontal pointer/touch gesture and determines whether it should
 * advance to the next slide, return to the previous slide, or snap back.
 *
 * A negative deltaX (finger/cursor moved left) advances to 'next'.
 * A positive deltaX (finger/cursor moved right) moves to 'prev'.
 */
export function evaluateSwipeGesture({
  deltaX,
  deltaY,
  durationMs,
  distanceThresholdPx = 48,
  velocityThresholdPxPerMs = 0.35,
}: SwipeEvaluationInput): SwipeDirection {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  // Ignore predominantly vertical scroll gestures
  if (absY > absX * 1.15) {
    return 'none';
  }

  const safeDuration = Math.max(durationMs, 1);
  const velocity = absX / safeDuration;

  const isIntentionalSwipe =
    absX >= distanceThresholdPx || (absX >= 20 && velocity >= velocityThresholdPxPerMs);

  if (!isIntentionalSwipe) {
    return 'none';
  }

  return deltaX < 0 ? 'next' : 'prev';
}

/**
 * Computes an ordered slice of item indices of length `visibleCount` starting at `activeIndex`
 * with wrap-around for multi-card desktop/tablet carousel views.
 */
export function getVisibleSlideIndices(
  activeIndex: number,
  total: number,
  visibleCount: number
): number[] {
  if (total <= 0 || visibleCount <= 0) {
    return [];
  }
  const clampedCount = Math.min(visibleCount, total);
  const start = wrapCarouselIndex(activeIndex, total);
  return Array.from({ length: clampedCount }, (_, offset) =>
    wrapCarouselIndex(start + offset, total)
  );
}
